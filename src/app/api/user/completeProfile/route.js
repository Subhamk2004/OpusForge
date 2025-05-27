import connectDB from "@/lib/server/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function PUT(request) {
  await connectDB();
  
  let body = await request.json();
  let { profession, links, _id, email } = body;
  
  console.log("=== RECEIVED DATA FOR UPDATE ===");
  console.log("User ID:", _id);
  console.log("Email:", email);
  console.log("Profession:", profession);
  console.log("Links:", links);
  console.log("===============================");
  
  if (!profession || !links) {
    console.log(
      "Missing required fields - profession:",
      profession,
      "links:",
      links
    );
    return NextResponse.json(
      {
        error: "Profession and links are required",
        received: {
          profession: profession || "missing",
          links: links || "missing",
          hasLinks: !!links,
          linksLength: links?.length || 0,
        },
      },
      { status: 400 }
    );
  }
  
  try {
    const updateQuery = _id ? { _id } : { email };
    
    const updatedUser = await User.findOneAndUpdate(
      updateQuery,
      {
        profession: profession,
        links: links,
        emailVerified: true,
      },
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedUser) {
      console.log("User not found with query:", updateQuery);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    console.log("User updated successfully:", updatedUser._id);
    
    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profession: updatedUser.profession,
          links: updatedUser.links,
          emailVerified: updatedUser.emailVerified,
        },
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        error: "Failed to update profile",
        details: error.message,
      },
      { status: 500 }
    );
  }
}