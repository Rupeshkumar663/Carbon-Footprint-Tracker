import dotenv from "dotenv";
import connectDB from "./config/Db";
import app from "./app";
import { connectRedis } from "./config/redis";
dotenv.config();
const PORT:number|string=process.env.PORT||5000;
const startServer=async()=>{
  try{
    await connectDB();
    await connectRedis();
    app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    });
  } catch(error){
    console.error("Server failed to start:",error);
    process.exit(1);
  }
};
startServer();