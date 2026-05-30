import { Activity, Plane, Shield, Leaf, TrendingUp, Globe, Radar,Sparkles, Car,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/carbon/Navbar";
import Footer from "../components/layout/Footer";

export default function OverviewDashboard(){
  const navigate=useNavigate();
  const [loading,setLoading]=useState(true);
  const [overviewData,setOverviewData]=
      useState({
      totalCO2:0,
      ecoScore:0,
      flights:0,
      missions:0,
    });

  const [weeklyData,setWeeklyData]=useState<number[]>([]);
  useEffect(()=>{
    const fetchOverviewData=async()=>{
      try {
        const vehicleRes=await api.get("/api/carbon/carbontotal");
        const flightRes=await api.get("/api/flight/gettotalco2");
        const fighterRes=await api.get("/api/fighter/fighterjet");
        const vehicleWeekly=await api.get("/api/carbon/carbonweekly");
        const flightWeekly=await api.get("/api/flight/getdailychart");
        const fighterWeekly=await api.get("/api/fighter/fighterjetweekly");
        const vehicleCO2=vehicleRes.data?.data?.totalCO2 || 0;
        const flightCO2=flightRes.data?.data?.totalCO2 || 0;
        const fighterCO2=fighterRes.data?.data?.totalCO2 || 0;
        const globalCO2=vehicleCO2 +flightCO2 +fighterCO2;
        const avgEcoScore=Math.round(
          (
            (vehicleRes.data?.data?.ecoScore || 0) +
            (flightRes.data?.data?.ecoScore || 0) +
            (fighterRes.data?.data?.ecoScore || 0)
          ) / 3
        );
    const vehicleArray =vehicleWeekly.data?.data || [];
    const flightArray=flightWeekly.data?.data || [];
    const fighterArray=fighterWeekly.data?.data || [];
    const combinedWeekly=[0,0,0,0,0,0,0];
    for(let i=0;i<7;i++){
      combinedWeekly[i]=
    (
      vehicleArray[i]?.total || 0
    ) +
    (
      flightArray[i]?.total || 0
    ) +
    (
      fighterArray[i]?.total || 0
    );
  }

    const maxValue=Math.max(...combinedWeekly,1);
    const normalizedData=combinedWeekly.map(value=>Math.max((value/maxValue)*100,15));
    setWeeklyData(normalizedData);
        setOverviewData({
          totalCO2:globalCO2,
          ecoScore:avgEcoScore,
          flights:flightRes.data?.data?.totalFlights || 0,
          missions:fighterRes.data?.data?.missions || 0,
        });
      } catch(error){
        console.log("Overview Dashboard Error:",error);
      } finally{
        setLoading(false);
      }
    };
    fetchOverviewData();
  },[]);

  const stats=[
    {
      title:"Global CO₂",
      value:`${Math.round(overviewData.totalCO2).toLocaleString()} kg`,
      icon:<Leaf size={26} />,
      color:"from-green-400 to-emerald-500",
    },
    {
      title:"Flights Tracked",
      value:overviewData.flights.toLocaleString(),
      icon:<Plane size={26} />,
      color:"from-cyan-400 to-blue-500",
    },
    {
      title:"Fighter Missions",
      value:overviewData.missions.toLocaleString(),
      icon:<Shield size={26} />,
      color:"from-orange-400 to-red-500",
    },
    {
      title:"Global EcoScore",
      value:`${overviewData.ecoScore}/100`,
      icon:<Globe size={26} />,
      color:"from-purple-400 to-pink-500",
    },
  ];

  const insights=[
    `Combined emissions reached ${Math.round(overviewData.totalCO2).toLocaleString()} kg CO₂.`,
    `${overviewData.flights} commercial flights tracked in flight analytics.`,
    `${overviewData.missions} fighter jet missions analyzed for emission tracking.`,
    `Current global EcoScore stabilized at ${overviewData.ecoScore}/100.`,
  ];

  if(loading){
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-400 text-2xl font-bold">Loading Carbon Intelligence...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#07120d] to-[#050505] text-white overflow-hidden">
      <Navbar variant="overview"/>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-16 pb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">AI Powered</div>

              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm">Live Intelligence</div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-[-1px] sm:tracking-[-2px] leading-tight max-w-2xl">Unified Carbon
              <span className="text-green-400">{" "}Intelligence{" "}</span>Dashboard
            </h1>

            <p className="text-gray-400 mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              AI-powered sustainability analytics across vehicles, flights, and fighter jet operations
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-center w-[150px] h-[150px] rounded-full border border-green-500/20 bg-green-500/5 shadow-[0_0_40px_rgba(34,197,94,0.08)]">
            <Radar size={70} className="text-green-400 animate-pulse"/>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((item,index)=>(
            <div key={index} className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 hover:border-green-500/20 transition-all duration-300 group" >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-3"> {item.title}</p>
                  <h2 className="text-xl sm:text-3xl font-bold tracking-tight">{item.value}</h2>
                </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-black shadow-lg group-hover:scale-105 transition-all duration-300`}>{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 min-h-[320px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold"> Weekly Emission Analytics</h2>
                <p className="text-gray-400 text-sm mt-1">Combined sustainability trend</p>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <TrendingUp size={18} />Live Data
              </div>
            </div>

            {/* GRAPH */}
            <div className="h-[200px] sm:h-[280px] rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent border border-white/5 flex items-end gap-1 sm:gap-3 px-3 sm:px-5 pb-5 overflow-hidden">
              {weeklyData.map((height,i)=>(
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-green-500 to-emerald-400 hover:brightness-110 transition-all duration-300 hover:opacity-80 transition-all"
                    style={{
                      height:`${height}%`,
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* AI INSIGHTS */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Insights</h2>
                <p className="text-gray-400 text-sm">Live intelligence system</p>
              </div>
            </div>
            <div className="space-y-4">
              {insights.map((item,index)=>(
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4 hover:border-green-500/20 transition-all">
                  <div className="flex items-start gap-3">
                    <Activity size={18} className="text-green-400 mt-1"/>
                    <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VEHICLE */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 hover:border-green-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black shadow-lg mb-6 group-hover:scale-105 transition-all duration-300">
              <Car size={26} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Vehicle Intelligence</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Analyze fuel efficiency, mileage,
              emissions, and sustainability metrics.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-2.5 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition-all duration-300">
              Open Vehicle Dashboard
            </button>
          </div>

          {/* FLIGHT */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 hover:border-cyan-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black shadow-lg mb-6 group-hover:scale-105 transition-all duration-300">
              <Plane size={26} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">flight Analytics</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Track commercial flight emissions,
              fuel burn, and eco-efficiency insights.
            </p>
            <button
              onClick={() => navigate("/flightdashboard")}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all duration-300">Open Flight Dashboard
            </button>
          </div>

          {/* DEFENSE */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 sm:p-6 hover:border-orange-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-black shadow-lg mb-6 group-hover:scale-105 transition-all duration-300">
              <Shield size={26} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Fighter Jet Analytics</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Advanced fighter jet analytics,
              mission fuel intelligence,
              and defense monitoring.
            </p>

            <button
              onClick={() => navigate("/fighterdashboard")}
              className="w-full py-2.5 rounded-xl bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-all duration-300">Open Fighter Dashboard
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}