import axios from "axios";
import { getRedisClient } from "../config/redis"

export const getEcoAdvice=async(data:{totalCO2:number})=>{
  try{
    if (!data || typeof data.totalCO2 !=="number"){
      throw new Error("Invalid CO2 data");
    }
    const redisClient=getRedisClient();
    const cacheKey=`eco:${data.totalCO2}`;
    const cachedData=await redisClient.get(cacheKey);
    if(cachedData){
      console.log("Cache HIT");
      return JSON.parse(cachedData);
    }
    console.log("Cache MISS→Calling AI");
    const prompt=`You are an environmental expert.Flight CO2 emission: ${data.totalCO2} kg.Give exactly 3 short, practical eco-friendly tips.Each tip should be under 15 words.Use bullet points.`;

    const response=await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model:"gpt-4o-mini",
        messages:[{ role:"user",content:prompt}],
        temperature:0.7,
      },
      {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const advice=response.data?.choices?.[0]?.message?.content || "No advice generated";
    await redisClient.set(cacheKey,JSON.stringify(advice),{EX:3600});
    return advice;
  } catch(error:any){
    console.error("AI Service Error:",error?.response?.data || error.message);
    return [
      "Use direct flights to reduce emissions",
      "Offset carbon via verified programs",
      "Travel light to reduce fuel consumption",
    ];
  }
};