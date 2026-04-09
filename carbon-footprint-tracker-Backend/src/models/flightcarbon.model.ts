import mongoose from "mongoose";
import { timeStamp } from "node:console";
const flightcarbonSchema=new mongoose.Schema({
  from:{ 
    type:String,
    required:true 
   },
  to:{ 
    type:String,
    required:true
   },
  passengers:{
    type:Number
  },
  seatClass:{
    type:String
  },
  emission:{
    type:Number
  },
  trees:{
    type:Number
  },
  impact:{
    type:String
  },
  insight:{
    type:String
  },
},{timestamps:true})
export const Flightcarbon=mongoose.model("Flightcarbon",flightcarbonSchema)