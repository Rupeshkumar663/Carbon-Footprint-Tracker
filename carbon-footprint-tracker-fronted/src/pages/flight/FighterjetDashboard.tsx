import { useEffect, useState } from "react";
import EcoScore from "../../components/fighterdashboard/Escore";
import EmissionBreakdown from "../../components/fighterdashboard/EmissionBreakdown";
import GlobalImpact from "../../components/fighterdashboard/GlobalImpact";
import TodayCarbonCard from "../../components/fighterdashboard/TodayCarbonCard";
import Navbar from "../../components/flightcarbon/Navbar";
import DailyBarChart from "../../components/fighterdashboard/DailyBarchart";
import MonthlyLineChart from "../../components/fighterdashboard/MonthlyLineChart";
import api from "../../api/axios";
import CarbonHistory from "../../components/fighterdashboard/CarbonHistory";
import AdvancedPDF from "../../components/fighterdashboard/AdvancedPDF";
import SmartEmissionCard from "../../components/fighterdashboard/SmartEmissionCard";
import Footer from "../../components/layout/Footer";
export default function FighterDashboard() {
  const [totalCO2,setTotalCO2]=useState(0);
  const [ecoScore,setEcoScore]=useState(0);
  const [impact,setImpact]=useState({
  trees:0,
  jetFuel:0,
  fighterHours:0, 
  earthTrips:0,
  });
  const [todayCO2,setTodayCO2]=useState(0);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
       const res = await api.get("/api/fighter/fighterjet");
        const data=res.data?.data || res.data;
        setTotalCO2(data?.totalCO2 || 0);
        setEcoScore(data?.ecoScore ?? 0);
        setImpact(
          data?.impact || {
            trees:0,
            jetFuel:0,
            fighterHours:0,
            earthTrips:0,
          }
        );
        const todayRes=await api.get("/api/fighter/fighterjettoday");
        setTodayCO2(todayRes.data?.data?.todayCO2 || 0);
      } catch(error){
        console.log("Dashboard error:",error);
      }
    };
    fetchData();
  },[]);

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar variant="fighterdashboard" />
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-2xl text-green-400 sm:text-4xl font-bold">Fighter Jet Analytics Dashboard</h1>
        <p className="text-green-200 mt-2 max-w-2xl">Monitor fighter jet emissions, environmental impact and sustainability metrics.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-black border border-white/10 p-5 sm:p-6 rounded-3xl text-center shadow-lg hover:border-green-500/20 transition-all duration-300">
          <p className="text-green-400 text-sm sm:text-base font-semibold"> Total CO₂</p>
          <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl text-green-200 font-bold break-words">{Math.round(totalCO2).toLocaleString()}</h2>
         <p className="text-gray-400 mt-2">kg CO₂</p>
        </div>
        <div className="bg-black border border-white/10 p-5 sm:p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg hover:border-green-500/20 transition-all duration-300">
          <p className="text-green-400 font-semibold mb-4 text-sm sm:text-base">Eco Score</p>
          <EcoScore score={ecoScore} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
        <TodayCarbonCard total={todayCO2} />
        <SmartEmissionCard />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
        <MonthlyLineChart />
        <DailyBarChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        <div className="bg-black border border-white/10 p-5 rounded-3xl shadow-lg">
          <EmissionBreakdown total={totalCO2} />
        </div>
        <div className="w-full" >
          <CarbonHistory />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        <GlobalImpact total={totalCO2} impact={impact} />
        <AdvancedPDF />
      </div>
      <Footer/>
    </div>
  );
}