import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

function validateStructureAndValues(aiObj, templateObj) {
  const aiKeys = Object.keys(aiObj);
  const templateKeys = Object.keys(templateObj);

  if (aiKeys.length !== templateKeys.length) return false;
  for (let i = 0; i < templateKeys.length; i++) {
    if (aiKeys[i] !== templateKeys[i]) return false;
  }

  for (let key of templateKeys) {
    if (templateObj[key] !== "" && templateObj[key] !== aiObj[key]) {
      return false;
    }
  }

  return true;
}

export async function POST(req) {
  const ai = new GoogleGenAI({});
  let body = await req.json();
  let { resumeData, userData } = body;

  let tosSendPrompt = `
You are given two things:
1. Parsed resume data: ${JSON.stringify(resumeData)}
2. A user data template: ${JSON.stringify(userData)}

Your task:
- Fill ONLY the empty string fields in the user data template with relevant information from the resume data.
- If a field in the template already has a value, keep it exactly as it is — do not modify it.
- Keep the EXACT SAME keys, order, and structure as in the template.
- If a field is empty and the resume does not explicitly provide that value, intelligently infer or derive it from related information in the resume.
    Examples:
      • If years of experience are not explicitly given, calculate them from the work experience start and end dates.
      • If location is not explicitly stated, infer it from addresses, cities, or countries mentioned in work experience, education, or contact sections.
      • If skills are incomplete, gather them from any skills section or from descriptions in work experience or projects.
      • If current job title is missing, use the most recent work experience entry.
- All inferred or extracted values must be written from the user's perspective, using first-person language.
    Example: "I have 4 years of experience" instead of "John Smith has 4 years of experience".
- Any content you generate yourself (not directly copied from the resume) must:
    • Be 100 words or fewer.
    • Be professionally written as if the user is describing themselves in a resume.
    • Be concise, impactful, and relevant to the field.
- If you cannot confidently infer a value, leave the field as an empty string.
- Do NOT add, remove, rename, or reorder keys.
- Output ONLY the final object in VALID JSON format — no explanations, no extra text.
`;

  let data;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: tosSendPrompt,
    });
    // console.log(response.text);
    let dataText = response.text;
    dataText = dataText.replace(/```json|```/g, "").trim();

    try {
      data = JSON.parse(dataText);
      console.log(data);
    } catch (err) {
      return NextResponse.json(
        { error: "Parser did not return valid JSON", raw: response.text },
        { status: 400 }
      );
    }

    if (!validateStructureAndValues(data, userData)) {
      return NextResponse.json(
        {
          error:
            "Parser response does not match the template structure or altered pre-filled values",
          raw: data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error processing parsing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
