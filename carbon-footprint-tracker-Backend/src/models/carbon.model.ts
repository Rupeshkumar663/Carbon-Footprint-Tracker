import mongoose,{Schema,Model} from "mongoose"
import {ICarbon} from "../types/carbonType"

const carbonSchema:Schema<ICarbon>=new Schema({

 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 vehicle_name:{
  type:String,
  required:true
 },

 startLocation:{
  type:String,
  required:true
 },

 endLocation:{
  type:String,
  required:true
 },

 distance:{
  type:Number,
  required:true
 },

 duration:{
  type:String,
  required:true
 },

 passengers:{
  type:Number,
  default:1
 },

 carbonEmission:{
  type:Number,
  required:true
 },

 greenScore:{
  type:Number,
  required:true,
  min:0,
  max:100
 },

 isEcoFriendly:{
  type:Boolean,
  default:false
 }

},{timestamps:true})

const Carbon:Model<ICarbon>=mongoose.model<ICarbon>("Carbon",carbonSchema)

export default Carbon