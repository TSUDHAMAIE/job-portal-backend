const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,required:true,unique:true
    },
    phone:{
        type:String,required:true,unique:true
    },
    role:{
        type:String,enum:["administrator","placement-coordinator","staff","student"],required:true
    },
    password:{
        type:String,required:true
    },
    emailverified:{
        type:Boolean,default:false
    },
    phoneverified:{
        type:Boolean,default:false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordLastUpdatedAt:{
        type:Date,default:()=>new Date()
    },
    passwordExpiresAt:{
        type:Date,default:()=>new Date(Date.now()+90*24*60*60*1000)
    },
    lastLogin:{
        type:Date
    },
    lastLogout:{
        type:Date
    }
},{timestamps:true});
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return;
    try{
        const salt=await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        this.password=await bcrypt.hash(this.password,salt);
        this.passwordLastUpdatedAt=new Date();
        this.passwordExpiresAt=new Date(Date.now()+90*24*60*60*1000);
        //next();
    }catch(error){
        next(error);
    }
});
userSchema.methods.comparePassword=async function(enteredpass){
    return await bcrypt.compare(enteredpass,this.password);
}
module.exports=mongoose.model("User",userSchema);