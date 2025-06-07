import connectDB from "@/lib/server/mongodb";
import Asset from "@/models/Assets";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/server/auth";

export async function GET() {
  try {
    await connectDB();
    console.log("Fetching assets from the database...");
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("Unauthorized access attempt to fetch assets");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let userEmail = session.user.email;

    const assets = await Asset.find({ email: userEmail });

    console.log("Assets fetched successfully:", assets.length, "assets found");
    return NextResponse.json(assets, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 500 }
    );
  }
}
