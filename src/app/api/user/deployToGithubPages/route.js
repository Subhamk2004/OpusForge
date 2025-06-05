import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import connectDB from "@/lib/server/mongodb";
import { data } from "autoprefixer";

export async function POST(request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { formattedRepoName, username } = body;
  if (!formattedRepoName || !username) {
    return NextResponse.json(
      { error: "Repository name and username are required." },
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
    const octokit = new Octokit({
      auth: session.accessToken,
    });
    console.log("From deployment api route ", username, formattedRepoName);

    const pageRes = await octokit.rest.repos.createPagesSite({
      owner: username,
      repo: formattedRepoName,
      source: {
        branch: "main",
        path: "/",
      },
    });

    if (pageRes.status !== 201) {
      return NextResponse.json(
        { error: "Failed to deploy to GitHub Pages." },
        { status: pageRes.status }
      );
    }
    return NextResponse.json(
      {
        message: "GitHub Pages deployed successfully.",
        data: pageRes.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deploying to GitHub Pages:", error);
    return NextResponse.json(
      { error: "Failed to deploy to GitHub Pages.", res: pageRes },
      { status: 500 }
    );
  }
}
