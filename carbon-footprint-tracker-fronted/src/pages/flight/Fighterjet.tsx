import { useState, ChangeEvent } from "react";
import Navbar from "../../components/flightcarbon/Navbar";
import { FormType } from "../../types/carbonTypes";
import Footer from "../../components/flightcarbon/Footer";
import api from "../../api/axios";
import { serverUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function FighterJetPage(){
  const navigate=useNavigate()
  const [form,setForm]=useState<FormType>({
    jetModel:"",
    hours:"",
    mission:"",
    payload:"",
    altitude:"",
    speed:"",
  });
  const [loading,setLoading]=useState(false);
  const fighterJets=[
    "F-16 Fighting Falcon",
    "F-22 Raptor",
    "F-35 Lightning II",
    "SU-57",
    "Rafale",
    "Eurofighter Typhoon",
    "J-20 Mighty Dragon",
    "MiG-29",
    "MiG-35",
    "Tejas LCA",
    "F/A-18 Super Hornet",
    "Mirage 2000",
    "Gripen E",
    "SU-30MKI",
    "F-15 Eagle",
  ];

  const missionTypes=[
    "Training",
    "Combat",
    "Patrol",
    "Reconnaissance",
    "Air Superiority",
    "Ground Attack",
    "Interception",
    "Surveillance",
  ];

  const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name,value}=e.target;
    setForm((prev)=>({...prev,[name]:value}));
  };

   const handleSubmit=async()=>{
  try{
     setLoading(true);
    const result=await api.post(`${serverUrl}/api/fighter/fighterjetcarbon`,
      {
        jetModel:form.jetModel,
        hours:form.hours,
        mission:form.mission,
        payload:form.payload,
        altitude:form.altitude,
        speed:form.speed
      },
      {
        withCredentials:true
      }
    );
    const data=result.data;
    toast.success("Fighter jet emissions calculated successfully");
    navigate("/fighterjetresult",{state:data.data});
  } catch(error){
    toast.error("Unable to calculate emissions");
    console.error("Error:",error);
   } finally{
   setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar variant="fighterjet" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl bg-[#0B0B0B] border border-green-500/20 rounded-3xl p-5 sm:p-8 space-y-6 backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.12)]">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-8 text-center">Fighter Jet Emissions Calculator</h1>
          <select
            name="jetModel"
            value={form.jetModel}
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 appearance-none rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300">
            <option value="">Select Fighter Jet</option>
            {fighterJets.map((jet)=>(<option  key={jet} value={jet}>{jet}</option>))}
          </select>

          <input
            type="number"
            name="hours"
            value={form.hours}
            placeholder="Fighter jet Duration (hours)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 transition-all duration-300 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"/>

          <select
            name="mission"
            value={form.mission}
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 appearance-none transition-all duration-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Mission Type</option>
            {missionTypes.map((m)=>(<option key={m} value={m}>{m}</option>))}
          </select>

          <input
            type="number"
            name="payload"
            value={form.payload}
            placeholder="Payload Weight (kg)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 transition-all duration-300 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"/>

          <input
            type="number"
            name="altitude"
            value={form.altitude}
            placeholder="Fighter jet Altitude (feet)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 transition-all duration-300 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="speed"
            value={form.speed}
            placeholder="Average Speed (km/h)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-500/20 transition-all duration-300 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-4 rounded-xl hover:bg-green-400 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_30px_rgba(34,197,94,0.25)]">Calculate Fighter jet Carbon
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

