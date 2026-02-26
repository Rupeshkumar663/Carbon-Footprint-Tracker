import mongoose,{Schema,Model} from "mongoose";
export interface IRoute {
  userId:string;
  startLocation:string;
  endLocation:string;
  distance:number;
  duration:number;
  transportType:"car" | "bike" | "bus" | "train" | "walk" | "cycle";
  carbonEmission:number;
  greenScore:number;
  isEcoFriendly:boolean;
  createdAt:Date;
  updatedAt:Date;
}
//Schema START-------------------
const routeSchema:Schema<IRoute>=new Schema(
  {
    userId:{
      type:String,
      required:[true,"User ID is required"],
      trim:true,
      index:true,
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

    transportType:{
      type:String,
      required:true,
      enum:{
        values:["car","bike","bus","train","walk","cycle"],
        message:"Invalid transport type",
      },
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
const Route:Model<IRoute>=mongoose.model<IRoute>("Route",routeSchema);
export default Route;