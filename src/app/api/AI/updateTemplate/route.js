import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY_TEMPLATE_UPDATE,
  });
  let body = await req.json();

  try {
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update template",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
