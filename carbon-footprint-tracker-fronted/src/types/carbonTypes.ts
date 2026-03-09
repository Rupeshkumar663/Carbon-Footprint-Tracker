export interface CarbonFormData {
  start:string;
  end:string;
  vehicle_name:string;
  mileage:string;
  fuel_type:string;
  engine_cc:string;
  vehicle_age:string;
  passengers:string;
}

export interface CardProps{
title:string
value:string | number
}

export interface MovingShapeProps{
position:[number,number,number]
type:"cube" | "sphere" | "torus"
}

export interface EmissionData{
vehicle:string
distance:number
mileage:number
fuel_type:string
speed:number
traffic:string
temp:number
road_type:string
vehicle_age:number
vehicle_load:number
elevation:number
engine_cc:number
emission:number
green_score:number
}

export interface CarbonResult {
 route:{
  distance:number
 }

 carbon:{
  carbonEmission:number
  greenScore:number
 }

 vehicle:{
  vehicle_name:string
  mileage:number
  fuel_type:string
  passengers:number
  engine_cc:number
  vehicle_age:number
 }

 environment:{
  temperature:number
 }
}