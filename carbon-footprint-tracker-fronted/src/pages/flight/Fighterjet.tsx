import { useState, ChangeEvent } from "react";
import Navbar from "../../components/carbon/Navbar";
import { FormType } from "../../types/carbonTypes";
import Footer from "../../components/flightcarbon/Footer";

export default function FighterJetPage(){
  const [form,setForm]=useState<FormType>({
    jetModel:"",
    hours:"",
    mission:"",
    payload:"",
    altitude:"",
    speed:"",
  });

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

  const handleSubmit=()=>{
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar variant="fighterjet" />
      <div className="flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-green-900 rounded-2xl p-8 space-y-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
          <h1 className="text-5xl font-bold text-green-400 mb-10 text-center">Fighter Jet Input</h1>
          <select
            name="jetModel"
            value={form.jetModel}
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Fighter Jet</option>
            {fighterJets.map((jet)=>(<option  key={jet} value={jet}>{jet}</option>))}
          </select>

          <input
            type="number"
            name="hours"
            value={form.hours}
            placeholder="Flight Hours (e.g. 1.5)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"/>

          <select
            name="mission"
            value={form.mission}
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Mission Type</option>
            {missionTypes.map((m)=>(<option key={m} value={m}>{m}</option>))}
          </select>

          <input
            type="number"
            name="payload"
            value={form.payload}
            placeholder="Payload Weight (kg)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"/>

          <input
            type="number"
            name="altitude"
            value={form.altitude}
            placeholder="Flight Altitude (feet)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="speed"
            value={form.speed}
            placeholder="Average Speed (km/h)"
            onChange={handleChange}
            className="w-full p-4 bg-black border border-green-900 rounded-xl text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-black font-semibold py-4 rounded-xl hover:bg-green-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            Calculate Fighter jet Carbon
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

