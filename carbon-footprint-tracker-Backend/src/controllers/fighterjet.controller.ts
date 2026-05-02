import { Request, Response } from "express";
import FighterCarbon from "../models/fighterjet.model"
import { calculateFighterCarbon } from "../services/flighjetcarbon.service";
import { getRedisClient } from "../config/redis";
import fighterjetModel from "../models/fighterjet.model";
import { generateCarbonAdvice } from "../services/ai.service";

//fighterjetcarbon-----------------------------------------------------
export const calculateFighterCarbonController=async(req:Request,
  res:Response)=>{
  try {
    const userId=(req as any).user?._id;
    const redisClient=getRedisClient()
    const { hours,payload,speed,altitude,jetModel,mission }=req.body;
     if(hours<=0 ||payload<0 || altitude<0 ||speed<=0 || !jetModel || !mission){
        return res.status(400).json({message:"please fill all fields"});
     }
     const cacheKey = `fighter:${userId}-${hours}-${payload}-${speed}-${altitude}-${jetModel}-${mission}`;

     const cached=await redisClient.get(cacheKey)
     if(cached){
         console.log("Cache HIT");
         return res.status(200).json({success:true,data:JSON.parse(cached)});
       }
     console.log("Cache MISS");
     const result=calculateFighterCarbon({
      hours:Number(hours),
      payload:Number(payload),
      speed:Number(speed),
      altitude:Number(altitude),
      jetModel,
      mission,
    });
    const distance=Number((speed*hours).toFixed(2));
    const aiAdvice=await generateCarbonAdvice("fighter",{
      jetModel,
      mission,
      hours,
      speed,
      altitude,
      payload,
      carbon:result.carbon,
      ecoScore:result.ecoScore,
    });
    const data=await FighterCarbon.create({
      userId,
      jetModel,
      mission,
      hours,
      payload,
      speed,
      altitude,
      distance,
      carbon:result.carbon,
      ecoScore:result.ecoScore,
      label:result.label,
    });
    const finalResponse={
      ...data.toObject(),
      aiAdvice,
    };
    await redisClient.set(cacheKey,JSON.stringify(finalResponse),{EX:3600})
    return res.status(200).json({success:true,meesgae:"carbon calculate successfully",data:finalResponse});

  } catch(error){
    return res.status(500).json({success:false,message:"Server Error",error});
  }
};

//getallco2-----------------------------------------------------

export const getFighterTotalCO2=async(req:Request,res:Response)=>{
  try {
    const user=(req as any).user;
    if(!user||!user._id){
      return res.status(401).json({message:"Unauthorized"});
    }
    const userId=user._id.toString();
    const redisClient=getRedisClient();
    const cacheKey=`fighterTotal:${userId}`;
    const cached=await redisClient.get(cacheKey);
    if(cached){
      return res.json({message:"data fetch from redis",totalCO2:JSON.parse(cached)});
    }
    const result=await fighterjetModel.aggregate([
      { $match:{ 
            userId 
         } 
      },
      {
        $group:{
          _id:null,
          totalCO2:{$sum:"$carbon"}
        }
      }
    ]);
    const totalCO2=Number((result[0]?.totalCO2 || 0).toFixed(2));
    await redisClient.set(cacheKey,JSON.stringify(totalCO2),{EX:3600});
    return res.json({message:"totalcarbon fetch successfully",totalCO2});

  } catch(error:any){
    console.error(error);
    return res.status(500).json({message:"Internal Server Error",error});
  }
};