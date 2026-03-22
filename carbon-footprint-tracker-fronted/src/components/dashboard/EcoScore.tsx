import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { serverUrl } from "../../App";
const EcoScore:React.FC=()=>{
  const [score,setScore]=useState(0);
  const [trend,setTrend]=useState(0); 
  const fetchScore=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/carbon`);
      const records=res.data.data || [];
      const latest=records[0];
      setScore(latest?.greenScore || 0);
      const today=new Date();
      today.setHours(0,0,0,0);
      const yesterday=new Date(today);
      yesterday.setDate(today.getDate()-1);
      let todayTotal=0;
      let yesterdayTotal=0;
      records.forEach((item:any)=>{
        const date=new Date(item.createdAt);
        if(date>=today){
          todayTotal +=item.carbonEmission || 0;
        } else if(date>= yesterday && date<today){
          yesterdayTotal +=item.carbonEmission || 0;
        }
      });
      if(yesterdayTotal>0){
        const change=((todayTotal-yesterdayTotal)/yesterdayTotal)*100;
        setTrend(Math.round(change));
      }

    } catch(error){
      console.log("EcoScore error:",error);
    }
  };
  useEffect(()=>{
    fetchScore();
  },[]);
  const safeScore=Math.max(0,Math.min(100,score || 0));
  const radius=85;
  const stroke=15;
  const circumference=Math.PI * radius;
  const progress=(safeScore/100)* circumference;
  const getColor=()=>{
    if(safeScore>=60) return "#4ade80";
    if(safeScore>=30) return "#facc15";
    return "#ef4444";
  };
  const getBadge=()=>{
    if(safeScore>=80) return "🌍 Green Hero";
    if(safeScore>=60) return "🌱 Eco Friendly";
    if(safeScore>=30) return "⚠️ Moderate";
    return "🚫 Polluter";
  };
  return (
    <div className="relative w-[320px] h-[180px] flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
      <svg width="220" height="120" viewBox="0 0 220 120">
        <path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke="#1f2937"
          strokeWidth={stroke}
        />
        <path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke="#374151"
          strokeWidth={stroke}
        />
        <motion.path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke={getColor()}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2 }}
        />
      </svg>
      <div className="absolute bottom-4 text-center">
        <p className="text-gray-300 text-sm">Eco Score</p>
        <h2 className="text-white text-5xl font-bold">{safeScore}%</h2>
        <p className="text-gray-400 text-sm mt-1">{getBadge()}</p>
        {trend!==0 && (<p className={`text-xs mt-1 ${trend < 0 ? "text-green-400" : "text-red-400"}`}>{trend < 0 ? "↓" : "↑"} {Math.abs(trend)}% vs yesterday</p>)}
      </div>
    </div>
  );
};
export default EcoScore;