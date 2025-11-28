const jwt=require('jsonwebtoken');
const User=require('../models/User.js');
exports.protect=async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
        }//if user not logged in
        if(!token){
            return res.status(401).json({status:"fail",message:"please login to continue"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const currentUser=await User.findById(decoded.id);
        if(!currentUser){
            return res.status(401).json({status:"fail",message:"User no Longer exists"});
        }
        req.user=currentUser;next();
    }catch(error){
        res.status(401).json({error:error.message});
    }
};
exports.restrictTo=(...roles)=>{
    return(req,res,next)=>{
      if(!roles.includes(req.user.role)) return res.status(403).json({message:"acess denied"});
      next();
    }
}