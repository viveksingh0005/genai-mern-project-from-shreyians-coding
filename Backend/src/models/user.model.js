const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"Account already exist with this email addreess"],
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel