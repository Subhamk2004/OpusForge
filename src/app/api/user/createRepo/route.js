import { NextResponse } from "next/server";
import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";

export async function POST(request) {
  connectDB();
  const body = await request.json();
  const session = await getServerSession(authOptions);
  //   console.log(session.accessToken);

  const { repoName, finalHtml } = body;
  if (!repoName || !finalHtml) {
    return NextResponse.json(
      { error: "Repository name and HTML content are required." },
      { status: 400 }
    );
  } else {
    try {
      if (!session || !session.accessToken) {
        return NextResponse.json(
          { error: "Unauthorized. Please log in." },
          { status: 401 }
        );
      }
      const res = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repoName,
          private: false,
          description: "Repository created via OpusForge",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(
          { error: errorData.message || "Failed to create repository." },
          { status: res.status }
        );
      }
      let data = await res.json();
      return NextResponse.json(
        {
          message: "Repository created successfully.",
          repoName,
          finalHtml,
          data,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating repository:", error);
      return NextResponse.json(
        { error: "Failed to create repository." },
        { status: 500 }
      );
    }
  }
}
