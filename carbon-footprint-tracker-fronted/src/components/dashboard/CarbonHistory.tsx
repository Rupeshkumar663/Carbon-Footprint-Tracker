import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import { CarbonType } from "../../types/carbonTypes";

const CarbonHistory:React.FC=()=>{

  const [data,setData]=useState<CarbonType[]>([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchHistory=async()=>{
      try {
        const res=await api.get("/api/carbon/carbonhistory");
        const records:CarbonType[]=res.data?.data ?? [];
        const sorted=[...records].sort((a,b) =>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
        setData(sorted);
      } catch(error){
        console.log("History error:",error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  },[]);

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[300px] sm:h-[280px] md:h-[380px] p-3 sm:p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col ">
      <div className="mb-2">
        <p className="text-green-400 text-sm sm:text-base font-semibold">Carbon History</p>
        <p className="text-green-300 text-[11px] mt-1">Recent vehicle emission activities</p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {loading && (
          <p className="text-gray-400 text-xs">Loading...</p>)}
        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <p className="text-green-300 text-sm font-medium">No vehicle activity yet</p>
            <p className="text-gray-500 text-xs mt-2 max-w-[220px] leading-relaxed">
              Your recent carbon emission history will appear here after your first trip calculation.</p>
         </div>
        )}

        {!loading &&data.map((item)=>{
            const dateObj=new Date(item.createdAt);
            const date=dateObj.toLocaleDateString();
            const time=dateObj.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
            return (
              <div
                key={item._id} className="flex justify-between items-center px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300">
                <div className="min-w-0">
                  <p className="text-green-400 text-xs sm:text-sm font-medium truncate">{item.vehicle_name}</p>
                  <p className="text-green-300 text-[10px] sm:text-xs mt-1 truncate">{item.startLocation} → {item.endLocation}</p>
                  <p className="text-green-200 text-[10px] sm:text-xs mt-1">{item.fuel_type.toUpperCase()} • {date} • {time}</p>
                </div>

                <div className="text-right ml-3 flex-shrink-0">
                  <p className="text-green-400 text-xs sm:text-sm font-semibold">{Math.round(item.carbonEmission || 0)} kg</p>
                  <p className="text-green-200 text-[10px] mt-1">CO₂</p>
                </div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default CarbonHistory;