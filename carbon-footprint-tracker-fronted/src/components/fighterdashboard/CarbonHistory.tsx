import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";

interface FighterHistory {
  _id:string;
  jetModel?:string;
  mission?:string;
  totalCO2:number;
  createdAt:string;
}

const CarbonHistory:React.FC=()=>{
const [data,setData]=useState<FighterHistory[]>([]);
const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchHistory=async()=>{
      try {
        const result=await api.get("/api/fighter/fighterjethistory");
        setData(result.data?.data || []);
      } catch(error){
        console.log("History error:",error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  },[]);

  const getColor=(value:number)=>{
  if(value<5000) 
    return "text-green-400";    
  if(value<20000) 
    return "text-yellow-400";   
  return "text-red-500";                       
};

  return (
    <motion.div
      initial={{ opacity:0, y:15 }}
      animate={{ opacity:1, y:0 }}
      className="w-full h-[380px] p-4 rounded-2xl bg-black/90 border border-white/10 shadow-xl flex flex-col">
      <h2 className="text-green-400 font-semibold text-base mb-3 flex items-center gap-2">✈️ Fighter Mission History</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {loading && (
          <p className="text-gray-400 text-sm">Loading missions...</p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-gray-400 text-sm"> No missions recorded yet</p>
        )}
        {!loading &&data.map((item)=>{
            const dateObj=new Date(item.createdAt);
            const date=dateObj.toLocaleDateString();
            const time=dateObj.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

            return (
              <div
                key={item._id}
                className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                <div className="flex flex-col">
                  <p className="text-green-300 text-sm font-semibold flex items-center gap-2">✈️ {item.jetModel || "Unknown Jet"} • {item.mission || "No Mission"}</p>
                  <p className="text-gray-400 text-xs">{date} • {time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getColor(item.totalCO2)}`}>{Math.round(item.totalCO2 || 0)} kg</p>
                  <p className="text-[10px] text-green-200">CO₂ Emission</p>
                </div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default CarbonHistory;