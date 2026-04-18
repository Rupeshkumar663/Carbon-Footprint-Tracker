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

export interface monthChartData {
  month:string
  emission:number
}

export interface weekChartData {
  week:string
  emission:number
}

export interface CarbonRecord{
  createdAt:string;
  carbonEmission:number;
};

export interface CarbonType{
  _id:string;
  startLocation:string;
  endLocation:string;
  carbonEmission:number;
  createdAt:string;
};

export interface InfoCardType{
  label:string;
  value:string | number;
  icon:React.ReactNode
};

export interface VehicleData {
  vehicle:string;
  mileage:string;
  fuel:string;
  passengers:number;
  engine:number;
  age:string;
  temperature:string;
}

export interface Field {
  key:keyof VehicleData;
  label:string;
}

export interface  ResultType{
  from:string;
  to:string;
  distance:number;
  passengers:number;
  seatClass:string;
  perPassenger:number;
  totalCO2:number;
  ecoScore:number;
  aiAdvice:string[];
};

export interface FormType {
  jetModel:string;
  hours:string;
  mission:string;
  payload:string;
  altitude:string;
  speed:string;
};

export interface MonthlyRecord{
  _id:{
    month:number;
  };
  total:number;
}

export interface WeeklyRecord{
  day:string;
  total:number;
}

export interface FlightRecord{
  _id:string;
  from:string;
  to:string;
  totalCarbon:number;
  createdAt:string;
}