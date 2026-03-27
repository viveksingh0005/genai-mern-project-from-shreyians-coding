import React from 'react'
import NavBar from './NavBar'
import { motion } from "framer-motion";
export const TrueHome = () => {
  return (
   <>
   <NavBar/>
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-300 opacity-30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Build Your Resume
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              That Gets You Hired
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-lg">
            Create stunning, professional resumes in minutes with our modern builder. Designed to impress recruiters and land your dream job.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition shadow-lg">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              View Templates
            </button>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-6 rotate-3 hover:rotate-0 transition duration-500">
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-100 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
              <div className="mt-6 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
            <div className="h-3 w-24 bg-green-400 rounded"></div>
            <p className="text-xs text-gray-500 mt-1">ATS Friendly</p>
          </div>
        </motion.div>
      </div>
    </section>
      <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Powerful Features to Boost Your Career
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Not just a resume builder — a complete smart career assistant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Feature 1 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transition">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Create Professional Resume
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Build stunning, ATS-friendly resumes in minutes using modern templates. Customize everything with ease and stand out to recruiters.
            </p>

            <div className="mt-6 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Resume Preview UI
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              AI Interview Question Prediction
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Upload your resume and get smart, AI-generated interview questions tailored to your skills, experience, and job role.
            </p>

            <div className="mt-6 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              AI Questions Preview
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}



