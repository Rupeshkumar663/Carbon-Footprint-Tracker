import mongoose,{Document} from "mongoose";

export interface IUser extends Document{
  name:string;
  email:string;
  password:string;
  resetOtp?:string;
  otpExpires?:Date;
  isotpVerified:boolean;
}

const userSchema=new mongoose.Schema<IUser>(
  {
    name:String,
    email:{
      type:String,
      unique:true
    },
    password:String,
    resetOtp:{
      type:String
    },
    otpExpires:{
      type:Date
    },
    isotpVerified:{
      type:Boolean,
      default:false
    },
  },
  {timestamps:true}
);

export default mongoose.model<IUser>("User",userSchema);