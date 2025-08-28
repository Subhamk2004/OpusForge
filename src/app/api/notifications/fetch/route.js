import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import connectDB from "@/lib/server/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import UserNotifications from "@/models/UserNotifications";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const notifications = await Notification.aggregate([
      // Step 1: Get all notifications
      {
        $sort: { createdAt: -1 }, // Latest first
      },

      // Step 2: Lookup user's read status
      {
        $lookup: { // The $lookup doesn't filter out documents - it just adds the userStatus field to each one (which could be empty if no matches are found).
          from: "usernotifications", // Collection name (MongoDB makes it lowercase + plural)
          let: { notificationId: "$_id" }, // current notification's ID

          // Pipeline says: "Only get records where:"
          // - notificationId === "abc123" (current notification's _id)
          // AND
          // - userId === "user1" (the user we're checking for)

          pipeline: [
            // like a filter so that it fetches only the relevant user notification
            {
              $match: {
                // This is like "WHERE" in SQL
                $expr: {
                  $and: [
                    // Both conditions must be true
                    // Condition 1: notificationId matches
                    { $eq: ["$notificationId", "$$notificationId"] },
                    // Condition 2: userId matches our target user
                    { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "userStatus", // this created userStatus is just usernotifications's document object that match the above criteria
        },
      },

      // Step 3: Add computed fields
      {
        $addFields: {
          isRead: {
            $cond: [
              { $gt: [{ $size: "$userStatus" }, 0] },
              { $arrayElemAt: ["$userStatus.isRead", 0] },
              false, // Default to unread if no record exists
            ],
          },
          readAt: {
            $cond: [
              { $gt: [{ $size: "$userStatus" }, 0] },
              { $arrayElemAt: ["$userStatus.readAt", 0] },
              null,
            ],
          },
        },
      },

      // Step 4: Clean up - remove the userStatus field
      {
        $project: {
          userStatus: 0,
        },
      },
    ]);

    console.log(notifications);
    

    // Count unread notifications
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // console.log(notifications);

    return NextResponse.json(
      {
        notifications,
        unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        message: "Error fetching notifications",
      },
      { status: 500 }
    );
  }
}
