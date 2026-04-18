import {Request,Response} from "express";
import { getCoordinates } from "../services/coordinates.services";
import { getDistance } from "../services/haversine.service";
import { calculateCarbon } from "../services/flightcarbon.service";
import { FlightcarbonModel } from "../models/flightcarbon.model";
import { getRedisClient } from "../config/redis";
import { getEcoAdvice } from "../services/ai.service";
import { WeeklyRecord } from "../types/carbonType";

//FlightCarbon----------------------------------------------
export const FlightCarbon=async(req:Request,res:Response)=>{
    try{
        const {from,to,passengers,seatClass}=req.body
        if(!from || !to ||  typeof passengers !== "number" || passengers<=0 ||!seatClass){
            return res.status(400).json({message:"please fill all fields"});
        }
       const redisClient=getRedisClient()
       const cacheKey=`flight:${from.toLowerCase()}-${to.toLowerCase()}-${passengers}-${seatClass}`;
       const cached=await redisClient.get(cacheKey);
       if(cached) {
         console.log("Cache HIT");
         return res.status(200).json({success:true,data:JSON.parse(cached)});
       }
       console.log("Cache MISS");
       const [fromCoord,toCoord]=await Promise.all([getCoordinates(from),getCoordinates(to)]);
       const distance=getDistance(fromCoord.lat,fromCoord.lon,toCoord.lat,toCoord.lon);
       const flightcarbon=calculateCarbon(distance,passengers,seatClass);
       const advice=await getEcoAdvice(flightcarbon);
       const result={
             from,
             to,
             distance:Number(distance.toFixed(2)),
             ...flightcarbon,
             aiAdvice:advice
         }
       await FlightcarbonModel.create({
             ...result,
             passengers,
             seatClass,
         })
        await redisClient.set(cacheKey,JSON.stringify(result),{EX:3600});
        return res.status(200).json({success:true,data:result});

    } catch(error:any){
        console.error("FlightCarbon Error:",error.message);
        return res.status(500).json({success:false,error:error.message || "Internal Server Error"});
    }
}

//getTotalCo2----------------------------------------------
export const getTotalCO2=async(req:Request,res:Response)=>{
  try{
    const userId=(req as any).user._id;
    const redisClient=getRedisClient()
    const cacheKey=`totalCO2:${userId}`;
    const cached=await redisClient.get(cacheKey);
    if(cached){
         return res.json({source:"cache",data:JSON.parse(cached)});
    }
    const flights=await FlightcarbonModel.find({userId,}).lean();
    const totalCO2=flights.reduce((sum:number,item:any)=>sum +(item.totalCarbon ?? 0),0);
    const ecoScore=Math.max(0,100-totalCO2/200);
     const trees=Math.ceil(totalCO2 / 21);
    const jetFuel=Math.round(totalCO2 / 2.5);
    const flightHours=Number((totalCO2 / 90).toFixed(1));
    const flightKm=totalCO2 / 0.09;
    const earthTrips=Number((flightKm / 40075).toFixed(2));
    const result={totalCO2:Number(totalCO2.toFixed(2)),ecoScore:Number(ecoScore.toFixed(0)),impact:{
        trees,
        jetFuel,
        flightHours,
        earthTrips,
      }};
    await redisClient.set(cacheKey,JSON.stringify(result),{EX:3600});
    return res.json({source:"database",data:result});

  } catch(error:any){
    return res.status(500).json({message:error.message});
   }
};

//getTodayCo2----------------------------------------------
export const getTodayCO2=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
      const today=new Date();
      today.setHours(0,0,0,0);
      const flights=await FlightcarbonModel.find(
          {
            userId,
            createdAt:{
              $gte:today,
            },
          }
        ).lean();

      const todayCO2=flights.reduce((sum:number,item:any)=>sum +(item.totalCarbon ||0),0);
      return res.json({data:{todayCO2:Number(todayCO2.toFixed(2))}});

    } catch(error:any){
      return res.status(500).json({message:error.message});
    }
  };

//getFlightHistory----------------------------------------------
export const getFlightHistory=async(req:Request,res:Response)=>{
  try{
    const userId=(req as any).user._id;
    const flights=await FlightcarbonModel.find({ userId }).sort({ createdAt:-1 }).lean();
    const count=flights?flights.length:0;
    return res.json({success:true,count,data:flights});

  } catch(error:any){
    return res.status(500).json({message:error.message});
  }
};

//getMonthlyChart----------------------------------------------
export const getMonthlyChart=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
      const data=await FlightcarbonModel.aggregate([
            {
              $match:{
                  userId
                }
            },
            {
              $group:{
                  _id:{
                      month:{
                          $month:"$createdAt",
                        },
                    },
                  total:{
                      $sum:
                        "$totalCarbon",
                    }
                }
            },
            {
              $sort:{
                  "_id.month":1,
                },
            },
        ]);

      return res.json({data});

    } catch(error: any){
      return res.status(500).json({message:error.message,});
    }
  };

//getDailyChart----------------------------------------------
export const getWeeklyChart=async(req:any,res:any)=>{
  try{
    const userId=req.user._id;
    const rawData:WeeklyRecord[]=await FlightcarbonModel.aggregate([
      {
        $match:{ userId }
      },
      {
        $group:{
          _id:{
            day:{ $dayOfWeek:"$createdAt"}
          },
          total:{ $sum:"$totalCarbon" }
        }
      }
    ]);
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const result=days.map((day,index)=>{
     const found=rawData.find((item)=>item._id?.day===index + 1);
     return {day,total: found ? Math.round(found.total):0}
    });
    return res.json({ data:result});
  } catch(error:any){
    return res.status(500).json({message:error.message});
  }
};