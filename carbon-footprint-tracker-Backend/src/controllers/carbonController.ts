import { Request, Response } from "express";
import Route from "../models/Route";
import {calculateCarbonEmission,} from "../utils/carbonFormula";
import {calculateGreenScore,isEcoFriendly,} from "../utils/greenScore";


//Create Route-------------------------------------------

export const createRoute=async(req:Request,res:Response)=>{
  try{
    const {userId,startLocation,endLocation,distance,duration,transportType,}=req.body;

    const carbon=calculateCarbonEmission(transportType,distance);
    const greenScore = calculateGreenScore(carbon);

    const route=await Route.create({userId,startLocation,endLocation,distance,duration,transportType,carbonEmission: carbon,greenScore,isEcoFriendly: isEcoFriendly(greenScore),});

    return res.status(201).json({success:true,message:"Route created successfully",data:route,});
   } catch(error:any){
    return res.status(500).json({success:false,message:error.message,});
   }
};

//Get AllRoutes------------------------------------------- 

export const getAllRoutes=async(req:Request,res:Response)=>{
  try{
    const{page=1,limit=10,transportType}=req.query;
    const query:any={};
    if(transportType){
      query.transportType=transportType;
    }

    const routes=await Route.find(query)
      .skip((Number(page)-1)*Number(limit))
      .limit(Number(limit))
      .sort({createdAt:-1 });

    const total=await Route.countDocuments(query);

    return res.status(200).json({success:true,total,page:Number(page),pages: Math.ceil(total / Number(limit)),data: routes,});
  } catch (error:any){
    return res.status(500).json({success:false,message:error.message,});
   }
};


//Get SingleRoute-------------------------------------------
export const getRouteById=async(req:Request,res:Response)=>{
  try{
    const route=await Route.findById(req.params.id);
    if(!route){
      return res.status(404).json({success:false,message:"Route not found",});
    }

    return res.status(200).json({success:true,data:route,});
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message,});
  }
};


// Update Route-------------------------------------------

export const updateRoute=async(req:Request,res:Response)=>{
  try{
    const route=await Route.findById(req.params.id);
    if(!route){
      return res.status(404).json({success:false,message:"Route not found",});
    }

    const {distance,transportType,startLocation,endLocation,duration,}=req.body;

    if(distance && transportType){
      const carbon=calculateCarbonEmission(transportType,distance);
      const greenScore=calculateGreenScore(carbon);

      route.carbonEmission=carbon;
      route.greenScore=greenScore;
      route.isEcoFriendly=isEcoFriendly(greenScore);
    }

    route.startLocation=startLocation??route.startLocation;
    route.endLocation=endLocation??route.endLocation;
    route.distance=distance??route.distance;
    route.duration=duration??route.duration;
    route.transportType=transportType??route.transportType;
    await route.save();
    return res.status(200).json({success:true,message:"Route updated successfully",data:route,});
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message,});
  }
};

//Delete Route-------------------------------------

export const deleteRoute=async(req:Request,res:Response)=>{
  try{
    const route=await Route.findByIdAndDelete(req.params.id);
    if(!route){
      return res.status(404).json({success:false,message:"Route not found",});
    }

    return res.status(200).json({success:true,message:"Route deleted successfully",});
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message,});
  }
};

//getUserAnalytic----------------------------------
export const getUserAnalytic=async(req:Request,res:Response)=>{
  try{
    const {userId}=req.params;
    if(!userId){
      return res.status(400).json({success:false,message:"User ID is required",});
    }
    const analytics=await Route.aggregate([{$match:{userId}},{$group:{_id: null,totalRoutes: {$sum:1},totalEmission:{$sum:"$carbonEmission"},averageGreenScore:{$avg:"$greenScore"},},},]);

    if(analytics.length===0){
      return res.status(200).json({success:true,totalRoutes:0,totalEmission:0,averageGreenScore:0,});
    }
    const data=analytics[0];
    return res.status(200).json({success:true,totalRoutes:data.totalRoutes,
      totalEmission:Number(data.totalEmission.toFixed(2)),
      averageGreenScore: Number(data.averageGreenScore.toFixed(2)),
    });
  } catch(error:any){
    return res.status(500).json({success:false,message:error.message,});
  }
};