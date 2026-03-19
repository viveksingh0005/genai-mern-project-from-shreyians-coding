import { useState, useEffect } from "react"

import { useParams } from "react-router"
import {useInterview} from '../hooks/useinterview.js'


const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-xl shadow-sm bg-white">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex gap-3 items-center">
          <span className="font-semibold text-blue-600">Q{index + 1}</span>
          <p className="text-gray-800">{item.question}</p>
        </div>

        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {open && (
        <div className="p-4 border-t space-y-4">
          <div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Intention
            </span>
            <p className="mt-2 text-gray-700">{item.intention}</p>
          </div>

          <div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Model Answer
            </span>
            <p className="mt-2 text-gray-700">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className="border rounded-xl p-4 bg-white shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
        Day {day.day}
      </span>
      <h3 className="font-semibold text-gray-800">{day.focus}</h3>
    </div>

    <ul className="space-y-2">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-center gap-2 text-gray-700">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {task}
        </li>
      ))}
    </ul>
  </div>
)
const NAV_ITEMS = [
    { id: "technical", label: "Technical Questions" },
    { id: "behavioral", label: "Behavioral Questions" },
    { id: "roadmap", label: "Preparation Road Map" },
]
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical")
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">
          Loading your interview plan...
        </h1>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-[250px_1fr_300px] gap-6">

        {/* Left Nav */}
        <nav className="bg-white p-5 rounded-xl shadow-sm h-fit">
          <p className="text-gray-500 text-sm mb-3">Sections</p>

          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`text-left px-3 py-2 rounded-lg ${
                  activeNav === item.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => getResumePdf(interviewId)}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Download Resume
          </button>
        </nav>

        {/* Main Content */}
        <main className="space-y-6">

          {activeNav === "technical" && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Technical Questions
                </h2>
                <span className="text-sm text-gray-500">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Behavioral Questions
                </h2>
                <span className="text-sm text-gray-500">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Preparation Road Map
                </h2>
                <span className="text-sm text-gray-500">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>

              <div className="space-y-4">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="bg-white p-5 rounded-xl shadow-sm h-fit">

          <div className="text-center">
            <p className="text-gray-500 text-sm">Match Score</p>

            <div className="text-4xl font-bold text-blue-600 my-2">
              {report.matchScore}%
            </div>

            <p className="text-gray-500 text-sm">
              Strong match for this role
            </p>
          </div>

          <hr className="my-5" />

          <div>
            <p className="text-gray-500 text-sm mb-3">
              Skill Gaps
            </p>

            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded bg-red-100 text-red-600"
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}

export default Interview