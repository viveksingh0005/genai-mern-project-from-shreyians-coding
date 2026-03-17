import React from "react";
import {useInterview} from '../hooks/useinterview.js'
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
const Home = () => {

    const {loading,generateReport}=useInterview()
    const [jobDescription ,setJobDescription] =useState("")
    const [SelfDescription,SetSelfDescription] = useState("")
    const resumeInputRef =useRef()

    const navigate=useNavigate()

    const handleGenerateReport = async()=>{
        const resumeFile = resumeInputRef.current.files[0]
        await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)

       
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
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
             onChange={(e)=>{SetJobDescription(e.target.value)}}
            name="jobDescription"
            placeholder="Paste the job description here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <label
            htmlFor="resume"
            className="text-gray-700 font-medium"
          >
            Upload Resume
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf,.doc,.docx"
            ref ={resumeInputRef}
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
            onChange={(e)=>{SetSelfDescription(e.target.value)}}
            name="selfDescription"
            id="selfDescription"
            placeholder="Describe your skills, experience, and strengths..."
            className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Generate Button */}
        <button
        onClick ={handleGenerateReport} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
          Generate Interview Report
        </button>

      </div>
    </div>
  );
};

export default Home;