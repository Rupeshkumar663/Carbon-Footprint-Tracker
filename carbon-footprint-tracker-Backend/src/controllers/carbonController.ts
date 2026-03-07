import { Request, Response } from "express";
import Carbon from "../models/carbon.model";
import { getmapData } from "../services/map.service";
import { getWeatherInfo } from "../services/weather.service";
import { predictCarbon } from "../services/ml.service";
import { calculateGreenMetrics } from "../services/carbonService";


// Helper function
const calculateRouteCarbon = async (
 start: string,
 end: string,
 mileage: number,
 fuel_type: string,
 vehicle_age: number,
 engine_cc: number,
 passengers: number
) => {

 const mapData: any = await getmapData(start, end);

 const distance = parseFloat(
  (mapData?.distance ?? "0").toString().replace(/[^\d.]/g, "")
 );

 const speed = parseFloat(
  (mapData?.speed ?? "0").toString().replace(/[^\d.]/g, "")
 );

 const elevation = parseFloat(
  (mapData?.elevation ?? "0").toString().replace(/[^\d.]/g, "")
 );

 let traffic_level = 1;

 if (mapData?.traffic_level === "Medium") traffic_level = 2;
 if (mapData?.traffic_level === "High") traffic_level = 3;

 const temperature = await getWeatherInfo(start);

 const mlResult = await predictCarbon({
  distance,
  mileage,
  fuel_type,
  speed,
  traffic_level,
  temperature,
  road_type: mapData?.road_type ?? "city",
  vehicle_age,
  vehicle_load: passengers,
  elevation_gain: elevation,
  engine_cc
 });

 const metrics = calculateGreenMetrics(
  mlResult?.carbonEmission ?? 0
 );

 return {
  mapData,
  distance,
  temperature,
  metrics
 };

};



// CREATE CARBON
export const createCarbon = async (req: Request, res: Response) => {

 try {

  const {
   start,
   end,
   mileage,
   fuel_type,
   vehicle_age,
   engine_cc,
   passengers,
   vehicle_name
  } = req.body;

  if (!start || !end) {
   return res.status(400).json({
    message: "Start and End location required"
   });
  }

  const result = await calculateRouteCarbon(
   start,
   end,
   mileage,
   fuel_type,
   vehicle_age,
   engine_cc,
   passengers
  );

  const carbon = await Carbon.create({

   userId:(req as any).user?._id,
   vehicle_name,
   startLocation:start,
   endLocation:end,
   distance: result.distance,
   duration:(result.mapData?.duration ?? "").toString(),
   passengers,
   carbonEmission: result.metrics.carbonEmission,
   greenScore: result.metrics.greenScore,
   isEcoFriendly: result.metrics.isEcoFriendly

  });

  res.status(201).json({

   route: result.mapData,

   vehicle:{
    vehicle_name,
    mileage,
    fuel_type,
    vehicle_age,
    engine_cc,
    passengers
   },

   environment:{
    temperature: result.temperature
   },

   carbon: result.metrics

  });

 } catch(error:any){

  console.error(error);

  res.status(500).json({
   message:"Carbon calculation failed"
  });

 }

};



// GET ALL
export const getAllCarbons = async (req: Request, res: Response) => {

 try {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const query:any = {};

  if((req as any).user?._id){
   query.userId = (req as any).user._id;
  }

  const carbons = await Carbon.find(query)
   .sort({createdAt:-1})
   .skip((page-1)*limit)
   .limit(limit);

  const total = await Carbon.countDocuments(query);

  res.json({
   total,
   page,
   pages:Math.ceil(total/limit),
   data:carbons
  });

 } catch(error:any){

  res.status(500).json({
   message:error.message
  });

 }

};



// GET SINGLE
export const getCarbonById = async (req: Request, res: Response) => {

 try {

  const carbon = await Carbon.findById(req.params.id);

  if(!carbon){
   return res.status(404).json({
    message:"Record not found"
   });
  }

  res.json({
   data:carbon
  });

 } catch(error:any){

  res.status(500).json({
   message:error.message
  });

 }

};



// UPDATE
export const updateCarbon = async (req: Request, res: Response) => {

 try {

  const carbon = await Carbon.findById(req.params.id);

  if(!carbon){
   return res.status(404).json({
    message:"Record not found"
   });
  }

  const {
   start,
   end,
   mileage,
   fuel_type,
   vehicle_age,
   engine_cc,
   passengers,
   vehicle_name
  } = req.body;

  const updatedStart = start ?? carbon.startLocation;
  const updatedEnd = end ?? carbon.endLocation;

  const result = await calculateRouteCarbon(
   updatedStart,
   updatedEnd,
   mileage,
   fuel_type,
   vehicle_age,
   engine_cc,
   passengers
  );

  carbon.startLocation = updatedStart;
  carbon.endLocation = updatedEnd;
  carbon.distance = result.distance;
  carbon.duration = (result.mapData?.duration ?? "").toString();

  if(vehicle_name !== undefined){
   carbon.vehicle_name = vehicle_name;
  }

  if(passengers !== undefined){
   carbon.passengers = passengers;
  }

  carbon.carbonEmission = result.metrics.carbonEmission;
  carbon.greenScore = result.metrics.greenScore;
  carbon.isEcoFriendly = result.metrics.isEcoFriendly;

  await carbon.save();

  res.json({
   message:"Carbon record updated",
   data:carbon
  });

 } catch(error:any){

  res.status(500).json({
   message:error.message
  });

 }

};



// DELETE
export const deleteCarbon = async (req: Request, res: Response) => {

 try {

  const carbon = await Carbon.findByIdAndDelete(req.params.id);

  if(!carbon){
   return res.status(404).json({
    message:"Record not found"
   });
  }

  res.json({
   message:"Carbon record deleted"
  });

 } catch(error:any){

  res.status(500).json({
   message:error.message
  });

 }

};