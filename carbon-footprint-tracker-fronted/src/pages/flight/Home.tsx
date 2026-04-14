import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/flightcarbon/Navbar";
import { serverUrl } from "../../App";
import api from "../../api/axios";
export default function FlightInputPage() {
  const navigate=useNavigate();
  const [form,setForm]=useState({
    tripType:"oneway",
    aircraftType:"",
    aircraftModel:"",
    from:"",
    to:"",
    departureDate:"",
    returnDate:"",
    flightClass:"Economy",
    passengers:1,
  });

  const aircraftOptions={
    aeroplane:["Boeing 737","Airbus A320","Boeing 777"],
    helicopter:["Robinson R44","Bell 206","Airbus H125"],
  };

  const handleSubmit=async()=>{
  try{
    const result=await api.post(`${serverUrl}/api/flight/calculateflightcarbon`,
      {
        from:form.from,
        to:form.to,
        passengers:form.passengers,
        seatClass:form.flightClass,
      }
    );
    const data=result.data;
    navigate("/flightresult",{state:data.data});
  } catch(error){
    console.error("Error:",error);
   }
};

  const handleAircraftChange=(e)=>{
    const value=e.target.value;
    if(value==="fighterjet") {
      navigate("/fighter-jet");
      return;
    }
    setForm({...form,aircraftType:value,aircraftModel:""});
  };
  const handleChange=(e)=>{setForm({ ...form,[e.target.name]:e.target.value })};
  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white flex flex-col">
      <Navbar variant="fligthhome" />
      <div className="w-full max-w-5xl bg-[#0d0d0d] border border-green-500/10 rounded-3xl mt-5 shadow-[0_0_40px_rgba(34,197,94,0.15)] p-10  mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8 tracking-wider"> CARBON FOOTPRINT TRACKER</h1>
        {/* Trip Type */}
        <div className="flex justify-center gap-4 mb-10">
          {["oneway","roundtrip"].map((type)=>(
            <button
              key={type}
              onClick={()=>setForm({ ...form,tripType:type})}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                form.tripType===type
                  ? "bg-green-500 text-black shadow-lg"
                  : "border-green-500/20 hover:bg-green-500/10"
              }`}
            >
              {type ==="oneway" ? "One Way" : "Round Trip"}
            </button>
          ))}
        </div>

        {/* Aircraft */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-400">Aircraft Type</label>
            <select
              value={form.aircraftType}
              onChange={handleAircraftChange}
              className="input"
            >
              <option value="">Select Aircraft</option>
              <option value="aeroplane">Aeroplane</option>
              <option value="helicopter">Helicopter</option>
              <option value="fighterjet">Fighter Jet</option>
            </select>
          </div>

          {/* Fighter jet pe model hide */}
          {form.aircraftType && form.aircraftType !== "fighterjet" && (
            <div>
              <label className="text-sm text-gray-400">Aircraft Model</label>
              <select name="aircraftModel" value={form.aircraftModel} onChange={handleChange} className="input">
                <option value="">Select Model</option>
                {aircraftOptions[form.aircraftType]?.map((m)=>(<option key={m}>{m}</option>))}
              </select>
            </div>
          )}
        </div>

        {/* SAME UI BELOW (unchanged) */}
        <div className="grid md:grid-cols-2 gap-6">
          <input name="from" placeholder="Departure" onChange={handleChange} className="input" />
          <input type="date" name="departureDate" onChange={handleChange} className="input" />
          <input name="to" placeholder="Arrival" onChange={handleChange} className="input" />
          {form.tripType === "roundtrip" && (<input type="date" name="returnDate" onChange={handleChange} className="input" />)}
          <select name="flightClass" onChange={handleChange} className="input">
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
          <div className="flex items-center border py-2 border-green-500/20 rounded-xl overflow-hidden">
            <button onClick={()=>setForm({ ...form,passengers:Math.max(1,form.passengers- 1)})}className="px-4 text-green-400">-</button>
            <div className="flex-1 text-center">{form.passengers} </div>
            <button onClick={()=>setForm({ ...form, passengers: form.passengers + 1})}className="px-4 text-green-400">+</button>
          </div>
        </div>
        <button className="w-full mt-10 bg-green-500 text-black py-3 rounded-xl font-semibold" onClick={handleSubmit}>
          CALCULATE FOOTPRINT</button>
      </div>
      <style>{`.input {width: 100%; margin-top: 8px; padding: 12px; background: black; border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; }`}</style>
    </div>
  );
}