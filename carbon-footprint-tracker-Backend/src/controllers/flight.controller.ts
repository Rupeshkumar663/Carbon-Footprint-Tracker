import {Request,Response} from "express";
import { getCoordinates } from "../services/coordinates.services";
import { getDistance } from "../services/haversine.service";
import { calculateCarbon } from "../services/flightcarbon.service";
import { FlightcarbonModel } from "../models/flightcarbon.model";

export const FlightCarbon=async(req:Request,res:Response)=>{
    try{
        const {from,to,passengers,seatClass}=req.body
        if(!from || !to ||  typeof passengers !== "number" || passengers<=0 ||!seatClass){
            return res.status(400).json({message:"please fill all fields"});
        }
       const [fromCoord,toCoord]=await Promise.all([getCoordinates(from),getCoordinates(to)]);
       const distance=getDistance(fromCoord.lat,fromCoord.lon,toCoord.lat,toCoord.lon);
       const flightcarbon=calculateCarbon(distance,passengers,seatClass);
       
       await FlightcarbonModel.create({
             from,
             to,
             distance,
             totalCO2:flightcarbon.totalCO2,
             perPassenger:flightcarbon.perPassenger,
             ecoScore:flightcarbon.ecoScore,
             passengers,
             seatClass,
         })

       return res.status(200).json({success:true,
             data:{
                 from,
                 to,
                 distance:Number(distance.toFixed(2)),
                 ...flightcarbon
                }
          });

    } catch(error:any){
        return res.status(500).json({success:false,error:error.message || "Internal Server Error"});
    }
}