import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from "cheerio";
import {NextResponse} from "next/server";

// IMPORTANT: Access your API key from the environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// The main function that handles POST requests
export async function POST(req: Request) {
  // 1. Extract the 'url' from the request body
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // 2. Fetch the HTML content from the user-provided URL
    const response = await fetch(url);
    const html = await response.text();

    // 3. Use Cheerio to parse the HTML and extract the text
    const $ = cheerio.load(html);
    // Remove script and style elements to clean up the text
    $("script, style, nav, footer, header").remove();
    const textContent = $("body").text().replace(/\s\s+/g, " ").trim();

    if (!textContent) {
      return NextResponse.json({ error: "Could not extract text content from the URL." }, { status: 500 });
    }

    // 4. Craft the prompt for the AI
    const prompt = `
      As an expert legal analyst named 'AgreeWise', your task is to analyze the following Terms & Conditions or Privacy Policy text.
      Provide a clear, concise, and easy-to-understand summary.
      Identify and list the most critical clauses, both positive and negative, that a user must be aware of.
      Focus on data privacy, content ownership, liability, arbitration, and cancellation terms.

      Return your analysis ONLY as a valid JSON object with two keys:
      1. "summary": A brief, one-to-two sentence overall summary of the policy.
      2. "keyPoints": An array of strings, where each string is a single, crucial point from the text.

      Do not include any introductory text, apologies, or explanations outside of the JSON object.

      Here is the text to analyze:
      ---
      ${textContent.substring(0, 20000)}
      ---
    `;

    // 5. Call the AI model and get the response
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponseText = result.response.text();

    // 6. Clean up and parse the AI response
    // The AI might sometimes wrap its JSON in backticks, so we clean it.
    const cleanedJsonString = aiResponseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedJsonString);

    // 7. Send the structured JSON back to the client
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to analyze the URL." }, { status: 500 });
  }
}