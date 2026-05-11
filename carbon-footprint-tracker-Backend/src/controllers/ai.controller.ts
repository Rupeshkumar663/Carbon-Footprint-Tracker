import { Request, Response }from "express";
import { generateCarbonInsight }
from "../services/GroqAi.service";
export const getAIInsights=async(req:Request,res:Response)=>{
  try {
    const { question }=req.body;
    if(!question){
      return res.status(400).json({message:"Question required"});
    }
    const insight=await generateCarbonInsight(question);
    return res.status(200).json({insight});
  } catch(error:any){
    return res.status(500).json({message:error.message,});
  }
};