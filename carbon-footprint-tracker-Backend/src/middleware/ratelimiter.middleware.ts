import { Request, Response, NextFunction } from "express";
import { getRedisClient } from "../config/redis";
const WINDOW=60; 
const LIMIT=20;
export const rateLimiter=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const redisClient=getRedisClient();
    const ip =req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket.remoteAddress ||"unknown";
    const key=`rate:${ip}`;
    const count=await redisClient.incr(key);
    if(count===1){
      await redisClient.expire(key,WINDOW);
    }
    const remaining=LIMIT-count;
    res.setHeader("X-RateLimit-Limit",LIMIT);
    res.setHeader("X-RateLimit-Remaining",Math.max(remaining,0));
    res.setHeader("X-RateLimit-Reset",WINDOW);
    if(count>LIMIT){
      return res.status(429).json({success:false,message:"Too many requests. Try again later."});}
      next();
  } catch(error){
    console.error("RateLimiter Error:",error);
    next();
  }
};