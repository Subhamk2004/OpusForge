import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import { NextResponse } from "next/server";
import Portfolios from "@/models/Portfolios";

export async function POST(request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const {
    name,
    email,
    userData,
    templateId,
    portfolioImage,
    deployedUrl,
    repoName,
  } = body;

  if (
    !name ||
    !email ||
    !userData ||
    !templateId ||
    !portfolioImage ||
    !deployedUrl ||
    !repoName
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
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
    const newPortfolio = new Portfolios({
      name,
      email,
      userData,
      templateId,
      portfolioImage,
      deployedUrl,
      repoName,
    });

    const savedPortfolio = await newPortfolio.save();

    return NextResponse.json(
      { message: "Portfolio created successfully.", data: savedPortfolio },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio.", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    const portfolios = await Portfolios.find({
      email: session.user.email,
    }).sort({ updatedAt: -1 });

    if (portfolios.length === 0) {
      return NextResponse.json(
        { message: "No portfolios found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios.", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await req.json();
  console.log(session);

  const { portfolioId, formattedRepoName, githubUsername, fromStep } = body;
  if (!formattedRepoName || !githubUsername) {
    return NextResponse.json(
      { error: "RepoName or portfolioId is missing" },
      { status: 400 }
    );
  }
  if (fromStep === "deletion" && !portfolioId) {
    return NextResponse.json(
      { error: "portfolioId is required for deletion" },
      { status: 400 }
    );
  }

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  // const username = session.user.name;

  try {
    // First delete from database
    let deleteRes = null;
    if (fromStep === "deletion") {
      deleteRes = await Portfolios.findByIdAndDelete(portfolioId);
      console.log(deleteRes);

      if (deleteRes === null) {
        throw new Error("Portfolio not found in OpusForge database");
      }
      if (!deleteRes._id) {
        throw new Error("Error while deleting from OpusForge");
      }
    }

    // Then delete from GitHub
    console.log(githubUsername, " ", formattedRepoName);

    const githubDeleteRes = await fetch(
      `https://api.github.com/repos/${githubUsername}/${formattedRepoName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (githubDeleteRes.status === 204) {
      console.log(`Repository ${formattedRepoName} deleted successfully`);
    } else if (githubDeleteRes.status === 404) {
      console.log(`Repository ${formattedRepoName} not found on GitHub`);
    } else {
      const errorData = await githubDeleteRes.json().catch(() => ({}));
      console.warn(
        `GitHub delete failed: ${githubDeleteRes.status} ${
          errorData.message || githubDeleteRes.statusText
        }`
      );
    }

    return NextResponse.json(
      { message: `Successfully deleted portfolio: ${formattedRepoName}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || error || "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { userData, portfolioId } = body;

  if (!userData || !portfolioId) {
    return NextResponse.json(
      { error: "User data and portfolio ID are required." },
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
    const updatedPortfolio = await Portfolios.findByIdAndUpdate(
      portfolioId,
      { userData },
      { new: true }
    );

    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Portfolio updated successfully.", data: updatedPortfolio },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio.", details: error.message },
      { status: 500 }
    );
  }
}
