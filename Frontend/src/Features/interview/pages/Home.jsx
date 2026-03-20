import React, { useEffect, useState, useRef } from "react";
import { useInterview } from "../hooks/useinterview.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport } = useInterview();
  const { getReportById }=useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, SetSelfDescription] = useState("");
  const resumeInputRef = useRef();

  // ✅ NEW STATE (for history)
  const [reports, setReports] = useState([]);

  const navigate = useNavigate();

  // ✅ FETCH HISTORY (NEW - no change to your logic)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/interview", {
          credentials: "include",
        });

        const data = await res.json();
        setReports(data.interviewReports || []);
      } catch (err) {
        console.log("Error fetching reports", err);
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    // ✅ SAFETY CHECK
    if (!data || !data._id) {
      alert("Failed to generate report. Please try again.");
      return;
    }

    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ SIDEBAR (NEW) */}
      <div className="w-72 bg-gray-900 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">History</h2>

        {reports.length === 0 && (
          <p className="text-gray-400 text-sm">No reports yet</p>
        )}

        {reports.map((report) => (
          <div
            key={report._id}
            onClick={() => navigate(`/interview/${report._id}`)}
            className="p-3 mb-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
          >
            <p className="text-sm truncate">
              {report.jobDescription || "Untitled"}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ YOUR ORIGINAL UI (UNCHANGED) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6">

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            AI Interview Report Generator
          </h1>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">
              Job Description
            </label>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              placeholder="Paste the job description here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <label htmlFor="resume" className="text-gray-700 font-medium">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              ref={resumeInputRef}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:bg-blue-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:mr-4 hover:file:bg-blue-600"
            />
          </div>

          {/* Self Description */}
          <div className="space-y-2">
            <label
              htmlFor="selfDescription"
              className="text-gray-700 font-medium"
            >
              Self Description
            </label>
            <textarea
              onChange={(e) => SetSelfDescription(e.target.value)}
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe your skills, experience, and strengths..."
              className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Generate Interview Report
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;