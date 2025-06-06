import { NextResponse } from "next/server";
import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";

export async function POST(request) {
  connectDB();
  const body = await request.json();
  const session = await getServerSession(authOptions);
  //   console.log(session.accessToken);

  const { formattedRepoName, finalHtml, username } = body;
  if (!formattedRepoName || !finalHtml || !username) {
    return NextResponse.json(
      { error: "Repository name and HTML content are required." },
      { status: 400 }
    );
  }
  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }
  console.log(formattedRepoName, username);

  try {
    let sha = null;

    let pages = await fetch(
      `https://api.github.com/repos/${username}/${formattedRepoName}/pages`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (pages.ok) {
      const pagesData = await pages.json();
      console.log("Pages data:", pagesData);
      if (pagesData.status !== "null") {
        return NextResponse.json({
          message:
            "Repository with this name already exists, will continue to update the repo",
          isAlreadyCreated: true,
          repoName: formattedRepoName,
          isDeployed: true,
        });
      }
    }

    const existingFileResponse = await fetch(
      `https://api.github.com/repos/${username}/${formattedRepoName}/contents/index.html`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(existingFileResponse);

    if (existingFileResponse.ok) {
      const existingFileData = await existingFileResponse.json();
      console.log(existingFileData);
      sha = existingFileData.sha;
      console.log("File exists, updating with SHA:", sha);
    } else if (existingFileResponse.status === 404) {
      console.log(existingFileResponse);
      console.log("File doesn't exist, creating new file");
    } else {
      const errorData = await existingFileResponse.json();
      console.error("Error checking file existence:", errorData);
      throw new Error(
        `Failed to check file existence: ${existingFileResponse.statusText}`
      );
    }

    if (sha) {
      return NextResponse.json({
        message:
          "Repository with this name already exists, will continue to update the repo",
        isAlreadyCreated: true,
        repoName: formattedRepoName,
      });
    }

    const res = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `token ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formattedRepoName,
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
        formattedRepoName,
        finalHtml,
        data,
        isAlreadyCreated: false,
        repoName: formattedRepoName,
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
