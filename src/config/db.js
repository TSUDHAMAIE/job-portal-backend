const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        const connectionStatus=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED: ${connectionStatus.connection.host}`);
    }catch(error){
        console.error("Database Connection failed:",error.message);
        process.exit(1);
    }
};module.exports=connectDB;