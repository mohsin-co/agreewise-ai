"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
}

export default function AnalyzerTool() {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "file">("url");
  const [url, setUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    let body = {};
    if (activeTab === "url") {
      body = { url };
    } else if (activeTab === "text") {
      body = { text: inputText };
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex border-b border-border-gray mb-4">
        <button
          onClick={() => setActiveTab("url")}
          className={`py-2 px-6 font-semibold transition-colors duration-200 ${
            activeTab === "url"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-light-gray hover:text-white"
          }`}
        >
          URL
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`py-2 px-6 font-semibold transition-colors duration-200 ${
            activeTab === "text"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-light-gray hover:text-white"
          }`}
        >
          Text
        </button>
        <button
          onClick={() => setActiveTab("file")}
          disabled
          className={`py-2 px-6 font-semibold transition-colors duration-200 ${
            activeTab === "file"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-gray-600 cursor-not-allowed"
          }`}
        >
          File
        </button>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          {activeTab === "url" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label
                htmlFor="url-input"
                className="block text-sm font-medium text-light-gray mb-2"
              >
                Enter a URL
              </label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/privacy-policy"
                required
                className="w-full p-3 rounded-md bg-gray-800 border border-border-gray focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              />
            </motion.div>
          )}
          {activeTab === "text" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label
                htmlFor="text-input"
                className="block text-sm font-medium text-light-gray mb-2"
              >
                Paste your text
              </label>
              <textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the full text of the policy here..."
                required
                rows={10}
                className="w-full p-3 rounded-md bg-gray-800 border border-border-gray focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              />
            </motion.div>
          )}
          {activeTab === "file" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-12 border-2 border-dashed border-border-gray rounded-md"
            >
              <p className="text-light-gray">
                File upload functionality is coming soon!
              </p>
            </motion.div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading || activeTab === "file"}
              className="w-full p-4 rounded-md bg-brand-blue hover:bg-blue-700 font-semibold text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12 text-left w-full">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-md bg-red-900 border border-red-700 text-red-200"
          >
            <p className="font-bold">An Error Occurred</p>
            <p>{error}</p>
          </motion.div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-border-gray pb-2">
                Summary
              </h2>
              <p className="mt-4 text-light-gray bg-gray-800 p-4 rounded-md">
                {result.summary}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-border-gray pb-2">
                Key Points
              </h2>
              <ul className="mt-4 space-y-3">
                {result.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-md bg-gray-800"
                  >
                    <span className="text-brand-blue mt-1">✓</span>
                    <p className="text-light-gray">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
