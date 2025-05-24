import { NextResponse } from "next/server";
import userSchema from "@/models/User.mjs";
import connectDB from "@/lib/server/mongodb.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth.mjs";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);
  console.log(session.user);
  if (!session || !session.user) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  } else
    return NextResponse.json(
      { isLoggedIn: true, user: session.user },
      { status: 200 }
    );
}
