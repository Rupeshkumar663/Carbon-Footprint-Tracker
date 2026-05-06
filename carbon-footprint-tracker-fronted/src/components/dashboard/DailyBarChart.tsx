import React, { useEffect, useState } from "react";
import {ResponsiveContainer,Bar,BarChart,CartesianGrid,Tooltip,XAxis,YAxis,} from "recharts";
import api from "../../api/axios";

const DailyBarChart: React.FC=()=>{
  const [data,setData]=useState<any[]>([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await api.get("/api/carbon/carbonweekly");
        const records=res.data?.data || [];
        const finalData=records.map((item:any)=>({week:item.day,emission:item.total}));
        setData(finalData);
      } catch(error){
        console.log("graph error",error);
      }
    };
    fetchData();
   const interval=setInterval(fetchData,60000);
    return ()=>clearInterval(interval);
  },[]);
  const maxValue=data.length>0? Math.max(...data.map(d=>d.emission)):0;

  return (
    <div className="w-full h-[240px] sm:h-[280px] md:h-[300px] p-3 sm:p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-lg">
      <p className="text-green-400 font-semibold text-sm sm:text-base mb-2">Weekly Carbon Emissions</p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="week"
            stroke="#90EE90"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            domain={[0, maxValue * 1.2]}
            allowDecimals={false}
            stroke="#90EE90"
            tickFormatter={(value)=>
              value>=1000 ? `${Math.round(value/1000)} k`:value
             }
          />

          <Tooltip
            formatter={(value:number)=>[`${Math.round(value)} kg`,"Emission"]}
            contentStyle={{
              background:"#1e293b",
              border:"none",
              borderRadius:"8px",
              color:"#fff",
            }}
          />

          <Bar
            dataKey="emission"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyBarChart;