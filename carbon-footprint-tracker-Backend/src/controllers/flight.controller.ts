import {Request,Response} from "express";
import { getCoordinates } from "../services/coordinates.services";
import { getDistance } from "../services/haversine.service";
import { calculateCarbon } from "../services/flightcarbon.service";
import { FlightcarbonModel } from "../models/flightcarbon.model";
import { getRedisClient } from "../config/redis";
import { getEcoAdvice } from "../services/ai.service";

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