import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CarbonRecord, monthChartData } from "../../types/carbonTypes";
import {CartesianGrid,Area,AreaChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";
import api from "../../api/axios";
import { serverUrl } from "../../App";
const CustomDot=(props:any)=>{
   const { cx,cy,height}=props;
  if(cx===undefined || cy===undefined) 
    return null;
  return (
    <>
      <line
        x1={cx}
        y1={height}
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
const LineChartComponent:React.FC=()=>{
  const [data,setData]=useState<monthChartData[]>([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const result=await api.get(`${serverUrl}/api/carbon`);
        const records:CarbonRecord[]=result.data?.data || [];
        const months=[
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ];
        const monthlyMap:Record<string,number>={
          Jan:0, Feb:0, Mar:0, Apr:0,
          May:0, Jun:0, Jul:0, Aug:0,
          Sep:0, Oct:0, Nov:0, Dec:0
        };
        records.forEach((item)=>{
          const date=new Date(item.createdAt);
          const month=months[date.getMonth()];
          monthlyMap[month]+=item.carbonEmission || 0;
        });
        const finalData=months.map((m)=>({
          month:m,
          emission:Math.round(monthlyMap[m])
        }));
        setData(finalData);
      } catch (error) {
        console.log("Monthly graph error:", error);
      }
    };
    fetchData();
  },[]);
  const maxValue=Math.max(...data.map(d=>d.emission),0);
  return (
    <motion.div
      initial={{opacity:0,y:25}}
      animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:80,damping:18}}
      whileHover={{y:-3}}
      className="relative w-135 h-65 p-3 rounded-2xl text-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 left-[-50%] w-[200%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent"></div>
      <p className="relative text-gray-300 font-semibold text-left mb-1 tracking-wide">Monthly Carbon Emissions</p>
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
          <XAxis dataKey="month" stroke="#ffffff" interval={0}/>
          <YAxis
            domain={[0, maxValue * 1.2]}
            tickFormatter={(value) => {
       const num=Number(value || 0);
       const formatted=(num/1000).toFixed(1);
       return formatted.endsWith(".0")?`${Math.floor(num / 1000)}k`:`${formatted}k`;
 }}
        allowDecimals={false}
        stroke="#ffffff"
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
            stroke="#22c55e"
            strokeWidth={3}
            fill="url(#colorEmission)"
            dot={<CustomDot />}
            activeDot={{ r:6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
export default LineChartComponent;