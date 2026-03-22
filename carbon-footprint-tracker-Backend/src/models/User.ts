import mongoose,{Document} from "mongoose";
export interface IUser extends Document{
  name:string;
  email:string;
  password:string;
  photoUrl:String;
  description:String;
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
    photoUrl:{
      type:String,
      default:"",
    },
    description:{
      type:String,
      default:"",
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