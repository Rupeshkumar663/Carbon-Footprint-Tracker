import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/flightcarbon/Navbar";
import Footer from "../../components/flightcarbon/Footer";
import { FighterData } from "../../types/carbonTypes";
import { useEffect } from "react";

export default function FlightResult(){
  const { state }=useLocation();
  const navigate=useNavigate();
  const data:FighterData | null=(state as FighterData) ||JSON.parse(localStorage.getItem("fighterResult") || "null");

  useEffect(()=>{
    if(state){
      localStorage.setItem("fighterResult",JSON.stringify(state));
    }
  },[state]);

  if(!data){
    return (
      <div className="text-white flex justify-center items-center h-screen">No Data Found</div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar variant="flightresult"/>
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-[#0d0d0d]/80 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(34,197,94,0.25)] transition-all duration-500">
          <h1 className="text-3xl text-center text-green-400 font-semibold mb-8">Carbon Footprint Result</h1>
         <div className="grid grid-cols-2 gap-y-10 gap-x-6 bg-black/40 p-8 rounded-2xl border border-green-500/10">
          <div className="col-span-2 text-center">
            <p className="text-green-400 text-sm">Jet Model</p>
            <h2 className="text-white text-3xl font-bold mt-2">{data.jetModel}</h2>
          </div>
          <div className="text-center">
           <p className="text-green-300 text-sm">Distance</p>
           <p className="text-lg text-green-100 font-semibold mt-2">{data?.distance} km</p>
         </div>
         <div className="text-center">
          <p className="text-green-300 text-sm">Mission</p>
          <p className="text-lg text-green-100 font-semibold mt-2">{data?.mission}</p>
         </div>
         <div className="text-center">
          <p className="text-green-300 text-sm">Speed</p>
          <p className="text-lg text-green-100 font-semibold mt-2">{data?.speed} km/h</p>
         </div>
         <div className="text-center">
          <p className="text-green-300 text-sm"> Hours</p>
          <p className="text-lg text-green-100 font-semibold mt-2">{data?.hours} hours</p>
         </div>
         <div className="text-center">
          <p className="text-green-300 text-sm">Altitude</p>
          <p className="text-lg text-green-100 font-semibold mt-2">{data?.altitude}</p>
         </div>
         <div className="text-center">
          <p className="text-green-300 text-sm">Payload</p>
          <p className="text-lg text-green-100 font-semibold mt-2">{data?.payload} kg</p>
         </div>
        </div>

          <div className="text-center mt-8">
            <p className="text-green-300 text-sm">Total Emission</p>
            <h2 className="text-5xl text-green-500 font-bold mt-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">{data?.totalCO2} kg CO₂</h2>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center mb-2">
              <p className="text-green-200 text-sm">Eco Score</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  state.ecoScore > 70? "bg-green-500/20 text-green-400": state.ecoScore >40 ? "bg-yellow-500/20 text-yellow-300":"bg-red-500/20 text-red-400"}`}>
                {state.ecoScore > 70 ? "Eco Friendly 🌱":state.ecoScore > 40 ? "Moderate ⚠️":"High Emission"}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${data.ecoScore > 70 ? "bg-green-500":state.ecoScore >40 ? "bg-yellow-400":"bg-red-500"}`}style={{ width:`${data.ecoScore}%`}}
              ></div>
            </div>
            {/* Score */}
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>0</span>
              <span className="text-green-400 font-semibold">{Math.round(data.ecoScore)}/100</span>
              <span>100</span>
            </div>
          </div>
          <div className="mt-8 bg-black/40 border border-green-500/10 p-6 rounded-xl">
            <p className="text-green-300 font-semibold mb-4 text-lg">💡 Smart AI Insights</p>
            <div className="space-y-3">
              {data.aiAdvice && data.aiAdvice.length> 0 ? (
                   data.aiAdvice.map((tip,i)=>(
                      <div
                      key={i}
                      className="flex gap-3 p-3 rounded-lg bg-[#0f0f0f] border border-green-500/10">
                     <span className="text-green-400">✔</span>
                     <p className="text-gray-300 text-sm">{tip}</p>
               </div>
               ))
              ) : (
             <p className="text-gray-400 text-sm">No AI insights available</p>)}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2 border border-green-500/30 rounded-xl hover:bg-green-500/10">Back</button>
            <button onClick={() => navigate("/")} className="px-6 py-2 bg-green-500 text-black rounded-xl hover:scale-105 transition">New</button>
          </div>
        </div>
      </div>
      <button className="bg-red-400" onClick={()=>navigate("/fighterdashboard")}>FighterDashboard</button>
      <Footer/>
    </div>
  );
}