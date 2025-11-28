const User=require('../models/User.js');
const jwt=require('jsonwebtoken');
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
};
exports.signup=async(req,res)=>{
    try{
        const{name,email,phone,role,password,passwordconfirm}=req.body;
        if(password!=passwordconfirm)return res.status(400).json({error:"Passowrds donot match"});
        if(!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))return res.status(400).json({error:"enter valid gmail address(include @gmail.com)"});
        if(password.length<8||!/^[A-Za-z0-9_@]+$/.test(password)||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)
        ||!/[_@]/.test(password)){
            return res.status(400).json({error:"password should have length >=8 and have atleast one uppercase,lowercase letter and one digit,one special character. The passowrd can have only @ _ as special characters"});
        }
        if(!/^\d+$/.test(phone)||phone.length!=10)return res.status(400).json({error:"Phone number must be digits only and has 10 digits only"});
        const newUser=await User.create({name,email,phone,role,password});
        const token=signToken(newUser._id);
            res.status(201).json({status:"success",token,user:newUser});
    }catch(error){
        res.status(400).json({status:"fail",message:error.message});
    }
};
exports.signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password) return res.status(400).json({message:"enter all the fields"});
        const user=await User.findOne({email}).select("+password");
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid credentials"});
        }
        if(user.passwordExpiresAt<new Date()){
            return res.status(403).json({message:"expired.please reset your password."});
        }user.lastLogin=new Date();
        await user.save({validateBeforeSave:false});
        const token=signToken(user._id);
        res.status(201).json({status:"success",token,user});
    }catch(error){
        res.status(500).json({error:error.message});
    };
};
exports.signout=async(req,res)=>{
    try{const user=await User.findById(req.user.id);
    user.lastLogout=new Date();
    await user.save({validateBeforeSave:false});
    res.status(200).json({message:"logout sucessfull"});}
    catch(error){
        res.status(500).json({error:error.message});
    }
};