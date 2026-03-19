import mongoose from "mongoose"

export type VehicleCategory="road"|"rail"|"air"

export interface IFuel{
 name:string
 co2PerUnit:number
 unit:string
 isActive:boolean
}

export interface IVehicle{
 name:string
 category:VehicleCategory
 fuel:mongoose.Schema.Types.ObjectId
 mileage?:number
 energyConsumption?:number
 isElectric:boolean
 isActive:boolean
}

export interface CarbonCalculationResult{
 carbonEmission:number
 greenScore:number
 isEcoFriendly:boolean
}

export interface ICarbon extends CarbonCalculationResult{
 userId?:mongoose.Schema.Types.ObjectId
 vehicle_name:string
 startLocation:string
 endLocation:string
 distance:number
 duration:string
 passengers?:number
 createdAt:Date
 updatedAt:Date
}

export interface DashboardCarbon extends Document {
  carbon:number;
  date:Date;
}