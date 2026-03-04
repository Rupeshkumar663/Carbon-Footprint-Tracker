import { Request, Response } from "express";
import Carbon from "../models/carbon.model";
import { getMLPrediction } from "../services/ml.service";
import Vehicle from "../models/vehicle.model";
//CREATE CARBON---------------------------------
export const createCarbon=async(req:Request,res:Response)=>{
  try {
    const {vehicleId,distance,startLocation,endLocation,duration}=req.body;
    if(!vehicleId){
      return res.status(400).json("Vehicle is required");
    }

    if(!Number.isFinite(distance) || distance<=0){
      return res.status(400).json("Valid distance is required");
    }

    if (!startLocation) {
      return res.status(400).json("Start location required");
    }
    if(!endLocation) {
      return res.status(400).json("End location required");
    }

   const vehicle=await Vehicle.findById(vehicleId);
if(!vehicle){
  return res.status(404).json("Vehicle not found");
}

 const mlResult=await getMLPrediction(distance,vehicle.category);
const metrics={carbonEmission:mlResult.carbonEmission,greenScore:Math.max(0,100-mlResult.carbonEmission*2),isEcoFriendly:mlResult.carbonEmission<2};

    const carbon=await Carbon.create({
      userId:(req as any).user?._id,
      vehicle:vehicleId,
      startLocation,
      endLocation,
      distance,
      duration,
      ...metrics,
    });
    return res.status(201).json({success:true,data:carbon});

  } catch(error:any){
    return res.status(500).json(`carbon creation failed ${error}`);
  }
};


// GET ALL CARBON RECORDS------------------------------------

export const getAllCarbons=async(req:Request,res:Response)=>{
  try {
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10;
    const query:any={};
    if((req as any).user?._id){
      query.userId=(req as any).user.id;
    }
    const carbons=await Carbon.find(query)
      .populate("vehicle")
      .sort({createdAt:-1})
      .skip((page-1)*limit)
      .limit(limit);

    const total=await Carbon.countDocuments(query);
    return res.status(200).json({total,page,pages:Math.ceil(total/limit),data:carbons});

  } catch(error:any){
    return res.status(500).json({message: error.message,});
  }
};


//GET SINGLE CARBON------------------------------------------

export const getCarbonById=async(req:Request,res:Response)=>{
  try {
    const carbon=await Carbon.findById(req.params.id).populate("vehicle");
    if(!carbon){
      return res.status(404).json("Record not found");
    }
    return res.status(200).json({data:carbon});
  } catch (error:any){
    return res.status(500).json({message:error.message});
  }
};

// UPDATE CARBON-----------------------------------------
export const updateCarbon=async (req: Request, res: Response) => {
  try {
    const carbon=await Carbon.findById(req.params.id);
    if(!carbon){
      return res.status(404).json({ message: "Record not found" });
    }

    const {vehicleId,distance,startLocation,endLocation,duration}=req.body;
    const updatedVehicleId=vehicleId ?? carbon.vehicle.toString();
    const updatedDistance=distance ?? carbon.distance;

    if(vehicleId !== undefined || distance !== undefined){
     const vehicle=await Vehicle.findById(updatedVehicleId);
   if(!vehicle){
      return res.status(404).json("Vehicle not found");
   }
   const mlResult=await getMLPrediction(updatedDistance,vehicle?.category);
  const metrics={carbonEmission:mlResult.carbonEmission,greenScore:Math.max(0,100-mlResult.carbonEmission*2),isEcoFriendly:mlResult.carbonEmission<2};

      carbon.carbonEmission=metrics.carbonEmission;
      carbon.greenScore=metrics.greenScore;
      carbon.isEcoFriendly=metrics.isEcoFriendly;
    }

    carbon.vehicle=updatedVehicleId;
    carbon.distance=updatedDistance;
    carbon.startLocation=startLocation ?? carbon.startLocation;
    carbon.endLocation=endLocation ?? carbon.endLocation;
    carbon.duration=duration ?? carbon.duration;
    await carbon.save();
    return res.status(200).json({message:"Carbon record updated successfully",data:carbon});
  } catch(error:any){
    return res.status(500).json({message:error.message});
  }
};
// DELETE CARBON------------------------------------------
export const deleteCarbon=async(req:Request,res:Response)=>{
  try{
    const carbon=await Carbon.findByIdAndDelete(req.params.id);
    if(!carbon){
      return res.status(404).json("Record not found");
    }
    return res.status(200).json("Carbon record deleted successfully");
  } catch (error:any){
    return res.status(500).json({message: error.message,});
  }
};