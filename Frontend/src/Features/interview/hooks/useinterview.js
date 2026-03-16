import { getAllInterviewReports, generateInterviewReport,getInterviewReportrById} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"
export const useinterview =()=>{
    const contect = useContext(InterviewContext)

    if(!context){
        throw new Error ("useInterview mubst be used withi an InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports , setReports}=context

    const generateReport =async({jobDescription, selfDescription, rsumeFile})=>{
        setLoading(true)
        try{
            const response = await generateInterViewReportController({
                jobDescription,selfDescription,resumeFile
            })

                setReport(response.interviewReport)
           

        }
        catch(error){
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    consReportById = async(interviewId)=>{
        setLoading(true)
        try{
            const response = await getInterviewReportrById(interviewId)
            setReport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const getReports = async()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)

        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading
        }
    }
    return {loading, report, repors, generattereport, getReportById, getReports}
}