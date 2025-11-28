const mongoose=require('mongoose');
const auditlogSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"USer",required:true},
    loginAt:{type:Date,default:Date.now()},
    logoutAt:{type:Date}
});
export default mongoose.model("Auditlog",auditlogSchema);