import React from "react";
import { motion } from "framer-motion";
import { weekChartData } from "../../types/carbonTypes";
import {ResponsiveContainer,Bar,BarChart,CartesianGrid,Tooltip,
XAxis,YAxis} from "recharts";

const weeklyData:weekChartData[]=[
{week:"Sun",emission:2800},
{week:"Mon",emission:3700},
{week:"Tue",emission:2600},
{week:"Wed",emission:1800},
{week:"Thu",emission:1600},
{week:"Fri",emission:2000},
{week:"Sat",emission:2500}
];
const BarChartComponent:React.FC=()=>{
return (
  <motion.div
     initial={{ opacity: 0, y: 25 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ type: "spring", stiffness: 80, damping: 18 }}
     whileHover={{ y: -3 }}
     className="relative w-[460px] h-[260px] p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden" >
     <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 blur-xl pointer-events-none"></div>
     <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
     <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent"></div>
     <p className="relative text-gray-300 font-semibold text-left mb-3 tracking-wide">Weekly Carbon Trend</p>
     <ResponsiveContainer width="100%" height="85%">
       <BarChart data={weeklyData}>
        <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="week"stroke="#ffffff"tick={{ fill:"#ffffff" }}/>
        <YAxis domain={[0,4000]} ticks={[1000,2000,3000,4000]}tickFormatter={(value)=>`${value/1000}k`} stroke="none" tick={{ fill:"#ffffff" }}/>
        <Tooltip contentStyle={{ background:"#1e293b",border:"none",borderRadius:"8px",color:"#fff"}}/>
        <Bar dataKey="emission" fill="#3b82f6" radius={[6,6,0,0]}barSize={30}/>
       </BarChart>
     </ResponsiveContainer>
    </motion.div>
   );
  };
export default BarChartComponent;