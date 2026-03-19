import mongoose from "mongoose";
import { DashboardCarbon } from "../types/carbonType";
const DashboardCarbonSchema=new mongoose.Schema<DashboardCarbon>({
     carbon:{
        type:Number
     },
     date:{
        type:Date,
        default:Date.now,
     }
    },{
     timestamps:true
    }
 )
export default mongoose.model<DashboardCarbon>("Dashboardcarbon",DashboardCarbonSchema)