import { useEffect, useState } from "react";
import EcoScore from "../components/dashboard/EcoScore";
import EmissionBreakdown from "../components/dashboard/EmissionBreakdown";
import GlobalImpact from "../components/dashboard/GlobalImpact";
import TodayCarbonCard from "../components/dashboard/TodayCarbonCard";
import Navbar from "../components/carbon/Card";
import DailyBarChart from "../components/dashboard/DailyBarChart";
import MonthlyLineChart from "../components/dashboard/MonthlyLineChart";
import CarbonHistory from "../components/dashboard/CarbonHistory";
import AdvancedPDF from "../components/dashboard/AdvancedPDF";
import SmartEmissionCard from "../components/dashboard/SmartEmissionCard";
import Footer from "../components/layout/Footer";
import api from "../api/axios";
export default function CarbonDashboard(){
  const [totalCO2,setTotalCO2]=useState(0);
  const [ecoScore,setEcoScore]=useState(0);
  const [impact,setImpact]=useState({
    trees:0,
    vehicleDuration:0,
    earthTrips:0,
   });
  const [todayCO2,setTodayCO2]=useState(0);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await api.get("/api/carbon/carbontotal");
        const data=res.data?.data || res.data;
        setTotalCO2(data?.totalCO2 || 0);
        setEcoScore(data?.ecoScore || 0);
        setImpact(
          data?.impact || {
            trees:0,
            jetFuel:0,
            flightHours:0,
            earthTrips:0,
          }
        );
        const todayRes=await api.get("/api/carbon/carbontoday");
        setTodayCO2(todayRes.data?.data?.todayCO2 || 0);
      } catch(error){
        console.log("Dashboard error:",error);
      }
    };
    fetchData();
  },[]);

  return (
   <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar variant="carbondashboard" />
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8 mt-5">
       <div className="bg-black p-4 sm:p-6 rounded-2xl text-center">
          <p className="text-green-400 text-sm sm:text-base font-semibold"> Total CO₂</p>
          <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl text-green-200 font-bold break-words">{Math.round(totalCO2).toLocaleString()} kg</h2>
        </div>
        <div className="bg-black border border-white/10 min-h-[320px] p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg">
          <p className="text-green-400 font-semibold mb-4 text-sm sm:text-base">EcoScore</p>
          <EcoScore score={ecoScore} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
        <TodayCarbonCard total={todayCO2} />
        <SmartEmissionCard />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
        <MonthlyLineChart />
        <DailyBarChart />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-black p-4 rounded-xl">
          <EmissionBreakdown total={totalCO2} />
        </div>
        <div className="w-full" >
          <CarbonHistory />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6 pb-10">
        <GlobalImpact total={totalCO2} impact={impact} />
        <AdvancedPDF />
      </div>
      <Footer/>
    </div>
  );
}