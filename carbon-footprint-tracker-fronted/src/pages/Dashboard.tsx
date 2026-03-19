import React, { useEffect, useState } from "react";
import { Header } from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import graph from "../assets/graph.jpeg";
import RouteTrack from "../components/dashboard/RouteTrack";
import EcoScore from "../components/dashboard/EcoScore";
import LineChartComponent from "../components/dashboard/LineChartComponent";
import BarChartComponent from "../components/dashboard/BarChartComponent";
import MapCard from "../components/dashboard/MapCard";
import Heatmap from "../components/dashboard/Heatmap";
import SuggestionCard from "../components/dashboard/SuggestionCard";
import api from "../api/axios";
import { serverUrl } from "../App";

function Dashboard() {
  const [data,setData]=useState(null)
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const Carbon=await api.get(`${serverUrl}/api/carbon/createCarbon`)
        setData(Carbon.data)
      } catch(error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  return (
    <div className="relative w-full h-screen">
      <img src={graph} alt="graph" className=" min-h-screen bg-cover bg-center"/>
      <div className="absolute top-0 left-0 w-full">
        <Header />
        <div className="flex gap-3 justify-center items-start ">
         <StatCard  value={data?.Carbon ?? "0.00 kg"}/>
         <EcoScore score={80}/>
          <RouteTrack  value="12"/>
        </div>

        <div className="flex gap-1 justify-center items-start mt-3">
         <LineChartComponent />
         <BarChartComponent/>
      </div>
         <div className="flex gap-1 justify-center items-start mt-3">
          <MapCard/>
          <Heatmap/>
          <SuggestionCard/>
      </div>
      </div>


      
    </div>
  );
}
export default Dashboard;
