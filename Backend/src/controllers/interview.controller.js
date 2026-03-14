const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")

const interviewReportModel = require("../models/interviewReport.Model")
async function generateInterViewReportController(req,res){
    

    const resumeContent = await (new pdfParse.PDFParse(UNIT8Array.from(req.file.buffer))).getText()
    const{selfDescription,jobDescription} = req.body

    const interViewReportByAi = await generateInterviewReport({

        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
       ...interViewReportByAi
    })
    res.status(201).json({
        message:"Interview report generated success",
        interviewReport
    })
}
module.exports = {generateInterViewReportController}