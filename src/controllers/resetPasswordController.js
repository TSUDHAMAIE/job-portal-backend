const User=require('../models/User');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');
//export
exports.forgotPassword=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(404).json({message:"No user found with this email"});
        const resetToken=crypto.randomBytes(32).toString("hex");
        const hashedToken=crypto.createHash("sha256").update(resetToken.token).digest("hex");
        user.passwordResetToken=hashedToken;
        user.passwordExpiresAt= Date.now()+90*24*60*60*1000;
        await user.save({validateBeforeSave:false});
        res.status(200).json({message:"password reset successfull"})
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.resetPassword=async(req,res)=>{
    const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    //24hr link validity
    const user=await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
    if(!user)return res.status(404).json({error:"User not found"});
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    user.passwordLastUpdatedAt=new Date();
    user.passwordExpiresAt=new Date(Date.now()+90*24*60*60*1000);
    await user.save();
    res.status(200).json({message:"password reset successfull"})
};