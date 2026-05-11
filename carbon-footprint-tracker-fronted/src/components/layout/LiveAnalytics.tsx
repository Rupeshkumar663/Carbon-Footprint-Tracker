import { useEffect, useState } from "react";
import api from "../../api/axios";
export default function LiveAnalytics() {
  const [data, setData]=useState({
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
    };
    fetchData();
  },[]);

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6"> Real-Time Sustainability Analytics</div>
          <h2 className="text-5xl font-bold tracking-[-2px]">Unified Carbon Intelligence</h2>
          <p className="mt-5 text-gray-400 text-lg">
            Live environmental monitoring across
            transportation,
            aviation,
            and defense ecosystems.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 hover:border-green-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-3xl">
              </div>
              <h3 className="mt-8 text-2xl font-semibold">Vehicle CO₂</h3>
              <p className="mt-6 text-5xl font-bold">{Math.round(data.vehicle)}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 hover:border-cyan-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl">
              </div>
              <h3 className="mt-8 text-2xl font-semibold">Flight CO₂</h3>
              <p className="mt-6 text-5xl font-bold">{Math.round(data.flight)}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 hover:border-orange-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl">
              </div>
              <h3 className="mt-8 text-2xl font-semibold">Defense CO₂</h3>
              <p className="mt-6 text-5xl font-bold">{Math.round(data.fighter)}</p>
              <span className="text-gray-400 mt-3 block">kg CO₂</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}