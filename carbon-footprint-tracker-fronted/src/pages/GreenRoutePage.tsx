import { useState } from "react";
import RouteCard from "../components/routes/RouteCard";

export default function GreenRoutePage(){

 const [startLocation,setStartLocation]=useState("");
 const [endLocation,setEndLocation]=useState("");
 const [route,setRoute]=useState<any>(null);

 const handleFindRoute=async()=>{

  if(!startLocation || !endLocation){
   alert("Enter start and end location");
   return;
  }

  // temporary dummy route
  const fakeRoute={
   distance:"12 km",
   duration:"20 min",
   carbonSaved:"0.5 kg CO2"
  };

  setRoute(fakeRoute);

 };

 return(

 <div>

 <h1 className="text-3xl font-bold mb-8">
 AI Green Route Finder 🌳
 </h1>

 <div className="grid grid-cols-3 gap-6 mb-10">

 <input
  placeholder="Start Location"
  value={startLocation}
  onChange={(e)=>setStartLocation(e.target.value)}
  className="p-4 bg-gray-100 rounded-xl"
 />

 <input
  placeholder="End Location"
  value={endLocation}
  onChange={(e)=>setEndLocation(e.target.value)}
  className="p-4 bg-gray-100 rounded-xl"
 />

 <button
  onClick={handleFindRoute}
  className="bg-emerald-500 rounded-xl font-bold"
 >
 Find Eco Route
 </button>

 </div>

 {route && <RouteCard route={route}/>}

 </div>

 );

}