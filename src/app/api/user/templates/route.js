import connectDB from "@/lib/server/mongodb";
import { NextResponse } from "next/server";
import Templates from "@/models/Templates";

export async function POST(request) {
  await connectDB();
  let body = await request.json();
  let { name, htmlString, image, for: templateFor, description } = body;
  if ((!name || !htmlString || !image || !templateFor, !description)) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    let template = await Templates.create({
      name,
      htmlString,
      image,
      templateFor: templateFor,
      description,
    });
    console.log("Template created successfully:", template);
    return NextResponse.json(
      { message: "Template created successfully", template },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();
  try {
    let templates = await Templates.find({});
    if (templates.length === 0) {
      return NextResponse.json(
        { message: "No templates found" },
        { status: 404 }
      );
    }
    return NextResponse.json(templates, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
