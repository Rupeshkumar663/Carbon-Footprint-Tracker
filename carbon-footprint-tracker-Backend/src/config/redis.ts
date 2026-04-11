import { createClient,RedisClientType } from "redis";
import dotenv from "dotenv"
dotenv.config();
let redisClient:RedisClientType| null=null;

export const connectRedis=async()=>{
    try {
        if(redisClient){
            return redisClient;
        }
        const REDIS_URL=process.env.REDIS_URL;
        if(!REDIS_URL){
            console.log("redis url missing")
            process.exit(1)
        }
        redisClient=createClient({
            url:REDIS_URL,
            socket:{
                reconnectStrategy:(retries)=>{
                 console.log(`Redis reconnect attempt:${retries}`);
                if(retries>5){
                 console.error("Redis max retries reached");
                 return new Error("Retry attempts exhausted");
                }
                return Math.min(retries*100,3000);
              }
            }
        })

        redisClient.on("error",(error)=>{
         console.error("Redis Error:",error);
        });
        redisClient.on("ready",()=>{
         console.log(" Redis ready");
        });
        await redisClient.connect();
        console.log("Redis Connected Successfully");
        return redisClient;
    } catch(error){
        console.error("Failed to initialize Redis:",error);
        process.exit(1); 
    }
}

export const getRedisClient=():RedisClientType=>{
  if(!redisClient){
    throw new Error("Redis not initialized");
  }
  return redisClient;
};