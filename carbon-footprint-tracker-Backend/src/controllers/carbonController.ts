import { Request, Response } from "express"
import Carbon from "../models/carbon.model"
import { getmapData } from "../services/map.service"
import { getWeatherInfo } from "../services/weather.service"
import { predictCarbon } from "../services/ml.service"
import { calculateGreenMetrics } from "../services/carbonService"

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
   export const createCarbon = async (req: Request, res: Response) => {
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
   console.log(carbon)
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
   res.json({message:"Carbon record deleted"})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
 }


