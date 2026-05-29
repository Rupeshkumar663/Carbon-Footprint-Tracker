import {Brain,Stars,Radar,Cpu,ArrowUpRight,} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AIFeatures(){
  const [metrics, setMetrics]=useState({
    recommendations:0,
    forecasts:0,
    liveSystems:0,
    analytics:0,
  });

  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchMetrics=async()=>{
      try {
        const vehicleRes=await api.get("/api/carbon/carbontotal");
        const flightRes=await api.get("/api/flight/gettotalco2");
        const fighterRes=await api.get("/api/fighter/fighterjet");
        const recommendations=Math.round((vehicleRes.data?.data?.ecoScore || 0) * 12);
        const forecasts=(flightRes.data?.data ?.totalFlights || 0) * 3;
        const liveSystems=(fighterRes.data?.data ?.missions || 0) +(flightRes.data?.data ?.totalFlights || 0);
        const analytics=(vehicleRes.data?.data ?.totalCO2 || 0) +( flightRes.data?.data?.totalCO2 || 0) +( fighterRes.data?.data ?.totalCO2 || 0 );

        setMetrics({ recommendations,forecasts,liveSystems,analytics: Math.round(analytics),});
      } catch(error){
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchMetrics();
  },[]);

  const features=[
    {
      title:"AI Sustainability Insights",
      description:"AI-powered sustainability recommendations and environmental optimization intelligence.",
      metric: `${metrics.recommendations.toLocaleString()} Insights`,
      icon:<Brain size={30} />,
      color:"from-green-400 to-emerald-500",
    },
    {
      title: "Emission Forecasting",
      description: "Predict future environmental impact using intelligent forecasting systems.",
      metric: `${metrics.forecasts.toLocaleString()} Forecasts`,
      icon:<Stars size={30} />,
      color:"from-cyan-400 to-blue-500",
    },
    {
      title:"Real-Time Monitoring",
      description:"Live sustainability infrastructure monitoring across transportation and aerospace systems.",
      metric:`${metrics.liveSystems.toLocaleString()} Active Systems`,
      icon:<Radar size={30} />,
      color:"from-orange-400 to-red-500",
    },
    {
      title:"Enterprise Analytics",
      description:"Enterprise-grade AI analytics engine for sustainability intelligence.",
      metric:`${metrics.analytics.toLocaleString()} kg Processed`,
      icon:<Cpu size={30} />,
      color:"from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 px-4 sm:px-6 text-white">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">AI Sustainability Suite</div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-[-1px] md:tracking-[-2px] leading-tight">AI Sustainability Intelligence</h2>
          <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Advanced AI infrastructure for real-time carbon monitoring,
          predictive analytics, and sustainability intelligence.
          </p>
        </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {features.map(
            (feature,index)=>(
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0B0B] p-6 sm:p-8 hover:border-green-500/20 sm:hover:-translate-y-2 transition-all duration-500">
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-10 transition duration-500`}/>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-black shadow-lg`}>
                      {feature.icon}
                    </div>
                    <ArrowUpRight className="hidden sm:block text-gray-600 group-hover:text-white transition" size={22}/>
                  </div>
                  <h3 className="mt-8 text-xl sm:text-2xl font-semibold leading-tight">{feature.title}</h3>
                  <p className="mt-5 text-gray-400 leading-relaxed">{feature.description}</p>
                  <div className="mt-8">
                    {loading ? (<div className="h-8 w-32 rounded bg-white/10 animate-pulse" />
                    ) : (
                      <h4 className="text-3xl font-bold text-white">{feature.metric}</h4>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-20 rounded-[36px] border border-white/10 bg-[#0B0B0B] p-6 sm:p-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <p className="text-green-400 text-sm"> AI MODEL</p>
              <h3 className="mt-4 text-xl sm:text-3xl font-bold"> Neural Intelligence Core </h3>
            </div>
            <div>
              <p className="text-cyan-400 text-sm"> SYSTEM TYPE</p>
              <h3 className="mt-4 text-xl sm:text-3xl font-bold">Real-Time Analytics</h3>
            </div>
            <div>
              <p className="text-purple-400 text-sm"> PLATFORM MODE</p>
              <h3 className="mt-4 text-xl sm:text-3xl font-bold"> Unified Sustainability Platform</h3>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
}