import { useEffect, useState } from "react";
import api from "../../api/axios";
export default function LiveAnalytics(){
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState({
    vehicle:0,
    flight:0,
    fighter:0,
  });

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const vehicle=await api.get("/api/carbon/carbontotal");
        const flight=await api.get("/api/flight/gettotalco2");
        const fighter=await api.get("/api/fighter/fighterjet");
        setData({
          vehicle:vehicle.data?.data?.totalCO2 || 0,
          flight:flight.data?.data?.totalCO2 || 0,
          fighter:fighter.data?.data?.totalCO2 || 0,
        });
      } catch(error){
        console.log(error);
      }
      finally{
       setLoading(false);
     }
    };
    fetchData();
  },[]);

  return (
     <section className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 hover:border-green-500/40  sm:hover:-translate-y-2 bg-green-500/10 text-green-400 text-sm mb-6">⚡ Live Carbon Intelligence</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-2px]">Unified Carbon Intelligence</h2>
          <p className="mt-5 text-gray-400 text-sm sm:text-base">
           Real-time emissions monitoring across vehicles, flights, and fighter jets.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 sm:p-8 hover:border-green-500/30 sm:hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              
              <h3 className="text-xl sm:text-2xl font-semibold">Vehicle CO₂</h3>
              <p className="mt-6 text-3xl sm:text-5xl font-bold">{loading?"...":Math.round(data.vehicle).toLocaleString()}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 sm:p-8 hover:border-cyan-500/30 sm:hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              
              <h3 className="text-xl sm:text-2xl font-semibold">Flight CO₂</h3>
              <p className="mt-6 text-3xl sm:text-5xl font-bold">{loading?"...":Math.round(data.flight).toLocaleString()}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 sm:p-8 hover:border-orange-500/30 sm:hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold">Fighter Jet CO₂</h3>
              <p className="mt-6 text-3xl sm:text-5xl font-bold">{loading ? "...":Math.round(data.fighter).toLocaleString()}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}