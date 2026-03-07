import mongoose,{Schema,Model} from "mongoose"
import {IFuel} from "../types/carbonType"

const fuelSchema:Schema<IFuel>=new Schema({
 name:{
  type:String,
  required:true
 },
 co2PerUnit:{
  type:Number,
  required:true
 },
 unit:{
  type:String,
  required:true
 },
 isActive:{
  type:Boolean,
  default:true
 }
},{timestamps:true})

const Fuel:Model<IFuel>=mongoose.model<IFuel>("Fuel",fuelSchema)

export default Fuel