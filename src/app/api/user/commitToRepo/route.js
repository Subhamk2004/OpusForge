import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { finalHtml, username, formattedRepoName } = body;

  if (!finalHtml || !username || !formattedRepoName) {
    return NextResponse.json(
      { error: "HTML content, username, and repository name are required." },
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
    // First, check if the file already exists to get its SHA
    let sha = null;
    console.log(formattedRepoName);
    
    try {
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

      if (existingFileResponse.ok) {
        const existingFileData = await existingFileResponse.json();
        sha = existingFileData.sha;
        console.log("File exists, updating with SHA:", sha);
      } else if (existingFileResponse.status === 404) {
        console.log("File doesn't exist, creating new file");
      } else {
        const errorData = await existingFileResponse.json();
        console.error("Error checking file existence:", errorData);
        throw new Error(
          `Failed to check file existence: ${existingFileResponse.statusText}`
        );
      }
    } catch (error) {
      console.error("Error checking existing file:", error);
    }

    const requestBody = {
      message: "Update HTML content from OpusForge",
      content: btoa(finalHtml),
      branch: "main",
    };

    if (sha) {
      requestBody.sha = sha;
    }

    console.log("Committing to repository with body:", {
      ...requestBody,
      content: "[BASE64_CONTENT_HIDDEN]",
    });

    const res = await fetch(
      `https://api.github.com/repos/${username}/${formattedRepoName}/contents/index.html`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("GitHub API Error:", errorData);
      throw new Error(
        `Failed to commit to repository: ${res.statusText} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await res.json();
    console.log("Successfully committed to repository");

    return NextResponse.json(
      {
        message: "Committed to repository successfully.",
        data: {
          sha: data.content.sha,
          url: data.content.html_url,
          download_url: data.content.download_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error committing to repository:", error);
    return NextResponse.json(
      {
        error: "Failed to commit to repository.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
