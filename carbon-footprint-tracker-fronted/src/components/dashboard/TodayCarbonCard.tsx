import React, { useEffect, useState } from "react";
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
    <div className="relative px-25 py-12 rounded-2xl text-center bg-black backdrop-blur-2xl borderoverflow-hidden">
      <div className="absolute top-0 left-[-50%] w-[200%] h-[100%] bg-gradient-to-r from-transparent to-transparent rotate-12 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
      <p className="text-green-400 font-bold text-1xl mb-3 tracking-wide">Today Carbon</p>
      <h2 className="text-green-300 text-3xl font-bold tracking-wide">{formatCarbon(todayCarbon)} kg CO₂</h2>
    </div>
  );
};
export default TodayCarbonCard;