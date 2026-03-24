import React, { useEffect, useState, useRef } from "react";
import { useInterview } from "./Features/interview/hooks/useinterview";
import { useNavigate } from "react-router-dom";

const GUEST_REPORT_KEY = "guest_report_token_v1"; // ← name it something less obvious

// Helper: generate a short random-looking string (not cryptographically secure, just enough for UX)
const generateGuestSecret = () => {
  return "g_" + Math.random().toString(36).substring(2, 10) +
         "_" + Date.now().toString(36).slice(-6);
};

const First = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isGuestLimitReached, setIsGuestLimitReached] = useState(false);
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  // Check on mount if guest already used their one chance
  useEffect(() => {
    const storedToken = localStorage.getItem(GUEST_REPORT_KEY);

    // We consider it used if ANY value exists (even if tampered with)
    // This is stricter than checking === some expected value
    if (storedToken) {
      setIsGuestLimitReached(true);
    }
  }, []);

  const handleGenerateReport = async () => {
    // 1. Already marked as used → block early
    if (isGuestLimitReached) {
      alert(
        "Free guest trial used. Sign up or log in to generate more reports."
      );
      return;
    }

    const resumeFile = resumeInputRef.current?.files?.[0];

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (!data || !data._id) {
        alert("Failed to generate report. Please try again.");
        return;
      }

      // ───────────────────────────────────────────────
      // SUCCESS → mark as used with a random-looking token
      const secret = generateGuestSecret();
      localStorage.setItem(GUEST_REPORT_KEY, secret);
      setIsGuestLimitReached(true);
      // ───────────────────────────────────────────────

      // Optional: you can even store a short hash of something
      // localStorage.setItem(GUEST_REPORT_KEY + "_h", btoa(secret + jobDescription.slice(0,30)));

      navigate(`/interview/${data._id}`);
    } catch (err) {
      console.error("Generate report error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (loading) {
    return (
      <main className="loading-screen min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-700">
          Loading your interview plan...
        </h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 md:p-10 space-y-7">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          AI Interview Report Generator
        </h1>

        {isGuestLimitReached && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
            <p className="text-amber-800 font-medium">
              You've used your one free guest report.
            </p>
            <p className="text-amber-700 mt-1 text-sm">
              Sign in or create an account to generate unlimited reports and save your history.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium"
              >
                Sign up
              </a>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-gray-700 font-medium block">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            disabled={isGuestLimitReached}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-60 disabled:bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="resume" className="text-gray-700 font-medium block">
            Upload Resume (PDF, DOC, DOCX)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            ref={resumeInputRef}
            disabled={isGuestLimitReached}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-5 file:rounded-lg
              file:border-0 file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="selfDescription" className="text-gray-700 font-medium block">
            About Yourself (optional)
          </label>
          <textarea
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            id="selfDescription"
            disabled={isGuestLimitReached}
            placeholder="Your skills, experience, key achievements, career goals..."
            className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-60 disabled:bg-gray-50"
          />
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={loading || isGuestLimitReached}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold
            hover:bg-blue-700 active:bg-blue-800 transition duration-200
            shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading
            ? "Generating..."
            : isGuestLimitReached
            ? "Free trial used – sign in for more"
            : "Generate Interview Report"}
        </button>

      </div>
    </div>
  );
};

export default First;