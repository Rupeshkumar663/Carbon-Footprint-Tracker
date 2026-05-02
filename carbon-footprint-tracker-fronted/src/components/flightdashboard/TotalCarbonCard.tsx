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
        const res=await api.get("/api/flight/getsmartemission");
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
    return <p className="text-gray-400">Loading...</p>;
  if(!data) 
    return <p className="text-red-400">No data</p>;
  const isBad=data.trend>0;
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
      className="bg-black/90 p-6 rounded-2xl border border-white/10 shadow-lg w-full">
      <p className="text-green-400 text-sm mb-2">Total Emission</p>
      <h2 className="text-4xl md:text-5xl text-green-300 font-bold">{data.totalCO2} kg CO₂</h2>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-semibold ${isBad ? "text-red-400":"text-green-400"}`}>
            {isBad ? "↑":"↓"} {trendValue}% this week</p>
          <span className="text-xs text-gray-400">{getLabel()}</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded mt-2 overflow-hidden">
          <div
            className={`h-full ${isBad ? "bg-red-500":"bg-green-500"}`}
            style={{width:`${Math.min(trendValue,100)}%`,transition:"width 0.6s ease"}}
          />
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-3">🌳 {data.trees} Trees equivalent</p>
      <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
        <p className="text-xs text-gray-400">💡 AI Insight</p>
        <p className="text-sm text-green-300 mt-1">{data.insight}</p>
      </div>
    </motion.div>
  );
};

export default SmartEmissionCard;