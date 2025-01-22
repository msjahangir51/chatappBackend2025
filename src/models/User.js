const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"",
    },
    gender:{
        type:String,
        default:''
    },
    dateOfbirth:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const User = mongoose.model("User", UserSchema)
module.exports = {User}