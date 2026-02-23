import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer")){
      return res.status(401).json({message:"Not authorized"});
    }
    const token=authHeader.split(" ")[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as any;
    (req as any).user=await User.findById(decoded.id).select("-password");
    next();
  }catch(error){
    res.status(401).json({message:"Token  expired"});
  }
};

export default authMiddleware;