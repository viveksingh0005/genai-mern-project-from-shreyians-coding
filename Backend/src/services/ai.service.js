const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  )
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  const prompt = `
You are a senior technical interviewer.

Analyze the candidate information and generate an interview preparation report.

Return ONLY valid JSON in this structure:

{
  "matchScore": number,
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGaps": [
    { "skill": string, "severity": "low|medium|high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": string, "tasks": [string] }
  ]
}

Candidate Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`

  try {

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    })

    const text = response.text

    const jsonStart = text.indexOf("{")
    const jsonEnd = text.lastIndexOf("}") + 1

    const jsonString = text.slice(jsonStart, jsonEnd)

    const parsed = JSON.parse(jsonString)

    const validated = interviewReportSchema.parse(parsed)

    console.log(JSON.stringify(validated, null, 2))

    return validated

  } catch (error) {

    console.error("AI generation error:", error)

  }
}

module.exports = generateInterviewReport



// const { GoogleGenAI } = require("@google/genai");
// const {z} = require("zod")
// const {zodToJsonSchema} = require("zod-to-json-schema")
// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_GENAI_API_KEY
// });


// const interviewReportSchema = z.object({
//     matchscore: z.number().describe("A score between 0 and 100 indicating how well the candidate profile matches the job describe"),
//     technicalQuestions:z.array(z.object({question:z.string().describe("the technical question that can be asked in the interview"),
//        intention:z.string().describe("The intention of interviewer behind asking this question") ,
//        answer:z.string().describe("how to answer this question and important points to note")
//     })).describe("Technical questions that can be asked in the interview along with their intention"),

//     behavioralQuestions:z.array(z.object({question:z.string().describe("the behavioral question that can be asked in the interview"),
//        intention:z.string().describe("The intention of interviewer behind asking this question") ,
//        answer:z.string().describe("how to answer this question and important points to note")
//     })).describe("Technical question that can be asked in the interview along with their intention"),
//     skillGaps:z.array(z.object({
//         skill:z.string().describe("The skill which the candidate is lacking"),
//         severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap a candidate lacking")
//     })).describe("List of skill gap in the candidate's profile along with their severity"),
//     preparationPlan:z.array(z.object({
//         day:z.number().describe("number of days in the preparation plan from day 1"),
//         focus:z.string().describe("focus area to gain the required skill"),
//         tasks:z.array(z.string()).describe("List of tasks to be done")
//     })).describe("A day wise preparation plan for the candidate to follow in order to gain the skills")
    
// })
// async function generateInterviewReport({resume,selfDescription,jobDescription}){
//     const prompt=`generate an interview report for a candidate with the following details:
//     Resume:${resume}
//     Self Description:${selfDescription}
//     Job Description: ${jobDescription}
//     `
//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents:prompt,
//         config:{
//             responseMimeType:"application/json",
//             jsonSchema:zodToJsonSchema(interviewReportSchema,)
//         }
//     })
//     console.log(response.text)

// }

// module.exports = generateInterviewReport;
// can you fix so that I can get desired data format