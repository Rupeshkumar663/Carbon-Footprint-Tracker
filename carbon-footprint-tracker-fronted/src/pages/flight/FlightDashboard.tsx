import EcoScore from "../../components/flightdashboard/EcoScore";
import EmissionBreakdown from "../../components/flightdashboard/EmissionBreakdown";
import TimelineChart from "../../components/flightdashboard/TimelineChart";
import GlobalImpact from "../../components/flightdashboard/GlobalImpact";
import AdvancedPDF from "../../components/flightdashboard/AdvancedPDF";
import TodayCarbonCard from "../../components/flightdashboard/TodayCarbonCard";
import TotalCarbonCard from "../../components/flightdashboard/TotalCarbonCard";
import Navbar from "../../components/carbon/Navbar";
import DailyBarChart from "../../components/flightdashboard/DailyBarChart";
import MonthlyLineChart from "../../components/flightdashboard/MonthlyLineChart";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { serverUrl } from "../../App";
import CarbonHistory from "../../components/dashboard/CarbonHistory";

export default function Dashboard(){
   const [totalCO2,setTotalCO2]=useState(0);
  const [ecoScore,setEcoScore]=useState(0);
  const [impact,setImpact]=useState({
    trees:0,
    jetFuel:0,
    flightHours:0,
    earthTrips:0,
  });
  const [todayCO2,setTodayCO2]=useState(0);
   useEffect(()=>{
  const fetchData=async()=>{
    try {
      const res=await api.get(`${serverUrl}/api/flight/gettotalco2`,{ withCredentials: true });
      const data=res.data?.data;
      setTotalCO2(data?.totalCO2 || 0);
      setEcoScore(data?.ecoScore || 0);
      setImpact(data?.impact || {});
      const todayRes=await api.get(`${serverUrl}/api/flight/gettodayco2`,{ withCredentials: true });
      setTodayCO2(todayRes.data?.data?.todayCO2 || 0);
    } catch(error){
      console.log("Dashboard error:", error);
    }
  };
  fetchData();
},[]);
  
  
  return (
    <div className=" min-h-screen bg-gradient-to-br bg-gray-900 text-white max-w-[1600px] mx-auto ">
      {/* NAVBAR */}
      <Navbar variant="flightdashboard" />

      

      {/* HERO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        {/* Total CO2 */}
        <div className="bg-black p-6 sm:p-8 rounded-2xl">
          <p className="text-green-400 font-semibold text-center text-sm sm:text-base">
            Total CO₂
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-center text-green-200 font-bold break-words">
            {totalCO2} kg
          </h2>
        </div>

        {/* EcoScore */}
        <div className="bg-black p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-green-400 font-semibold text-center mb-6">
            EcoScore
          </p>

          <EcoScore score={ecoScore} />
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <TodayCarbonCard total={todayCO2} />
        <TotalCarbonCard total={totalCO2} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <MonthlyLineChart />
        <DailyBarChart />
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <div className="bg-black"><EmissionBreakdown total={totalCO2} /></div>
        <div className="w-[500px]"><CarbonHistory/></div>
      </div>

      {/* EXTRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-5">
        <GlobalImpact total={totalCO2} impact={impact} />
        {/*<AdvancedPDF/> */}
      </div>

      <style>{`
        .glass {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,197,94,0.2);
        }
      `}</style>
    </div>
  );
}