import mongoose, { Schema, Model } from "mongoose";
import type { FuelUnit} from "../types/carbonType";
export interface IFuel extends mongoose.Document {
  fuelType:string;                // petrol, diesel, electric
  unit:FuelUnit;
  co2PerUnit:number;              // kg CO2 per liter or kWh
  country:mongoose.Schema.Types.ObjectId;
  isActive:boolean;
}

const fuelSchema=new Schema<IFuel>(
  {
    fuelType:
    {
       type:String, 
       required:true,trim:true 
    },

    unit:{
      type:String,
      enum:["liter", "kWh"],
      required:true,
    },

    co2PerUnit:{
      type:Number,
      required:true,
      min:0,
    },

    country:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Country",
      required:true,
    },

    isActive:{ 
        type:Boolean, 
        default:true
    },
  },
  { timestamps:true }
);

const Fuel:Model<IFuel>=mongoose.model<IFuel>("Fuel", fuelSchema);
export default Fuel;