import mongoose,{Schema,Model} from "mongoose"
import {IVehicle} from "../types/carbonType"

const vehicleSchema:Schema<IVehicle>=new Schema({
 name:{
  type:String,
  required:true
 },
 category:{
  type:String,
  enum:["road","rail","air"],
  required:true
 },
 fuel:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Fuel",
  required:true
 },
 mileage:{
  type:Number
 },
 energyConsumption:{
  type:Number
 },
 isElectric:{
  type:Boolean,
  default:false
 },
 isActive:{
  type:Boolean,
  default:true
 }
},{timestamps:true})

const Vehicle:Model<IVehicle>=mongoose.model<IVehicle>("Vehicle",vehicleSchema)
export default Vehicle