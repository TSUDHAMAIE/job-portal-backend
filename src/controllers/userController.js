const User=require('../models/User');
exports.getme=async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json({status:"success",data:{user}});
};
//admin specific routes
exports.createUser=async(req,res)=>{
    try{
        const {name,email,phone,role,password}=req.body;
        const user=await User.create({
            name,email,phone,role,password
        });
        res.status(201).json({message:"User created successfully",user});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password");
        res.json(users);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.getUserById=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).select("-password");
        if(!user)return res.status(404).json({error:"User not found"});
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.updateUser=async(req,res)=>{
    try{
        const allowedroles=["staff","administrator","placement-coordinator"];
        if(!allowedroles.includes(req.user.role))return res.status(403).json({message:"Access denied"});
        const disallow=["password","passwordLastUpdatedAt","passwordExpiresAt","role","lastLogin","lastLogout","emailverified","phoneverified"];
        for(let field of disallow){
            if(req.body[field]) return res.status(400).json({error:"You cannot modify this field here"});
        }
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({message:"Userupdated"}); 
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        if(!User)return res.status(404).json({error:"User not found"});
        res.status(200).json({message:"User deleted"}); 
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.changePassword=async(req,res)=>{
    try{const user=await User.findById(req.user.id).select("+password");
    const {currentPassword,newPassword,confirmNewPassword}=req.body;
    //if(!currentpassword||!newpassword||!confirmNewPassword)return res.status(400).json({message:"Enter all required fields"});
    //if(newpassword!==confirmNewPassword) return res.status(400).json({message:"new password and confirm password donot match"});
    if(!(await user.comparePassword(currentPassword))){
        return res.status(400).json({message:"Invalid passowrd"});
    }
    user.password=newPassword;
    await user.save();
    res.status(200).json({message:"Password update successfull"});}
    catch(error){ res.status(500).json({error:error.message});}
};
