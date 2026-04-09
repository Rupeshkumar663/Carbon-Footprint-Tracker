import React, { useEffect, useState } from "react";
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
    <div className="relative px-25 py-12 rounded-2xl text-center bg-black backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden">
        <p className="relative  text-green-400 font-bold text-3xl mb-3 tracking-wide">Total Carbon</p>
        <h2 className=" relative text-green-300 text-3xl font-bold tracking-wide ">{formatCarbon(totalCarbon)} kg CO₂</h2>
    </div>
  );
};
export default TotalCarbonCard;
