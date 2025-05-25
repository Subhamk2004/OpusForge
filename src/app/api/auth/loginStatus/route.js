import { NextResponse } from "next/server";
import connectDB from "@/lib/server/mongodb.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth.js";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }

    // console.log("Session user:", session.user);
    // console.log("User email:", session.user.email);

    const userData = await User.findOne({ email: session.user.email });

    if (!userData) {
      console.log("User not found in database");
    }

    return NextResponse.json(
      {
        isLoggedIn: true,
        user: session.user,
        userData: userData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in loginStatus API:", error);
    return NextResponse.json(
      { error: "Internal server error", isLoggedIn: false },
      { status: 500 }
    );
  }
}
