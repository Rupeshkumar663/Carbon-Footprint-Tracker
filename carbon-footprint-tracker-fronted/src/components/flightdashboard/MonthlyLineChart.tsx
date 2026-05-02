import React, { useEffect, useState } from "react";
import {CartesianGrid,Area,AreaChart,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts";
import api from "../../api/axios";
import { DotProps } from "recharts";

const CustomDot:React.FC<DotProps>=(props)=>{
  const { cx, cy }=props;
  if (cx === undefined || cy === undefined) 
    return null;

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#bbf7d0"
        stroke="#22c55e"
        strokeWidth={2}
      />
    </>
  );
};

const MonthlyLineChart:React.FC=()=>{
  const [data,setData]=useState<any[]>([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await api.get("/api/flight/getmonthlychart");
        const records=res.data?.data || [];
        const months=[
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ];
        const finalData=months.map((month, index) => {
          const found=records.find((item:any)=>item._id.month === index + 1);
          return {month,emission:found ? Math.round(found.total):0};
        });
        setData(finalData);
      } catch(error){
        console.log("Monthly graph error:",error);
      }
    };
    fetchData();
  },[]);

  const maxValue=Math.max(...data.map((d)=>d.emission),0);
  return (
    <div className="w-full h-[250px] sm:h-[300px] p-4 rounded-2xl bg-black border border-white/10 shadow-lg">
      <p className="text-green-400 font-semibold text-sm sm:text-base mb-2">Monthly Carbon Emissions</p>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#90EE90"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[0,maxValue*1.2]}
            stroke="#90EE90"
            allowDecimals={false}
            tickFormatter={(value)=>{
              if(value>=1000)
                 return `${Math.round(value/1000)}k`;
              return value;
            }}
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
          <Area
            type="monotone"
            dataKey="emission"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#colorEmission)"
            dot={<CustomDot />}
            activeDot={{ r:6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyLineChart;