import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import connectDB from "@/lib/server/mongodb.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth.js";
import User from "@/models/User";

const MAX_REQUESTS = 50;
const WINDOW_HOURS = 12;

export async function POST(req) {
  await connectDB();

  let session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  const userId = session.user.id;
  const now = new Date();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    let currentCounter = user.aiGenerationCounter || 0;
    let lastRequestTimestamp = user.lastRequestTimestamp;

    const windowStart = new Date(lastRequestTimestamp);
    windowStart.setHours(windowStart.getHours() + WINDOW_HOURS);

    if (lastRequestTimestamp && now > windowStart) {
      currentCounter = 0;
    }

    if (currentCounter >= MAX_REQUESTS) {
      const resetTime = windowStart.toISOString();
      return NextResponse.json(
        {
          success: false,
          message: `You have exceeded the request limit of ${MAX_REQUESTS} within ${WINDOW_HOURS} hours. Please try again after ${resetTime}.`,
          resetTime,
        },
        { status: 429 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { aiGenerationCounter: 1 },
        $set: { lastRequestTimestamp: now },
      },
      { new: true, upsert: true }
    );
    console.log(updatedUser);
  } catch (error) {
    console.error("Error with rate-limiting logic:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY_TEMPLATE_GENERATOR,
  });
  let body = await req.json();
  let { prompt, category, imageUrl, sampleTemplate, sampleFormFields } = body;

  //   console.log(sampleTemplate);

  try {
    // Step 1: Generate the template strictly following sampleTemplate structure
    // Step 1: Generate the template strictly following sampleTemplate structure
    const templatePrompt = `
You are an expert web developer and creative designer. Your task is to generate a **unique, high-quality portfolio template** that strictly follows the structure and patterns of this sample template:

${sampleTemplate}

## Requirements:
1. Maintain the same HTML section IDs, container IDs, CSS classes, and Tailwind utility classes from the sample template.
2. For **all sections containing repeatable content** (e.g., Achievements, Experience, Skills, Projects, Testimonials, Blog posts, Certifications, Education, Services, etc.):
   - DO NOT hardcode separate HTML blocks like achievement1-container, project2-card, skill3-item, etc.
   - Instead, keep a **single empty container element** (e.g., <div id="achievements-container"></div>) with a comment saying “Content injected by JavaScript”.
3. In the <script> section, dynamically generate **all repeating elements** by:
   - Detecting sequentially numbered flat keys in \`userData\` (e.g., skill1Title, skill2Title, project1Title, project2Title, achievement1Title, etc.).
   - Grouping them by their prefix (“skill”, “project”, “experience”, “achievement”, etc.) and rendering them in numeric order.
   - This logic must work for any number of items without hardcoding limits.
4. The \`userData\` object will be **flat** — NOT nested arrays. It will have keys like:
   - \`skill1Title\`, \`skill1Level\`, \`skill2Title\`, \`skill2Level\`, ...
   - \`project1Title\`, \`project1Description\`, \`project1Image\`, ...
   - \`experience1Title\`, \`experience1Date\`, \`experience1Company\`, ...
   - \`achievement1Title\`, \`achievement1Date\`, ...
5. **Data ingestion requirement (MUST be exact):**
   \`\`\`js
   let userData = \${JSON.stringify(data)};
   \`\`\`
   This exact line must be included in the <script> before any rendering logic. Do not change its format in any way.
6. **Image Handling:**  
   - All image values in \`userData\` will always be **valid external URLs** (e.g., from Unsplash or the user’s own hosting).  
   - Use these URLs directly in \`<img src="...">\` tags.  
   - Do **not** embed images as base64 unless explicitly instructed in the User Customization Request.
7. Preserve:
   - All JavaScript functionality and event handlers from the sample.
   - All CSS classes and layout structure.
8. You may update the **visual design/layout** as per the User Customization Request, but:
   - The template must be **unique** and **not generic or AI-styled**.
   - It must be **beautiful, modern, visually balanced**, and **aligned with the specific user’s brand or customization request**.
   - It must be **mobile-first responsive** with perfect scaling for small, medium, and large screens.
9. Output one complete self-contained HTML file:
   - All CSS in a <style> tag in <head>.
   - All JavaScript in a <script> tag at the end of <body>.
   - All repeated sections populated via JS loops from detected numbered keys in \`userData\`.
10. Ensure accessibility (semantic HTML5, alt attributes, keyboard navigation, visible focus states).
11. Keep the HTML valid even before JavaScript runs (empty containers still retain their section headings and description text).
12. **IMPORTANT:** Return ONLY the complete HTML code. No explanations, no extra text, no markdown formatting outside of the HTML.

## Data Format Example:
The AI must expect a flat object with numbered keys like this:
\`\`\`js
{
  "username": "Alex Johnson",
  "profession": "Full Stack Developer",
  "skill1Title": "HTML/CSS",
  "skill1Level": "Advanced",
  "project1Title": "E-commerce Platform",
  "project1Image": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
  "experience1Title": "Senior Developer",
  "experience1Date": "2021 - Present",
  "achievement1Title": "Best Hackathon Project",
  "achievement1CertificateImage": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
}
\`\`\`

## User Customization Request:
${prompt}

## Output:
Return ONLY the complete HTML code (with <style> and <script>) using this dynamic rendering approach for ALL repeatable sections, parsing numbered keys to generate arrays dynamically. The design must be **unique, beautiful, mobile responsive, and tailored to the specific user's request** — no generic AI-looking layouts. All images must be used from the URLs provided in \`userData\`. Include the exact ingestion line:
\`\`\`js
let userData = \${JSON.stringify(data)};
\`\`\`
`;
    console.log("Starting template generation");

    const templateResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: templatePrompt,
    });

    // console.log(templateResponse.text);
    // console.log(templateResponse);

    let generatedTemplate = templateResponse.text;

    if (generatedTemplate.includes("```html")) {
      // Remove markdown code block formatting
      generatedTemplate = generatedTemplate
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .trim();
    } else if (generatedTemplate.includes("```")) {
      // Handle case where it's just ``` without html specifier
      generatedTemplate = generatedTemplate.replace(/```/g, "").trim();
    }

    // Verify template is valid HTML string
    if (
      typeof generatedTemplate !== "string" ||
      (!generatedTemplate.trim().startsWith("<!DOCTYPE html>") &&
        !generatedTemplate.trim().startsWith("<html"))
    ) {
      throw new Error("Generated template is not valid HTML");
    }

    // Step 2: Generate matching form fields
    const fieldsPrompt = `
Analyze the HTML template below and determine the complete and exact set of \`userData\` object keys required for the template to function properly.

## Instructions:
1. Inspect all dynamic content references in the HTML and JavaScript, including:
   - All text placeholders
   - All images (src attributes)
   - All links (href attributes)
   - Any other data-bound attributes
2. Identify **only** the keys that are actually referenced in the template — no extras, no fluff.
3. The keys must follow the exact naming patterns from the template (e.g., \`username\`, \`profession\`, \`skill1Title\`, \`skill1Level\`, \`project1Title\`, \`project1Image\`, etc.).
4. If the template contains repeatable sections, include **all sequentially numbered keys** needed for them, based on the number of items the design supports dynamically.
5. Do not add explanations, formatting, or quotes — just the keys separated by commas.

## Template to Analyze:
${generatedTemplate}

## Output Format:
key1,key2,key3,key4,...
`;
    console.log("Starting fields generation");

    const fieldsResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fieldsPrompt,
    });

    console.log(fieldsResponse.text);
    // console.log(fieldsResponse);

    let generatedFields = fieldsResponse.text;

    if (generatedFields.includes("```")) {
      generatedFields = generatedFields.replace(/```/g, "").trim();
    }

    // Verify form fields is a comma-separated string
    generatedFields = generatedFields.trim();
    if (typeof generatedFields !== "string") {
      throw new Error("Form fields is not a string");
    }

    // Remove any remaining markdown or special characters
    generatedFields = generatedFields.replace(/[`*]/g, "").trim();

    // Return both the template and fields
    return NextResponse.json(
      {
        success: true,
        template: generatedTemplate,
        formFields: generatedFields,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating template:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate template",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
