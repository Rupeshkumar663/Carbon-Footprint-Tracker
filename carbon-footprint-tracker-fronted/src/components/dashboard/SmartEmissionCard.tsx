import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";

type DataType={
  totalCO2:number;
  trend:number;
  trees:number;
  insight:string;
};

const SmartEmissionCard:React.FC=()=>{
  const [data,setData]=useState<DataType | null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await api.get("/api/carbon/carbonsmartemission");
        setData(res.data?.data || null);
      } catch(error){
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  if(loading)
  return (
    <div className="bg-black/90 p-4 sm:p-6 rounded-2xl border border-white/10">
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );
  if(!data)
  return (
    <div className="bg-black/90 p-4 sm:p-6 rounded-2xl border border-white/10">
      <p className="text-red-400 text-sm">No data available</p>
    </div>
  );
  const isBad=data.trend>0;
  const isStable=data.trend===0;
  const trendValue=Math.abs(data.trend);
  const getLabel=()=>{
    if(trendValue<5) 
      return "Stable";
    if(isBad) 
      return "Increasing";
    return "Improving";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/90 p-4 sm:p-6 rounded-2xl border border-white/10 shadow-lg w-full overflow-hidden">
      <p className="text-green-400 text-sm mb-2">Total Emission</p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-300 font-bold break-words">{Math.round(data?.totalCO2).toLocaleString()} kg CO₂</h2>
      <div className="mt-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p className={`text-xs sm:text-sm font-semibold ${isStable ? "text-amber-300":isBad? "text-red-400": "text-green-400"}`}>
            {isStable? "→":isBad?"↑":"↓"} {trendValue}% this week</p>
          <span className="text-xs text-gray-400">{getLabel()}</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded mt-2 overflow-hidden">
          <div
            className={`h-full ${isBad ? "bg-red-500":"bg-green-500"}`}
            style={{width:`${Math.min(trendValue,100)}%`,transition:"width 0.6s ease"}}
          />
        </div>
      </div>

      <p className="text-gray-400 text-xs sm:text-sm mt-3 break-words">🌳 {data.trees} Trees equivalent</p>
      <div className="mt-4 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="text-xs text-gray-400">💡 AI Insight</p>
        <p className="text-xs sm:text-sm text-green-300 mt-1 leading-relaxed break-words">{data.insight}</p>
      </div>
    </motion.div>
  );
};

export default SmartEmissionCard;