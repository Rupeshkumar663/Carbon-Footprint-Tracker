import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ApiData, SystemItem } from "../../types/carbonTypes";

export default function SystemStatus(){
  const [systems,setSystems]=useState<SystemItem[]>([]);
  const [loading, setLoading]=useState<boolean>(true);
  useEffect(()=>{
    const fetchSystemStatus=async()=>{
      setLoading(true);
      let vehicleData:ApiData | null=null;
      let flightData:ApiData | null=null;
      let fighterData:ApiData | null=null;

      try {
        const res=await api.get("/api/carbon/carbontotal");
        vehicleData=res.data?.data || null;
      } catch(error){
        console.log("Vehicle API Error:",error);
      }

      try {
        const res=await api.get("/api/flight/gettotalco2");
        flightData=res.data?.data || null;
      } catch(error){
        console.log("Flight API Error:",error);
      }
      try {
        const res=await api.get("/api/fighter/fighterjet");
        fighterData=res.data?.data || null;
      } catch(error){
        console.log("Fighter API Error:",error);
      }
      const dynamicSystems:SystemItem[]=[
        {
          name:"Carbon Analytics API",
          status:vehicleData ? "Operational":"Limited",
          metric: vehicleData
              ? `${Math.round(
                  vehicleData.totalCO2 || 0
                ).toLocaleString()} kg tracked`
              :"No live data",
          color:vehicleData ? "bg-green-400" :"bg-yellow-400",
        },
        {
          name:"Flight Analytics Engine",
          status:flightData ? "Active" :"Limited",
          metric:flightData ? `${(  flightData.totalFlights || 0 ).toLocaleString()} flight analyses` :"No live data",
          color:flightData ? "bg-cyan-400" :"bg-yellow-400",
        },
        {
          name:"Fighter Jet Monitoring",
          status:fighterData ? "Operational" :"Limited",
          metric:fighterData ? `${( fighterData.missions || 0 ).toLocaleString()} missions processed` :"No live data",
          color:fighterData ? "bg-orange-400" :"bg-yellow-400",
        },

        {
          name:"Infrastructure Monitoring",
          status:"Stable",
          metric:`${( (flightData?.totalFlights || 0) + (fighterData?.missions || 0) ).toLocaleString()} active operations`,
          color:"bg-purple-400",
        },
      ];
      setSystems(dynamicSystems);
      setLoading(false);
    };
    fetchSystemStatus();
  },[]);

  return (
    <section className="relative bg-[#050505] py-12 sm:py-16 md:py-24 px-3 sm:px-6 text-white">
      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
     <div className="absolute bottom-0 right-0 w-[220px] md:w-[350px] h-[220px] md:h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6"> Platform Infrastructure
          </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">Enterprise Sustainability System</h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-time monitoring of vehicle emissions, commercial flight analytics, fighter jet operations, and AI-powered sustainability infrastructure.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-16">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index)=>(
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-[#0B0B0B] p-8 animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-white/10" />
                    <div className="mt-8 h-6 w-40 bg-white/10 rounded" />
                    <div className="mt-4 h-5 w-24 bg-white/10 rounded" />
                    <div className="mt-6 h-8 w-32 bg-white/10 rounded" />
                  </div>
                ))
            : systems.map(
                (system,index)=>(
                  <div
                    key={index}
                    className="group rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 md:p-8 hover:border-green-500/20 transition-all duration-500 ease-out"
                  >
                    <div className="flex items-center justify-between">
                      <Activity className="text-green-400" size={28} />
                      <div className={`w-3 h-3 rounded-full ${system.color} animate-pulse`} />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg md:text-xl font-semibold leading-tight">{system.name}</h3>
                    <p className="mt-4 text-sm text-gray-400 uppercase tracking-wider">{system.status}</p>
                    <div className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-white">{system.metric}</div>
                  </div>
                )
              )}
        </div>
      </div>
    </section>
  );
}