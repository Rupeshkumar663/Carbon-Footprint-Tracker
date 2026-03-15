import React from "react";
import { Header } from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import graph from "../assets/graph.jpeg";
import RouteTrack from "../components/dashboard/RouteTrack";
import EcoScore from "../components/dashboard/EcoScore"

function Dashboard() {
  return (
    <div className="relative w-full h-screen">
      <img src={graph} alt="graph" className="w-full h-screen object-cover"/>
      <div className="absolute top-0 left-0 w-full">
        <Header />
        <div className="flex gap-8 justify-center items-start">
         <StatCard  value="45.6 kg"/>
         <EcoScore score={80}/>
          <RouteTrack  value="12"/>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
