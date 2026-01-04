import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import connectDB from "@/lib/server/mongodb";
import { data } from "autoprefixer";

async function waitForPageToGoLive(octokit, owner, repo, maxWaitTime = 240000) {
  const startTime = Date.now();
  const deploymentUrl = `https://${owner}.github.io/${repo}/`;

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const buildsRes = await octokit.rest.repos.listPagesBuilds({
        owner,
        repo,
        per_page: 1,
      });

      if (buildsRes.data.length > 0) {
        const latestBuild = buildsRes.data[0];

        if (latestBuild.status === "built") {
          try {
            const response = await fetch(deploymentUrl, { method: "HEAD" });
            if (response.ok) {
              return { isLive: true, url: deploymentUrl };
            }
          } catch (error) {}
        } else if (latestBuild.status === "errored") {
          throw new Error(
            `Build failed: ${latestBuild.error?.message || "Unknown error"}`
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      if (error.message.includes("Build failed")) {
        throw error;
      }
    }
  }

  throw new Error("Deployment timed out");
}

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

    console.log("GitHub Pages deployment response:", pageRes.data);

    if (pageRes.status !== 201) {
      return NextResponse.json(
        { error: "Failed to deploy to GitHub Pages." },
        { status: pageRes.status }
      );
    }

    const liveStatus = await waitForPageToGoLive(
      octokit,
      username,
      formattedRepoName
    );

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
      { error: "Failed to deploy to GitHub Pages.", res: error.message },
      { status: 500 }
    );
  }
}
