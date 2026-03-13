const mongoose = require('mongoose');


/**
 * -job dscription schema: String
 * resume text: String
 * self description :String
 * matchscore:number
 * technical questions:
 *          [{
 *              question:"",
 *              intention:"",
 *              answer:"",
 * 
 *           }]
 * behavioral questions:[{
 *              question:"",
 *              intention:"",
 *              answer:""
 * 
 *              }]
 * skill gap:
 *              [{
 *              skill:"",
 *              severity:{
 *                  type:String,
 *                  enum:["low","                  medium", high"
 *              ]} }]               
 * preparation plan :[{
 *              day:Number,
 *              focus:String,
 *              tasks:[String]
 *              }]
 * Overall feedback
 */
const technicalQuestionsSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Technical question is required"]
    },
    intention:{
        type: String,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String,
        required:[true, "Intention is required"]
    },
},{
    _id:false
})

const behavioralQuestionsSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true, "Behavioral question is required"]
    },
    intention:{
        type: String,
        required:[true, "Intention is required"]
    },
    answer:{
        type: String,
        required:[true, "Intention is required"]
    },
  
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        require:[true,"skill is required"]
    },
      severity: {
         type:String,
        enum:["low", "medium","high"],
        require:[true,"skill is required"]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"job description is required"]
    },
    resume:{
        type: String,
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]

},
{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;