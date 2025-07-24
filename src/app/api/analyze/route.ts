import { NextResponse } from "next/server";
import OpenAI from "openai";
import * as cheerio from "cheerio";
import pdf from "pdf-parse/lib/pdf-parse";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    // --- 1. EXTRACT TEXT CONTENT (from URL, Text, or File) ---
    let textContent: string = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const { url, text } = await req.json();
      if (url) {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        $("script, style, nav, footer, header, aside").remove();
        textContent = $("body").text().replace(/\s\s+/g, " ").trim();
      } else if (text) {
        textContent = text;
      }
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) throw new Error("No file found.");

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      if (file.name.endsWith(".pdf")) {
        const data = await pdf(fileBuffer);
        textContent = data.text;
      } else if (file.name.endsWith(".txt")) {
        textContent = fileBuffer.toString("utf-8");
      } else {
        throw new Error("Unsupported file type.");
      }
    }

    if (!textContent || textContent.length < 100) {
      return NextResponse.json(
        { error: "Could not extract sufficient text to analyze." },
        { status: 400 }
      );
    }

    // --- 2. RELEVANCE CHECK (The Gatekeeper) ---
    const relevanceCheck = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a document classifier. Your only job is to determine if the following text is a legal document like a Terms of Service, Privacy Policy, or other user agreement. Respond with only a single word: 'Yes' or 'No'.",
        },
        { role: "user", content: textContent.substring(0, 1000) }, // Check the first 1000 chars
      ],
      temperature: 0,
    });

    const isRelevant = relevanceCheck.choices[0].message.content
      ?.trim()
      .toLowerCase();
    if (isRelevant !== "yes") {
      return NextResponse.json(
        {
          error:
            "The provided content does not appear to be a Terms of Service or Privacy Policy.",
        },
        { status: 400 }
      );
    }

    // --- 3. FULL RISK ASSESSMENT (The Analyst) ---
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are 'AgreeWise', an expert AI legal analyst. Your task is to perform a risk assessment on the provided legal document.
          - Provide a final 'verdict' of "Low Risk", "Medium Risk", or "High Risk".
          - Provide a concise 'summary' of the document's main purpose.
          - Categorize key clauses into three arrays:
            1. 'goodPoints': User-friendly terms (e.g., clear data deletion, user retains content ownership).
            2. 'cautionPoints': Standard but potentially concerning terms (e.g., data sharing with partners, arbitration clauses).
            3. 'redFlags': Highly problematic clauses (e.g., waiving major rights, claiming ownership of user content).
          - Return ONLY a valid JSON object with the keys: "verdict", "summary", "goodPoints", "cautionPoints", "redFlags". If a category is empty, return an empty array.`,
        },
        {
          role: "user",
          content: textContent.substring(0, 8000),
        },
      ],
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText)
      throw new Error("AI failed to generate a valid response.");

    const jsonResponse = JSON.parse(responseText);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
