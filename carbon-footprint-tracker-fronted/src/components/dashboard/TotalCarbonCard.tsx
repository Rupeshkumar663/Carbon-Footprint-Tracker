import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { serverUrl } from "../../App";
const TotalCarbonCard:React.FC=()=>{
  const [totalCarbon,setTotalCarbon]=useState(0);
  const fetchTotal=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/carbon`);
      const records=res.data.data || [];
      const total=records.reduce((sum:number,item:any)=>sum +(item.carbonEmission || 0),0);
      setTotalCarbon(Math.round(total));
    } catch(error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchTotal();
  }, []);

  const formatCarbon=(value:number)=>{
    const format=(num:number)=>
      num % 1===0 ? num.toString():num.toFixed(2);
    if(value>=10000000) 
      return `${format(value/10000000)}Cr`;
    if(value>=100000) 
      return `${format(value/100000)}L`;
    if(value>=1000)
       return `${format(value/1000)}k`;
    return value.toString();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{type:"spring",stiffness:80,damping:18}}
      whileHover={{ y: -3 }}
      className="relative px-20 py-3 rounded-2xl text-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent"></div>
        <p className="relative  text-gray-300 font-semibold text-2xl mb-3 tracking-wide">Total Carbon</p>
        <h2 className=" relative text-green-400 text-3xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(74,122,128,0.9)] ">{formatCarbon(totalCarbon)} kg CO₂</h2>
    </motion.div>
  );
};
export default TotalCarbonCard;
