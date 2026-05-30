import MainLayout from "../components/layout/MainLayout";
import AIAssistant from "../components/layout/AIAssistant";
import SystemStatus from "../components/layout/SystemStatus";
import Footer from "../components/layout/Footer";
import { motion} from "framer-motion";
import {ArrowRight,Brain,Shield,Plane,Car,Sparkles,} from "lucide-react";
import {useNavigate,} from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";

export default function Home(){

  const navigate=useNavigate();
  const [stats,setStats]=useState({
  totalCO2:0,
  flights:0,
  missions:0,
  ecoScore:0,
});
useEffect(()=>{
  const fetchStats=async()=>{
    try {
      const vehicleRes=await api.get( "/api/carbon/carbontotal");
      const flightRes=await api.get("/api/flight/gettotalco2");
      const fighterRes=await api.get("/api/fighter/fighterjet");
      const totalCO2=(vehicleRes.data?.data?.totalCO2 || 0 ) +( flightRes.data?.data?.totalCO2 || 0 ) +(  fighterRes.data?.data?.totalCO2 || 0 );
      setStats({totalCO2,
        flights:flightRes.data?.data?.totalFlights || 0,
        missions:fighterRes.data?.data?.missions || 0,
        ecoScore:Math.round(
            (
              (
                vehicleRes.data?.data?.ecoScore || 0
              ) +
              (
                flightRes.data?.data?.ecoScore || 0
              ) +
              (
                fighterRes.data?.data?.ecoScore || 0
              )
            ) / 3
          ),
      });

    } catch(error){
      console.log(error);
    }
  };
  fetchStats();
},[]);
  const systems=[
    {
      title:"Vehicle Intelligence",
      description:"Real-time transportation carbon tracking with AI sustainability optimization systems.",
      icon:<Car size={22} />,
      color:"from-green-400 to-emerald-500",
    },
    {
      title:"Flight Analytics",
      description:"Advanced aviation emission analytics powered by live sustainability intelligence.",
      icon:<Plane size={22} />,
      color:"from-cyan-400 to-blue-500",
    },
    {
      title:"Defense AI",
      description:"Military-grade fighter jet environmental intelligence and mission sustainability analysis.",
      icon:<Shield size={22} />,
      color:"from-orange-400 to-red-500",
    },
  ];
  return (
    <MainLayout>
  
      <div className="bg-black text-white overflow-x-hidden">
       <section className="relative min-h-auto md:min-h-screen flex items-center px-3 sm:px-6 overflow-x-hidden">
          <div className="absolute top-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-green-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[220px] md:w-[450px] h-[220px] md:h-[450px] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-10 items-center">
            <motion.div
              initial={{
                opacity:0,
                y:40,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                duration:0.7,
              }}
            >

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs sm:text-sm font-medium">
                <Sparkles size={16} /> Carbon  Intelligence</div>
              {/* TITLE */}
              <h1 className="mt-8 text-xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold tracking-[-2px] md:tracking-[-3px] leading-[1.05]"> AI-Powered Carbon
                <span className="block text-green-400">Intelligence Platform</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">Real-time carbon analytics for transportation,aviation, and defense systems.</p>

              {/* BUTTONS */}
           <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={()=>navigate("/overviewdashboard")} className="group px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-green-500 text-black font-semibold text-sm sm:text-base flex items-center gap-3 hover:bg-green-400 transition-all duration-300 shadow-[0_10px_30px_rgba(34,197,94,0.25)]">Launch Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button onClick={()=> navigate("/about") } className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base font-semibold">Learn More
                </button>
              </div>

           <div className="grid grid-cols-2 gap-3 mt-5">
            <div>
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
             {Math.round( stats.totalCO2).toLocaleString()} kg</h3>
             <p className="text-gray-500 mt-2">Total CO₂ Tracked</p></div>
            <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.flights + stats.missions}</h3>
          <p className="text-gray-500 mt-2">Operations Analyzed</p>
          </div>
         </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
              }}
              className="relative">
            <div className="relative rounded-xl border border-white/10 bg-[#0B0B0B] p-1 sm:p-2 md:p-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-[100px] rounded-full" />
                {/* AI ASSISTANT */}
                <AIAssistant />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-x-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs sm:text-sm mb-4">Enterprise AI Systems</div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-[-2px]">Enterprise AI Systems</h2><p className="mt-6 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed"> CarbonTrack combines multiple environmental intelligence systems into one scalable sustainability platform.
              </p>
             </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-20">
              {systems.map((system,index)=>(
                  <motion.div
                    key={index}
                    initial={{
                      opacity:0,
                      y:40,
                    }}
                    whileInView={{
                      opacity:1,
                      y:0,
                    }}
                    viewport={{
                      once:true,
                    }}
                    transition={{
                      duration:0.5,
                      delay:
                        index * 0.1,
                    }}
                   className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-5 hover:border-green-500/20 transition-all duration-500">

                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${system.color} blur-3xl opacity-0 group-hover:opacity-10 transition duration-500`} />

                    <div className="relative z-10">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center text-black shadow-lg`}>{system.icon}</div>
                      <h3 className="mt-4 text-base sm:text-lg font-semibold"> {system.title}</h3>
                      <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">{system.description}</p>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>
        <SystemStatus />
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center rounded-xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 sm:p-5 md:p-6 overflow-x-hidden relative">
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto shadow-[0_10px_40px_rgba(34,197,94,0.25)]">
                <Brain className="text-black" size={38} />
              </div>

              <h2 className="mt-6 text-xl sm:text-3xl md:text-4xl font-bold tracking-[-2px] leading-tight">Launch Carbon Intelligence</h2>
              <p className="mt-6 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                Access enterprise-grade environmental analytics,
                real-time carbon monitoring,
                and AI-powered sustainability systems.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <button onClick={()=>navigate("/overviewdashboard" )}
                  className="group px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-green-500 text-black text-sm sm:text-base font-semibold hover:bg-green-400 transition-all duration-300 flex items-center gap-3 shadow-[0_10px_30px_rgba(34,197,94,0.25)]"
                >Launch Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button onClick={()=>navigate("/about")} 
                  className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base font-semibold">Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </MainLayout>
  );
}