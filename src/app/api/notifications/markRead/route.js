import UserNotifications from "@/models/UserNotifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import connectDB from "@/lib/server/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const body = await req.json();
  const { notificationId } = body;
  console.log(notificationId);
  

  try {
    // Create or update the UserNotifications record
    await UserNotifications.findOneAndUpdate(
      {
        userId: userId,
        notificationId: notificationId,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
      {
        upsert: true, // Create if doesn't exist
        new: true,
      }
    );

    return NextResponse.json(
      {
        message: "Marked as read",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking as read:", error);
    return NextResponse.json(
      {
        message: "Error marking as read",
      },
      { status: 500 }
    );
  }
}
