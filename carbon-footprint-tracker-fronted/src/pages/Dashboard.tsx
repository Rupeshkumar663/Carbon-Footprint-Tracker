import React from "react";
import { Header } from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import graph from "../assets/graph.jpeg";
import RouteTrack from "../components/dashboard/RouteTrack";
import EcoScore from "../components/dashboard/EcoScore";
import LineChartComponent from "../components/dashboard/LineChartComponent";
import BarChartComponent from "../components/dashboard/BarChartComponent";


function Dashboard() {
  return (
    <div className="relative w-full h-screen">
      <img src={graph} alt="graph" className=" min-h-screen bg-cover bg-center"/>
      <div className="absolute top-0 left-0 w-full">
        <Header />
        <div className="flex gap-3 justify-center items-start ">
         <StatCard  value="45.6 kg"/>
         <EcoScore score={80}/>
          <RouteTrack  value="12"/>
        </div>

        <div className="flex gap-1 justify-center items-start mt-3">
         <LineChartComponent />
         <BarChartComponent/>
      </div>
      </div>


      
    </div>
  );
}
export default Dashboard;
