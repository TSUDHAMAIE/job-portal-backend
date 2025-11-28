const express=require('express')
const {forgotPassword,resetPassword}=require('../controllers/resetPasswordController.js')
const {signup,signin,signout}=require('../controllers/authController.js');
const {protect}=require('../middleware/authMiddleware.js');
const router=express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/signout",protect,signout);
router.post("/forgotpassword",forgotPassword);
router.patch("/resetPassword/:token",resetPassword);
module.exports=router;