const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    title:{
        type:String,required:true
    },
    company:{
        type:String,required:true,unique:true
    },
    jobDescription:{
        type:String
    },
    salary:{
        type:String,required:true
    },
    deadline:{
        type:Date,required:true
    },
    location:{type:String},
    status:{
        type:String,
        enum:["upcoming","ongoing","completed"],
        default:"upcoming"
    },
    eligibility:{
        minCGPA:Number,
        branches:[String],
        allowedbacklogs:Number,
        batch:Number
    },
    postedBy:{
         type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
},{timestamps:true});
module.exports=mongoose.model("JOb",jobSchema);