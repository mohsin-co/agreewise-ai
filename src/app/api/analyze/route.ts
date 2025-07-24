import { NextResponse } from "next/server";
import OpenAI from "openai"; // We still use the OpenAI library!
import * as cheerio from "cheerio";

// Instantiate the client, but tell it to use Groq's servers
const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1", // <-- THE FIRST CHANGE
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { url, text } = await req.json();
    let textContent: string = "";

    if (url) {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      $("script, style, nav, footer, header").remove();
      textContent = $("body").text().replace(/\s\s+/g, " ").trim();
    } else if (text) {
      textContent = text;
    }

    if (!textContent) {
      return NextResponse.json(
        { error: "No content provided to analyze." },
        { status: 400 }
      );
    }

    // Call the Groq API using the OpenAI-compatible method
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // <-- THE SECOND CHANGE (using a Llama 3 model)
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an expert legal analyst named AgreeWise. Your task is to analyze the provided text and return a valid JSON object with two keys: 'summary' (a brief, one-sentence summary) and 'keyPoints' (an array of the most critical string bullet points).",
        },
        {
          role: "user",
          content: textContent.substring(0, 8000), // Llama's context window is smaller, so we send less text
        },
      ],
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error(
        "AI failed to generate a valid response (content was null)."
      );
    }

    const jsonResponse = JSON.parse(responseText);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `AI generation failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
