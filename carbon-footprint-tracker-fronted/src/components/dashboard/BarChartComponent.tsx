import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CarbonRecord, weekChartData } from "../../types/carbonTypes";
import {ResponsiveContainer,Bar,BarChart,CartesianGrid,Tooltip,
XAxis,YAxis} from "recharts";
import api from "../../api/axios";
import { serverUrl } from "../../App";
const BarChartComponent:React.FC=()=>{
  const [data,setData]=useState<weekChartData[]>([])
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const result=await api.get(`${serverUrl}/api/carbon`)
        const records:CarbonRecord[]=result.data.data;
        const days= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const weeklyMap:Record<string,number>={
          Sun:0,
          Mon:0, 
          Tue:0,
          Wed:0, 
          Thu:0,
          Fri:0, 
          Sat:0
        };
         records.forEach((item)=>{
          const date=new Date(item.createdAt);
          const day=days[date.getDay()];
          weeklyMap[day]+= item.carbonEmission || 0;
        })
         const finalData=days.map((day)=>({
          week:day,
          emission:Math.round(weeklyMap[day])
        }));
        setData(finalData)
      } catch (error) {
        console.log("graph error",error)
      }
    }
    fetchData();
  },[])
  const maxValue=Math.max(...data.map(d=>d.emission),0);
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
     <p className="relative text-gray-300 font-semibold text-left mb-3 tracking-wide">Weekly Carbon Emissions</p>
     
     <ResponsiveContainer width="100%" height="85%">
       <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="week"stroke="#ffffff"tick={{ fill:"#ffffff" }}/>
        <YAxis
            domain={[0, maxValue * 1.2]}
            tickFormatter={(value)=>value>1000?`${Math.round(value / 1000)}k`:`${Math.round(value)}`}
            allowDecimals={false}
            stroke="none"
            tick={{ fill:"#ffffff" }}
          />
        <Tooltip formatter={(value:any)=>Math.round(value)} contentStyle={{ background:"#1e293b",border:"none",borderRadius:"8px",color:"#fff"}}/>
        <Bar dataKey="emission" fill="#3b82f6" radius={[6,6,0,0]}barSize={30}/>
       </BarChart>
     </ResponsiveContainer>
    </motion.div>
   );
  };
export default BarChartComponent;