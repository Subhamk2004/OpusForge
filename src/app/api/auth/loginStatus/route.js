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

    // console.log("Session user:", session.accessToken);
    // console.log("User email:", session.user.email);

    const token = session.accessToken;
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    const userN = await response.json();
    // console.log(userN.login);

    const data = await User.findOne({ email: session.user.email });

    if (!data) {
      console.log("User not found in database");
    }
    const userData = {
      ...data.toObject(),
      githubUsername: userN.login,
    };
    console.log("data:", userData);

    return NextResponse.json(
      {
        isLoggedIn: true,
        user: session.user,
        userData: userData,
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
