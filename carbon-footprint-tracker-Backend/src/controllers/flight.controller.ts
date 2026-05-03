import {Request,Response} from "express";
import { getCoordinates } from "../services/coordinates.services";
import { getDistance } from "../services/haversine.service";
import { calculateCarbon } from "../services/flightcarbon.service";
import { FlightcarbonModel } from "../models/flightcarbon.model";
import { getRedisClient } from "../config/redis";
import { generateCarbonAdvice } from "../services/ai.service";
import { WeeklyRecord } from "../types/carbonType";

//FlightCarbon----------------------------------------------
export const FlightCarbon=async(req:Request,res:Response)=>{
    try{
        const userId = (req as any).user?._id;
        if(!userId){
          return res.status(401).json({ message: "Unauthorized user" });
          }
        const {from,to,passengers,seatClass}=req.body
        if(!from || !to ||  typeof passengers !== "number" || passengers<=0 ||!seatClass){
            return res.status(400).json({message:"please fill all fields"});
        }
       const redisClient=getRedisClient()
       const cacheKey=`flight:${userId}:${from.toLowerCase()}-${to.toLowerCase()}-${passengers}-${seatClass}`;
       const cached=await redisClient.get(cacheKey);
       if(cached) {
         console.log("Cache HIT");
         return res.status(200).json({success:true,data:JSON.parse(cached)});
       }
       console.log("Cache MISS");
       const [fromCoord,toCoord]=await Promise.all([getCoordinates(from),getCoordinates(to)]);
       if(!fromCoord || !toCoord){
       return res.status(400).json({message:"Invalid location"});
       }
       const distance=getDistance(fromCoord.lat,fromCoord.lon,toCoord.lat,toCoord.lon );
       const flightcarbon=calculateCarbon(distance,passengers,seatClass);
       let advice:string[]=[];
       try {
        advice=await generateCarbonAdvice("flight",{
         ...flightcarbon,
         from,
         to,
         passengers,
         flightClass: seatClass,
        });
          } catch(err){
           console.log("AI FAILED:",err);
          advice=[];
        }
        if(!advice || advice.length === 0){
           advice=[
              `Optimize passengers (${passengers})`,
              `Choose better seat class (${seatClass})`,
              `Optimize route ${from} → ${to}`
             ];
           }
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
             userId:userId
         })
         await redisClient.del(`totalCO2:${userId}`);
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
    const totalCO2=flights.reduce((sum:number,item:any)=>sum+(Number(item.totalCO2) || 0),0);
    const MAX_CO2=50000;
    const ecoScore=Math.max(0,Math.min(100, 100 - (totalCO2 / MAX_CO2) * 100));
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
      today.setUTCHours(0,0,0,0);
      const flights=await FlightcarbonModel.find(
          {
            userId:userId,
            createdAt:{
              $gte:today,
            },
          }
        ).lean();

      const todayCO2=flights.reduce((sum:number,item:any)=>sum +(Number(item.totalCO2) || 0),0);
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
       const start=new Date(new Date().getFullYear(), 0, 1);
      const data=await FlightcarbonModel.aggregate([
            {
              $match:{
                  userId,
                  createdAt:{ $gte:start }
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
                        "$totalCO2",
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
    const userId=(req as any).user._id;
    const last7Days=new Date();
    last7Days.setDate(last7Days.getDate()-7);
    const rawData:WeeklyRecord[]=await FlightcarbonModel.aggregate([
      {
        $match:{ 
          userId,
          createdAt:{ $gte:last7Days }
         }
      },
      {
        $group:{
          _id:{
            day:{ $dayOfWeek:"$createdAt"}
          },
          total:{
             $sum:"$totalCO2" 
            }
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

//getemissionbreakdown----------------------------------------------
export const getEmissionBreakdown=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
    const flights=await FlightcarbonModel.find({ userId }).lean();
    const totalCO2=flights.reduce((sum:number,item:any)=>sum+(Number(item.totalCO2) || 0),0);
    const result={
      totalCO2:Number(totalCO2.toFixed(2)),
      breakdown:[
        { name:"Fuel",value:totalCO2*0.6 },
        { name:"Operations",value:totalCO2*0.25 },
        { name:"Other",value:totalCO2*0.15 },
      ],
    };
    return res.json({ data:result });
  } catch(error:any){
    return res.status(500).json({ message:error.message });
  }
};

export const getMonthlyReport=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
    const currentYear=new Date().getFullYear();
    const data=await FlightcarbonModel.aggregate([
      {
        $match:{
          userId,
          createdAt:{
            $gte:new Date(currentYear,0,1), 
            $lte:new Date(currentYear,11,31)
          }
        }
      },
      {
        $group:{
          _id:{
            month:{ $month:"$createdAt"}
          },
          totalCO2:{
            $sum:"$totalCO2"
          }
        }
      },
      {
        $sort:{
          "_id.month":1
        }
      }
    ]);

    const months=[
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const finalData=months.map((month,index)=>{
      const found=data.find((item:any)=>item._id.month === index + 1);
      return {month,totalCO2:found ? Math.round(found.totalCO2):0};
    });
    return res.json({data:finalData});
  } catch(error:any){
    return res.status(500).json({message:error.message});
  }
};


//getsmartemission----------------------------------------------
export const getSmartEmission=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
     const userName=req.user.name;
    const totalAgg=await FlightcarbonModel.aggregate([
      { $match:{ 
            userId 
         }
      },
      {
        $group:{
          _id:null,
          total:{ 
            $sum: 
            "$totalCO2"
           }
        }
      }
    ]);
    const totalCO2=Math.round(totalAgg?.[0]?.total || 0);
    const now=new Date();
    const lastWeek=new Date(now);
    lastWeek.setDate(now.getDate()-7);
    const prevWeek=new Date(now);
    prevWeek.setDate(now.getDate()-14);
    const currentAgg=await FlightcarbonModel.aggregate([
      {
        $match:{
          userId,
          createdAt:{ 
            $gte:lastWeek,
             $lte:now 
           }
        }
      },
      {
        $group:{
          _id:null,
          total:{ 
            $sum:"$totalCO2" 
          }
        }
      }
    ]);
    const prevAgg=await FlightcarbonModel.aggregate([
      {
        $match:{
          userId,
          createdAt:{ 
            $gte:prevWeek, 
            $lt:lastWeek 
          }
        }
      },
      {
        $group:{
          _id:null,
          total:{ 
            $sum:"$totalCO2"
           }
        }
      }
    ]);

    const currentWeek=currentAgg?.[0]?.total || 0;
    const previousWeek=prevAgg?.[0]?.total || 0;
    let trend=0;
    let trendDirection="stable";
    if(previousWeek>0){
      trend=((currentWeek-previousWeek)/previousWeek)*100;
    }
    trend=Math.round(trend);
    if(trend>5) 
      trendDirection="up";
    else if(trend<-5) 
      trendDirection="down";
    const trees=Math.round(totalCO2/25);
    let insight="Stable emissions. Keep maintaining 🌱";
    if(trendDirection === "up"){
      insight="Emissions increased due to more or longer flights ✈️";
    } else if(trendDirection === "down") {
      insight="Great! You reduced your emissions this week 🎉";
    }
    return res.json({success:true,data:{name:userName,totalCO2,trend:Math.abs(trend),trendDirection,trees,insight}});

  } catch(error:any){
    console.log("Smart emission error:",error);
    return res.status(500).json({success:false,message:error.message || "Server error"});
  }
};