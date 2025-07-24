"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

// New interface for our "Smart Analysis" response
interface AnalysisResult {
  verdict: "Low Risk" | "Medium Risk" | "High Risk";
  summary: string;
  goodPoints: string[];
  cautionPoints: string[];
  redFlags: string[];
}

// A helper component to render the points lists with nice styling
const PointsList = ({
  title,
  points,
  icon,
  colorClass,
}: {
  title: string;
  points: string[];
  icon: string;
  colorClass: string;
}) => {
  if (points.length === 0) return null;
  return (
    <div>
      <h3 className={`text-2xl font-bold border-b-2 pb-2 mb-4 ${colorClass}`}>
        {title}
      </h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-md bg-gray-800"
          >
            <span className={`mt-1 font-bold ${colorClass}`}>{icon}</span>
            <p className="text-light-gray">{point}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default function AnalyzerTool() {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "file">("url");
  const [url, setUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // ... (handleSubmit function is the same as the last version, no changes needed here)
    event.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    let requestBody: any;
    const headers: Record<string, string> = {};

    try {
      if (activeTab === "url" || activeTab === "text") {
        const bodyObject = activeTab === "url" ? { url } : { text: inputText };
        requestBody = JSON.stringify(bodyObject);
        headers["Content-Type"] = "application/json";
      } else if (activeTab === "file") {
        if (!selectedFile) throw new Error("Please select a file to analyze.");
        const formData = new FormData();
        formData.append("file", selectedFile);
        requestBody = formData;
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: headers,
        body: requestBody,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verdictStyles = {
    "Low Risk": "bg-green-500/20 text-green-400 border-green-500",
    "Medium Risk": "bg-yellow-500/20 text-yellow-400 border-yellow-500",
    "High Risk": "bg-red-500/20 text-red-400 border-red-500",
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* --- TABS & FORM --- */}
      {/* This part remains the same as our last working version */}
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
          className={`py-2 px-6 font-semibold transition-colors duration-200 ${
            activeTab === "file"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-light-gray hover:text-white"
          }`}
        >
          File
        </button>
      </div>
      <div className="pt-4">
        <form onSubmit={handleSubmit}>
          {/* ... all the tab content (url, text, file inputs) ... */}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border-gray rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800/80 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-light-gray"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {selectedFile ? (
                    <p className="font-semibold text-brand-blue">
                      {selectedFile.name}
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-light-gray">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF or TXT files only
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.txt"
                />
              </label>
            </motion.div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
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

      {/* --- NEW RESULTS DISPLAY --- */}
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
            className="space-y-12"
          >
            {/* Verdict Section */}
            <div
              className={`p-6 rounded-lg border ${
                verdictStyles[result.verdict]
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">
                Overall Verdict: {result.verdict}
              </h3>
              <p className="text-lg">{result.summary}</p>
            </div>

            {/* Points Lists */}
            <PointsList
              title="Good Points"
              points={result.goodPoints}
              icon="✓"
              colorClass="text-green-400 border-green-500"
            />
            <PointsList
              title="Points of Caution"
              points={result.cautionPoints}
              icon="⚠️"
              colorClass="text-yellow-400 border-yellow-500"
            />
            <PointsList
              title="Red Flags"
              points={result.redFlags}
              icon="❌"
              colorClass="text-red-400 border-red-500"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
