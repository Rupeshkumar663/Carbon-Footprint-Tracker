import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { serverUrl } from "../../App";
const TodayCarbonCard:React.FC=()=>{
  const [todayCarbon,setTodayCarbon]=useState(0);
  const fetchTodayCarbon=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/carbon`);
      const records=res.data.data || [];
      const today=new Date();
      today.setHours(0,0,0,0);
      const todayData=records.filter((item:any)=>{
        const date=new Date(item.createdAt);
        return date>=today;
      });
      const total=todayData.reduce((sum:number,item:any) =>sum+(item.carbonEmission || 0),0);
      setTodayCarbon(Math.round(total));
    } catch(error){
      console.log("Today carbon error:",error);
    }
  };
  useEffect(()=>{
    fetchTodayCarbon();
  },[]);
 const formatCarbon=(value:number)=>{
    const format=(num:number)=>num%1===0 ? num.toString():num.toFixed(2);
    if(value>=10000000) 
      return `${format(value / 10000000)}Cr`;
    if(value>=100000) 
      return `${format(value / 100000)}L`;
    if(value>=1000) 
      return `${format(value / 1000)}k`;
    return value.toString();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      whileHover={{ y: -3 }}
      className="relative px-24 py-3 rounded-2xl text-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden"
    >
      <div className="absolute top-0 left-[-50%] w-[200%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent"></div>
      <p className="text-gray-300 font-semibold text-2xl mb-3 tracking-wide">Today Carbon</p>
      <h2 className="text-white text-3xl font-bold tracking-wide">{formatCarbon(todayCarbon)} kg CO₂</h2>
    </motion.div>
  );
};
export default TodayCarbonCard;