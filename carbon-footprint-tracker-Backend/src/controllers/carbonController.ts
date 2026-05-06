import { Request, Response } from "express"
import mongoose from "mongoose";
import Carbon from "../models/carbon.model"
import { getmapData } from "../services/map.service"
import { getWeatherInfo } from "../services/weather.service"
import { predictCarbon } from "../services/ml.service"
import { calculateGreenMetrics } from "../services/carbonService"
import { WeeklyRecord } from "../types/carbonType"
import { getRedisClient } from "../config/redis"

//fuel mapping------------------------------------------
const fuelMap:Record<string,number>={
 petrol:0,
 diesel:1,
 electric:2,
 cng:3
}
//road mapping------------------------------------------
const roadMap:Record<string,number>={
 city:0,
 highway:1
}
//ROUTE CARBON CALCULATION------------------------------
const calculateRouteCarbon=async(start:string,end:string,mileage:number,fuel_type:string,vehicle_age:number,engine_cc:number,passengers:number)=>{
  const [mapData, temperature]=await Promise.all([getmapData(start,end),getWeatherInfo(start).catch(()=>25)]);
  if(!mapData|| !mapData.routes || mapData.routes.length===0){
    throw new Error("Map data not available");
  }
  const routes=mapData.routes.slice(0,3);
  const results=await Promise.all(routes.map(async(route:any)=>{
      const distance=route.distance;
      const speed=route.speed;
      const elevation=route.elevation ?? 0;
      let traffic_level=1;
      if(route.traffic_level==="Medium") 
        traffic_level=2;
      if(route.traffic_level==="High") 
        traffic_level=3;
      const Data={
        distance,
        mileage,
        fuel_type: fuelMap[fuel_type] ?? 0,
        speed,
        traffic_level,
        temperature,
        road_type: roadMap[route.road_type] ?? 0,
        vehicle_age,
        vehicle_load: passengers,
        elevation_gain: elevation,
        engine_cc
      };
      const mlResult=await predictCarbon(Data);
      return {...route,carbon:mlResult?.carbon_emission ?? 0};
    })
  );
  const bestRoute=results.reduce((a,b)=>a.carbon<b.carbon?a:b);
  const fastestRoute=results.reduce((a,b)=>a.duration<b.duration?a:b);
  const metrics=calculateGreenMetrics(bestRoute.carbon);
  return {routes:results,bestRoute,fastestRoute,temperature,metrics,start:mapData.start,end:mapData.end};
};
//CREATE----------------------------------------------
   export const createCarbon=async(req:Request,res:Response)=>{
  try {
    const {start,end,mileage,fuel_type,vehicle_age,engine_cc,passengers,vehicle_name}=req.body;
    if(!start){
      return res.status(400).json({ message: "Start location required" });
    }
    if(!end){
      return res.status(400).json({ message: "End location required" });
    }
    const result=await calculateRouteCarbon(start,end,mileage,fuel_type,vehicle_age,engine_cc,passengers);
    const best=result.bestRoute;
    const carbon=await Carbon.create({
      userId:(req as any).user?._id ?? null,
      vehicle_name,
      fuel_type,
      mileage,
      startLocation:start,
      endLocation:end,
      distance:best.distance,         
      duration:best.duration,         
      passengers,
      carbonEmission:result.metrics.carbonEmission,
      greenScore:result.metrics.greenScore,
      isEcoFriendly:result.metrics.isEcoFriendly
    });
    const redisClient=getRedisClient();
    await redisClient.del(`carbonTotal:v2:${(req as any).user._id}`);
    res.status(201).json({
      routes:result.routes,                 
      bestRoute:result.bestRoute,           
      fastestRoute:result.fastestRoute,     
      start:result.start,  
      end:result.end,       
      vehicle:{
        vehicle_name,
        mileage,
        fuel_type,
        vehicle_age,
        engine_cc,
        passengers
      },
      environment:{
        temperature:result.temperature
      },
      carbon:result.metrics,
      saved:carbon
    });
   } catch(error:unknown){
    console.error(error);
    res.status(500).json({ message: "Carbon calculation failed" });
   }
};
//GET ALL----------------------------------------------
  export const getAllCarbons=async(req:Request,res:Response)=>{
    try{
      const carbons=await Carbon.find({userId:(req as any).user._id}).populate("userId","name").sort({createdAt:-1}).lean()
     if(!carbons || carbons.length===0){
      return res.status(404).json({success:false,message:"No carbon records found",data:[]})
    }
     res.status(200).json({success:true,count:carbons.length,data:carbons})
   }catch(error:unknown){
     console.error(error)
     res.status(500).json({success:false,message:"Failed to fetch carbon records"})
    }
 }

//GET SINGLE----------------------------------------------
  export const getCarbonById=async(req:Request,res:Response)=>{
   try{
     const carbon=await Carbon.findById(req.params.id).lean()
     if(!carbon){
       return res.status(404).json({message:"Record not found"})
     }
    res.json({data:carbon})
  }catch(error:any){
    res.status(500).json({message:error.message})
   }
 }

//UPDATE----------------------------------------------
  export const updateCarbon=async(req:Request,res:Response)=>{
   try{
     const carbon=await Carbon.findById(req.params.id)
     if(!carbon){
      return res.status(404).json({ message:"Record not found"})
    }
     const{start,end,vehicle_name,passengers}=req.body
    if(start) 
     carbon.startLocation=start
    if(end) 
     carbon.endLocation=end
    if(vehicle_name)
     carbon.vehicle_name=vehicle_name
    if(passengers) 
     carbon.passengers=passengers
    await carbon.save()
    const redisClient=getRedisClient();
    await redisClient.del(`carbonTotal:v2:${(req as any).user._id}`);
    res.json({message:"Carbon record updated",data:carbon})
   }catch(error:any){
     res.status(500).json({message:error.message})
    }
 }

//DELETE----------------------------------------------
 export const deleteCarbon=async(req:Request,res:Response)=>{
   try{
    const carbon=await Carbon.findByIdAndDelete(req.params.id)
    if(!carbon){
     return res.status(404).json({message:"Record not found"})
   }
   const redisClient=getRedisClient();
   await redisClient.del(`carbonTotal:v2:${(req as any).user._id}`);
   res.json({message:"Carbon record deleted"})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
 }


//getTotalCo2----------------------------------------------
export const getcarbonTotalCO2=async(req:Request,res:Response)=>{
  try{
    const userId=(req as any).user._id;
    const redisClient=getRedisClient()
    const cacheKey=`carbonTotal:v2:${userId}`;
    const cached=await redisClient.get(cacheKey);
    if(cached){
         return res.json({source:"cache",data:JSON.parse(cached)});
    }
    const carbon=await Carbon.find({ userId }).lean();
    const totalCO2=carbon.reduce((sum:number,item:any)=>sum+(Number(item.carbonEmission) || 0),0);
    const MAX_CO2=50000;
    const ecoScore=totalCO2===0 ?100:Math.max(0,Math.min(100,100-(totalCO2/MAX_CO2)*100));
     const trees=Math.ceil(totalCO2/21);
    const vehicleDuration=carbon.reduce((sum:number,item:any)=>sum+(Number(item.duration) || 0),0);
     const vehiclekm=carbon.reduce((sum:number,item:any)=>sum+(Number(item.distance) || 0),0);
    const earthTrips=Number((vehiclekm/ 40075).toFixed(2));
    const result={totalCO2:Number(totalCO2.toFixed(2)),ecoScore:Number(ecoScore.toFixed(0)),
      impact:{
        trees,
        vehicleDuration,
        earthTrips,
      }};
    await redisClient.set(cacheKey,JSON.stringify(result),{EX:3600});
    return res.json({source:"database",data:result});
  } catch(error:any){
    return res.status(500).json({message:error.message});
   }
};

//getTodayCo2----------------------------------------------
export const getcarbonTodayCO2=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
      const today=new Date();
      today.setUTCHours(0,0,0,0);
      const carbon=await Carbon.find(
          {
            userId:userId,
            createdAt:{
              $gte:today,
            },
          }
        ).lean();

      const todayCO2=carbon.reduce((sum:number,item:any)=>sum +(Number(item.carbonEmission) || 0),0);
      return res.json({data:{todayCO2:Number(todayCO2.toFixed(2))}});
    } catch(error:any){
      return res.status(500).json({message:error.message});
    }
  };

//getFighterJetHistory ----------------------------------------------
export const getcarbonHistory=async(req:Request,res:Response)=>{
  try {
    const userId=(req as any).user._id;
    const limit=Math.max(1,parseInt(req.query.limit as string) || 20);
    const page=Math.max(1,parseInt(req.query.page as string) || 1);
    const skip=(page-1)*limit;

    const [carbon,total]=await Promise.all([
      Carbon
        .find({ userId })
        .select(
          `
            vehicle_name
            fuel_type
            carbonEmission
            distance
            duration
            mileage
            startLocation
            endLocation
            createdAt
          `
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Carbon.countDocuments({ userId }),
    ]);
     return res.json({success:true,count:carbon.length,total,page,limit,data:carbon});
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message});
  }
};

//getMonthlyChart----------------------------------------------
export const getcarbonMonthlyChart=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
       const start=new Date(new Date().getFullYear(), 0, 1);
      const data=await Carbon.aggregate([
            {
              $match:{
                  userId:new mongoose.Types.ObjectId(userId),
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
                      $sum:"$carbonEmission"
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
export const getcarbonWeeklyChart=async(req:Request,res:Response)=>{
  try{
    const userId=(req as any).user._id;
    const last7Days=new Date();
    last7Days.setDate(last7Days.getDate()-7);
    const rawData:WeeklyRecord[]=await Carbon.aggregate([
      {
        $match:{ 
         userId:new mongoose.Types.ObjectId(userId),
          createdAt:{ $gte:last7Days }
         }
      },
      {
        $group:{
          _id:{
            day:{ $dayOfWeek:"$createdAt"}
          },
          total:{
             $sum:"$carbonEmission"
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

//getEmissionBreakdown ----------------------------------------------
export const getcarbonEmissionBreakdown=async(req:Request,res:Response)=>{
  try {
    const userId=(req as any).user._id;
    const carbon=await Carbon.find({ userId }).lean();
    const totalCO2=carbon.reduce((sum:number,item:any)=>sum+(Number(item.carbonEmission) || 0),0);
    const fuelConsumption=totalCO2 * 0.55;
    const trafficIdle=totalCO2 * 0.30;
    const engineEfficiency=totalCO2 * 0.15;
    const result={totalCO2:Number(totalCO2.toFixed(2)),
      breakdown:[
        {
          name:"Fuel Consumption",
          value:Number(fuelConsumption.toFixed(2)),
        },
        {
          name:"Traffic & Idle",
          value:Number(trafficIdle.toFixed(2)),
        },
        {
          name:"Engine Efficiency",
          value:Number(engineEfficiency.toFixed(2)),
        },
      ],
    };
    return res.json({success:true,data:result,});
  } catch(error:any){
    console.log("Emission breakdown error:",error);
    return res.status(500).json({success:false,message:error.message || "Server error",});
  }
};
export const getcarbonMonthlyReport=async(req:Request,res:Response)=>{
  try {
    const userId=(req as any).user._id;
    const currentYear=new Date().getFullYear();
    const data=await Carbon.aggregate([
      {
        $match:{
         userId:new mongoose.Types.ObjectId(userId),
          createdAt:{
            $gte:new Date(currentYear,0,1), 
           $lte:new Date(currentYear,11,31,23,59,59)
          }
        }
      },
      {
        $group:{
          _id:{
            month:{ $month:"$createdAt"}
          },
          totalCO2:{
            $sum:"$carbonEmission"
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
      return {month,totalCO2:found ? Number(found.totalCO2.toFixed(2)):0};
    });
    return res.json({data:finalData});
  } catch(error:any){
    return res.status(500).json({message:error.message});
  }
};

//getsmartemission----------------------------------------------
export const getcarbonSmartEmission=async(req:any,res:any)=>{
  try {
    const userId=(req as any).user._id;
    const userName=req.user.name;
    const totalAgg=await Carbon.aggregate([
      { $match:{ 
             userId:new mongoose.Types.ObjectId(userId),
         }
      },
      {
        $group:{
          _id:null,
          total:{ 
            $sum:"$carbonEmission"
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
    const currentAgg=await Carbon.aggregate([
      {
        $match:{
          userId:new mongoose.Types.ObjectId(userId),
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
            $sum:"$carbonEmission" 
          }
        }
      }
    ]);
    const prevAgg=await Carbon.aggregate([
      {
        $match:{
         userId:new mongoose.Types.ObjectId(userId),
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
            $sum:"$carbonEmission"
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
    const trees=Math.round(totalCO2/21);
    let insight="Your vehicle emissions are stable. Keep driving efficiently.";
    if(trendDirection === "up"){
     insight="Vehicle emissions increased this week due to higher travel activity.";
    } else if(trendDirection === "down") {
      insight="Great work! Your vehicle emissions decreased this week.";
    }
    return res.json({success:true,data:{name:userName,totalCO2,trend:Math.abs(trend),trendDirection,trees,insight}});

  } catch(error:any){
    console.log("Smart emission error:",error);
    return res.status(500).json({success:false,message:error.message || "Server error"});
  }
};
