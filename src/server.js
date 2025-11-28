const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const User=require('./models/User');
dotenv.config();
const app=express();
//middleware
app.use(cors());
app.use(express.json());
//database
connectDB();
//test sample route
app.get("/",(req,res)=>{
    res.send("backend running succesfully");
});
//main routes
app.use("/api/auth",require('./routes/authRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
