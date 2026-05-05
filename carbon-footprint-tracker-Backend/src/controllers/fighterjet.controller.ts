import { Request, Response } from "express";
import FighterCarbon from "../models/fighterjet.model"
import { calculateFighterCarbon } from "../services/flighjetcarbon.service";
import { getRedisClient } from "../config/redis";
import fighterjetModel from "../models/fighterjet.model";
import { generateCarbonAdvice } from "../services/ai.service";
import { WeeklyRecord } from "../types/carbonType";

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
     const cacheKey=`fighter:${userId}:${hours}:${payload}:${speed}:${altitude}:${jetModel}:${mission}`;

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
    const hoursNum=Number(hours);
    const speedNum=Number(speed);
    const distance=Number((speedNum * hoursNum).toFixed(2));
    let aiAdvice:any[]=[];
    try {
       aiAdvice=await generateCarbonAdvice("fighter",{
        jetModel,
        mission,
        hours,
        speed,
        altitude,
        payload,
        carbon:result.carbon,
        ecoScore:result.ecoScore,
       });
    } catch(error){
         console.log("AI failed",error);
    }
    const data=await FighterCarbon.create({
      userId,
      jetModel,
      mission,
      hours,
      payload,
      speed,
      altitude,
      distance,
      totalCO2:result.carbon,
      ecoScore:result.ecoScore,
      label:result.label,
    });
    const finalResponse={
      ...data.toObject(),
      aiAdvice,
    };
    await redisClient.set(cacheKey,JSON.stringify(finalResponse),{EX:3600})
    return res.status(200).json({success:true,message:"carbon calculate successfully",data:finalResponse});

  } catch(error){
    return res.status(500).json({success:false,message:"Server Error",error});
  }
};


//getTotalCo2----------------------------------------------
export const getfighterjetTotalCO2=async(req:Request,res:Response)=>{
  try{
    const userId=(req as any).user._id;
    const redisClient=getRedisClient()
    const cacheKey=`fighterTotal:v2:${userId}`;
    const cached=await redisClient.get(cacheKey);
    if(cached){
         return res.json({source:"cache",data:JSON.parse(cached)});
    }
    const fighterJets=await fighterjetModel.find({ userId }).lean();

    const totalCO2=fighterJets.reduce((sum:number,item:any)=>sum+(Number(item.totalCO2) || 0),0);
    const MAX_CO2=300000;
    const ecoScore=Math.max(0,Math.min(100, 100 - (totalCO2 / MAX_CO2) * 100));
     const trees=Math.ceil(totalCO2 / 21);
    const jetFuel=Math.round(totalCO2 / 2.5);
    const fighterHours = fighterJets.reduce(
  (sum:number,item:any)=>sum+(Number(item.hours) || 0),
  0
);
    const flightKm=totalCO2 / 0.09;
    const earthTrips=Number((flightKm / 40075).toFixed(2));
    const result={totalCO2:Number(totalCO2.toFixed(2)),ecoScore:Number(ecoScore.toFixed(0)),impact:{
  trees,
  jetFuel,
  fighterHours,
  earthTrips,
}};
    await redisClient.set(cacheKey,JSON.stringify(result),{EX:3600});
    return res.json({source:"database",data:result});

  } catch(error:any){
    return res.status(500).json({message:error.message});
   }
};

//getTodayCo2----------------------------------------------
export const getfighterjetTodayCO2=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
      const today=new Date();
      today.setUTCHours(0,0,0,0);
      const flights=await fighterjetModel.find(
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

//getFighterJetHistory ----------------------------------------------
export const getfighterjetHistory=async(req:Request,res:Response)=>{
  try {
    const userId=(req as any).user._id;
    const limit=Math.max(1,parseInt(req.query.limit as string) || 20);
    const page=Math.max(1,parseInt(req.query.page as string) || 1);
    const skip=(page-1)*limit;

    const [fighterJets,total]=await Promise.all([
      fighterjetModel
        .find({ userId })
        .select("jetModel mission totalCO2 createdAt") 
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      fighterjetModel.countDocuments({ userId }),
    ]);
     return res.json({success:true,count:fighterJets.length,total,page,limit,data:fighterJets});
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message});
  }
};
//getMonthlyChart----------------------------------------------
export const getfighterjetMonthlyChart=async(req:Request,res:Response)=>{
    try{
      const userId=(req as any).user._id;
       const start=new Date(new Date().getFullYear(), 0, 1);
      const data=await fighterjetModel.aggregate([
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
export const getfighterjetWeeklyChart=async(req:any,res:any)=>{
  try{
    const userId=(req as any).user._id;
    const last7Days=new Date();
    last7Days.setDate(last7Days.getDate()-7);
    const rawData:WeeklyRecord[]=await fighterjetModel.aggregate([
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
export const getfighterjetEmissionBreakdown=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
    const flights=await fighterjetModel.find({ userId }).lean();
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

export const getfighterjetMonthlyReport=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
    const currentYear=new Date().getFullYear();
    const data=await fighterjetModel.aggregate([
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
export const getfighterjetSmartEmission=async(req:any,res:any)=>{
  try {
    const userId=req.user._id;
     const userName=req.user.name;
    const totalAgg=await fighterjetModel.aggregate([
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
    const currentAgg=await fighterjetModel.aggregate([
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
    const prevAgg=await fighterjetModel.aggregate([
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