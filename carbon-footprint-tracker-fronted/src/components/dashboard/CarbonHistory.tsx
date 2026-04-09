import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { serverUrl } from "../../App";
import { motion } from "framer-motion";
import { CarbonType } from "../../types/carbonTypes";
const CarbonHistory:React.FC=()=>{
  const [data, setData]=useState<CarbonType[]>([]);
  const fetchHistory=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/carbon`);
      const records=res.data.data || [];
      const sorted=records.sort((a:CarbonType,b:CarbonType)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
      setData(sorted);
    } catch(error){
      console.log("History error:",error);
    }
  };
  useEffect(()=>{
    fetchHistory();
  },[]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[400px] h-[260px] p-3 rounded-xl bg-black backdrop-blur-xl border border-white/10 shadow-lg flex flex-col"
    >
      <p className="text-green-400 text-sm font-semibold mb-2">Carbon History</p>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {data.length===0?(<p className="text-green-300 text-xs">No history</p>) : (
          data.map((item)=>{
            const dateObj=new Date(item.createdAt);
            const date=dateObj.toLocaleDateString();
            const time=dateObj.toLocaleTimeString([],{
              hour:"2-digit",
              minute:"2-digit",
            });
            return (
              <div key={item._id} className="flex justify-between items-center px-2 py-2 rounded-md bg-white/5">
                <div>
                  <p className="text-green-300 text-xs font-medium">{item.startLocation}→{item.endLocation}</p>
                  <p className="text-gray-400 text-[10px]">{date}•{time}</p>
                </div>
                <p className="text-green-400 text-xs font-semibold">{Math.round(item.carbonEmission)} kg</p>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};
export default CarbonHistory;