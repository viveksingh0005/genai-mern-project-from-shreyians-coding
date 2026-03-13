const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});


const interviewReportSchema = z.object({
    matchscore: z.number().describe("A score between 0 and 100 indicating how well the candidate profile matches the job describe"),
    technicalQuestions:z.array(z.object({question:z.string().describe("the technical question that can be asked in the interview"),
       intention:z.string().describe("The intention of interviewer behind asking this question") ,
       answer:z.string().describe("how to answer this question and important points to note")
    })).describe("Technical questions that can be asked in the interview along with their intention"),

    behavioralQuestions:z.array(z.object({question:z.string().describe("the behavioral question that can be asked in the interview"),
       intention:z.string().describe("The intention of interviewer behind asking this question") ,
       answer:z.string().describe("how to answer this question and important points to note")
    })).describe("Technical question that can be asked in the interview along with their intention"),
    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap a candidate lacking")
    })).describe("List of skill gap in the candidate's profile along with their severity"),
    preparationPlan:z.array(z.object({
        day:z.number().describe("number of days in the preparation plan from day 1"),
        focus:z.string().describe("focus area to gain the required skill"),
        tasks:z.array(z.string()).describe("List of tasks to be done")
    })).describe("A day wise preparation plan for the candidate to follow in order to gain the skills")
    
})
async function generateInterviewReport({resume,selfDescription,jobDescription}){
    const prompt=`generate an interview report for a candidate with the following details:
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description: ${jobDescription}
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            jsonSchema:zodToJsonSchema(interviewReportSchema,)
        }
    })
    return (JSON.parse(response.text))

}

module.exports = generateInterviewReport;