import {Request,Response} from "express";
import User,{IUser} from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../config/token";
import sendMail from "../config/sendMail";
import uploadOnCloudinary from "../config/cloudinary";
//signup---------------------------------------
export const signup=async(req:Request,res:Response)=>{
  try{
    const{name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }
    const hash=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hash});
    const token=generateToken(user._id.toString());
    res.status(201).json({success:true,token,});
  }catch(error){
    res.status(500).json({message:"Server error"});
  }
};

//Login---------------------------------------
export const login=async(req:Request,res:Response)=>{
  try{
    const{email,password}=req.body;
    const user=await User.findOne({email}).select("+password") as IUser|null;
    if(!user)
      return res.status(404).json({message:"User not found"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
      return res.status(401).json({message:"Invalid password"});
    const token=generateToken(user._id.toString());
    res.json({success:true,token,
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        photoUrl:user.photoUrl,
        description:user.description,
      },
    });
  }catch(error){
    res.status(500).json({message:"Server error"});
  }
};

//Send OTP---------------------------------
export const sendotp=async(req:Request,res:Response)=>{
  try{
    const{email}=req.body;
    if(!email){
      return res.status(400).json({message:"Email is required"});
    }
    const user=await User.findOne({email}) as IUser|null;
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const otp=Math.floor(100000+Math.random()*900000).toString();
    user.resetOtp=otp;
    user.otpExpires=new Date(Date.now()+5*60*1000);
    user.isotpVerified=false;
    await user.save();
    await sendMail(email,otp);
    return res.status(200).json({message:"OTP sent successfully"});
  }catch(error){
    res.status(500).json({message:`Send otp error ${error}`});
  }
};

//Verify OTP------------------
export const verifyotp=async(req:Request,res:Response)=>{
  try{
    const{email,otp}=req.body;
    const user=await User.findOne({email}) as IUser|null;
    if(!user||user.resetOtp!==otp||!user.otpExpires||user.otpExpires.getTime()<Date.now()){
      return res.status(404).json({message:"Invalid OTP"});
    }
    user.isotpVerified=true;
    user.resetOtp=undefined;
    user.otpExpires=undefined;
    await user.save();
    return res.status(200).json({message:"OTP verified successfully"});
  }catch(error){
    return res.status(500).json({message:"verify otp error"});
  }
};

//Reset Password------------------------------------------
export const resetpassword=async(req:Request,res:Response)=>{
   try{
     const{email,password}=req.body;
     const user=await User.findOne({email}) as IUser|null;
    if(!user||!user.isotpVerified){
       return res.status(404).json({message:"OTP verification is required"});
    }
    const hashPassword=await bcrypt.hash(password,10);
    user.password=hashPassword;
    user.isotpVerified=false;
    await user.save();
    return res.status(200).json({message:"Reset Password Successfully"});
   }catch(error){
      return res.status(404).json({message:"Reset password error"});
   }
};

//updateProfile-------------------------------------------
export const updateProfile = async (req: Request, res: Response) => {
  try {
   const userId=(req as any).user._id;
    const { description, name }=req.body;
    const updateData: any={};
    if(name) updateData.name=name;
    if(description) updateData.description=description;
    if(req.file){
      const uploadedUrl=await uploadOnCloudinary(req.file.path);
      if(uploadedUrl){
        updateData.photoUrl=uploadedUrl;
      }
    }
    const updatedUser=await User.findByIdAndUpdate(userId,updateData,{new:true});
    if(!updatedUser){
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({user:updatedUser,});
  } catch(error:any){
    return res.status(500).json({message: `updateProfile error: ${error.message}`});
  }
};