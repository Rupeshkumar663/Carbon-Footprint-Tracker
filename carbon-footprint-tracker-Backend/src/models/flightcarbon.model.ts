import mongoose from "mongoose";
const flightcarbonSchema=new mongoose.Schema({
  userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
      },
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
  distance:{
    type:Number
  },
  totalCO2:{
    type:Number
  },
  perPassenger:{
    type:Number
  },
  ecoScore:{
    type:Number
  },
},{timestamps:true})
export const FlightcarbonModel=mongoose.model("FlightcarbonModel",flightcarbonSchema)