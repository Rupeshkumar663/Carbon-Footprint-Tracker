import mongoose,{Schema,Model} from "mongoose";
import type { CarbonCalculationResult } from "../types/carbonType";
export interface IRoute  extends CarbonCalculationResult {
  userId?: mongoose.Schema.Types.ObjectId;
  vehicle: mongoose.Schema.Types.ObjectId;
  startLocation: string;
  endLocation: string;
  distance: number;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}
//Schema START-------------------
const carbonSchema:Schema<IRoute>=new Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
     vehicle:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    startLocation:{
      type:String,
      required:[true,"Start location is required"],
      trim:true,
    },
    endLocation:{
      type:String,
      required:[true,"End location is required"],
      trim:true,
    },

    distance:{
      type:Number,
      required:[true,"Distance is required"],
      min:[0,"Distance cannot be negative"],
    },

    duration:{
      type:Number,
      required:[true,"Duration is required"],
      min:[0,"Duration cannot be negative"],
    },

    carbonEmission:{
      type:Number,
      required:true,
      min:[0,"Carbon emission cannot be negative"],
    },
    greenScore:{
      type:Number,
      required:true,
      min:0,
      max:100,
    },
    isEcoFriendly:{
      type:Boolean,
      default:false,
    },
  },
  {
    timestamps:true,
  }
);

const Carbon:Model<IRoute>=mongoose.model<IRoute>("Carbon",carbonSchema);
export default Carbon;