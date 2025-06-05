import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { finalHtml, username, repoName } = body;
  if (!finalHtml || !username || !repoName) {
    return NextResponse.json(
      { error: "HTML content is required." },
      { status: 400 }
    );
  }
  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/index.html`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Initial commit with HTML content from OpusForge",
          content: btoa(finalHtml),
          branch: "main",
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to commit to repository: ${res.statusText}`);
    }
    const data = await res.json();
    return NextResponse.json(
      { message: "Committed to repository successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error committing to repository:", error);
    return NextResponse.json(
      { error: "Failed to commit to repository." },
      { status: 500 }
    );
  }
}
