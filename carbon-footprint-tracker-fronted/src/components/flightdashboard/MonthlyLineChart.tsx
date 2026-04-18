import React, { useEffect, useState } from "react";
import {  monthChartData, MonthlyRecord } from "../../types/carbonTypes";
import {CartesianGrid,Area,AreaChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";
import api from "../../api/axios";
import { serverUrl } from "../../App";
import { DotProps } from "recharts";

const CustomDot:React.FC<DotProps>=(props)=>{
   const { cx,cy,height}=props;
  if(cx===undefined || cy===undefined) 
    return null;
  return (
    <>
      <line
        x1={cx}
        y1={height ?? 0}
        x2={cx}
        y2={cy}
        stroke="#6b7280"
        strokeDasharray="3 3"
      />
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
 const [data,setData]=useState<monthChartData[]>([]);
 useEffect(()=>{
  const fetchData=async()=>{
    try{
      const result=await api.get(`${serverUrl}/api/flight/getmonthlychart`,{ withCredentials: true });
      const records:MonthlyRecord[]=result.data?.data || [];
      const months=[
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const finalData=months.map((month,index)=>{
        const found=records.find((item)=>item._id.month===index + 1);
        return {month,emission: found ? Math.round(found.total):0};
      });
      setData(finalData);
    } catch(error){
      console.log("Monthly graph error:", error);
    }
  };
  fetchData();
},[]);

const maxValue=Math.max(...data.map((d)=>d.emission),0);
  return (
    <div
      
      className="relative w-155 h-75 p-3 rounded-2xl text-center bg-black backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden">
      
      
      <p className="relative text-green-400 font-semibold text-left mb-1 tracking-wide">Monthly Carbon Emissions</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{top:10,right:25,left:5,bottom:20}}
        >
          <defs>
            <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#6b7280"
            vertical={false}
          />
          <XAxis dataKey="month" stroke="#90EE90" interval={0}/>
          <YAxis
            domain={[0, maxValue * 1.2]}
            tickFormatter={(value)=>{
              const num=Number(value || 0);
              const formatted=(num/1000).toFixed(1);
              return formatted.endsWith(".0")?`${Math.floor(num / 1000)}k`:`${formatted}k`;
          }}
        allowDecimals={false}
        stroke="#90EE90"
          />
          <Tooltip
            contentStyle={{
              backgroundColor:"#1f2937",
              border:"none",
              borderRadius:"8px",
              color:"#fff"
            }}
          />
          <Area
            type="monotone"
            dataKey="emission"
            stroke="#90EE90"
            strokeWidth={3}
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