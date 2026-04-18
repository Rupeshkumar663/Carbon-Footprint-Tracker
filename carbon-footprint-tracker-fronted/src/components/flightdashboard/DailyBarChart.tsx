import React, { useEffect, useState } from "react";
import { weekChartData, WeeklyRecord } from "../../types/carbonTypes";
import {ResponsiveContainer,Bar,BarChart,CartesianGrid,Tooltip,
XAxis,YAxis} from "recharts";
import api from "../../api/axios";
import { serverUrl } from "../../App";


const DailyBarChart:React.FC=()=>{
  const [data,setData]=useState<weekChartData[]>([])
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const result=await api.get(`${serverUrl}/api/flight/getdailychart`,{withCredentials:true})
        const records:WeeklyRecord[]=result.data?.data || [];
      const finalData:weekChartData[]=records.map((item)=>({
        week:item.day,
        emission:item.total
      }));
      setData(finalData);
      } catch (error) {
        console.log("graph error",error)
      }
    }
    fetchData();
  },[])
  const maxValue=Math.max(...data.map(d=>d.emission),0);
return (
  <div
    
     className="relative w-[600px] h-[300px] p-4 rounded-2xl bg-black backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden" >
     
    
     <p className="relative text-green-400 font-semibold text-left mb-3 tracking-wide">Weekly Carbon Emissions</p>
     
     <ResponsiveContainer width="100%" height="85%">
       <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="week"stroke="#ffffff"tick={{ fill:"#90EE90" }}/>
        <YAxis
            domain={[0, maxValue * 1.2]}
            tickFormatter={(value)=>value>1000?`${Math.round(value / 1000)}k`:`${Math.round(value)}`}
            allowDecimals={false}
            stroke="none"
            tick={{ fill:"#90EE90" }}
          />
              <Tooltip
                formatter={(value)=>{
                  const val=typeof value === "number"? Math.round(value): Math.round(Number(value));
                  return [val,"Emission"];
                }}
                contentStyle={{
                  background:"#1e293b",
                  border:"none",
                  borderRadius:"8px",
                  color:"#fff"
                }}
              />
        <Bar dataKey="emission" fill="#3b82f6" radius={[6,6,0,0]}barSize={30}/>
       </BarChart>
     </ResponsiveContainer>
    </div>
   );
  };
export default DailyBarChart;