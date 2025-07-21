// This line tells Next.js that this is a Client Component,
// which means it can use state and interactive hooks.
"use client";

import { useState } from "react";

// Define the structure of the AI's response
interface AnalysisResult {
  summary: string;
  keyPoints: string[];
}

export default function HomePage() {
  // STATE MANAGEMENT
  // 1. To store the URL the user enters
  const [url, setUrl] = useState("");
  // 2. To know when the AI is working
  const [isLoading, setIsLoading] = useState(false);
  // 3. To store the final result from the AI
  const [result, setResult] = useState<AnalysisResult | null>(null);
  // 4. To store any error messages
  const [error, setError] = useState<string | null>(null);


  // FUNCTION TO HANDLE THE FORM SUBMISSION
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the page from reloading on submit
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        // Handle server errors (like 500)
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // THE USER INTERFACE (JSX)
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl text-center">
        
        <h1 className="text-4xl sm:text-5xl font-bold">AgreeWise<span className="text-blue-400">.ai</span></h1>
        <p className="mt-4 text-lg text-gray-400">
          Paste a link to any Terms & Conditions or Privacy Policy to get a clear, AI-powered summary.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/privacy-policy"
            required
            className="flex-grow p-4 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-4 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {/* --- RESULTS DISPLAY --- */}
        <div className="mt-12 text-left w-full">
          {error && (
            <div className="p-4 rounded-md bg-red-900 border border-red-700 text-red-200">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold border-b-2 border-gray-700 pb-2">Summary</h2>
                <p className="mt-4 text-gray-300 bg-gray-800 p-4 rounded-md">{result.summary}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold border-b-2 border-gray-700 pb-2">Key Points</h2>
                <ul className="mt-4 space-y-3">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 rounded-md bg-gray-800">
                      <span className="text-blue-400 mt-1">✓</span> {/* Checkmark */}
                      <p className="text-gray-300">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}