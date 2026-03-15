import React from "react";
import { motion } from "framer-motion";
import { ChartData } from "../../types/carbonTypes";
import {CartesianGrid,Area,AreaChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts";

const data:ChartData[]=[
  { month:"Jan",emission:7},
  { month:"Feb",emission:9},
  { month:"Mar",emission:12},
  { month:"Apr",emission:8},
  { month:"May",emission:6},
  { month:"Jun",emission:7},
  { month:"Jul",emission:6},
  { month:"Aug",emission:7},
  { month:"Sep",emission:6},
  { month:"Oct",emission:8},
  { month:"Nov",emission:7},
  { month:"Dec",emission:8}
];

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
          <YAxis stroke="#ffffff" domain={[4, 12]} tickCount={5}/>
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