import {Activity,Plane,Shield,Leaf,ArrowUpRight,} from "lucide-react";
import CountUp from "react-countup";
export default function PlatformMetrics() {
  const metrics=[
    {
      title:"Carbon Monitored",
      end:2.4,
      decimals:1,
      suffix:"M+",
      subtitle:"Environmental records processed",
      icon:<Leaf size={30} />,
      color:"from-green-400 to-emerald-500",
    },
    {
     title:"Flights Analyzed",
     end:18,
     suffix:"K+",
     subtitle:"Commercial flight analytics",
     icon:<Plane size={30} />,
     color:"from-cyan-400 to-blue-500",
     },
    {
      title:"Fighter Jets Tracked",
      end:3.2,
      decimals:1,
      suffix:"K+",
      subtitle:"Fighter jet carbon monitoring",
      icon:<Shield size={30} />,
      color:"from-orange-400 to-red-500",
    },
    {
       title:"AI Requests",
       end:120,
       suffix:"K+",
       subtitle:"Gemini AI insights generated",
      icon:<Activity size={30} />,
      color:"from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 md:py-28 px-4 sm:px-6 text-white">
      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[220px] md:w-[350px] h-[220px] md:h-[350px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Live Platform Metrics</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">Real-Time Sustainability Infrastructure</h2>
          <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Advanced carbon intelligence platform for vehicle emissions,
            commercial flight analytics, fighter jet monitoring, and
            AI-driven sustainability reporting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {metrics.map((metric,index)=>(
            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0B0B] p-8 hover:border-green-500/20 hover:-translate-y-2 transition-all duration-500 ease-out"
            >
             <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${metric.color} blur-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 ease-out`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-black shadow-lg`}>{metric.icon}</div>
                  <ArrowUpRight className="text-gray-600 group-hover:text-white transition" size={22}/>
                </div>

                <h3 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  <CountUp
                   end={metric.end}
                   duration={2}
                   decimals={metric.decimals || 0}
                   suffix={metric.suffix}
                   enableScrollSpy
                   scrollSpyOnce
                  />
                </h3>
              <p className="mt-4 text-lg md:text-xl font-semibold">{metric.title}
                </p>
                <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed">{metric.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-[36px] border border-white/10 bg-[#0B0B0B] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div>
              <p className="flex items-center justify-center md:justify-start gap-2 text-green-400 text-sm">
               <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  ACTIVE AI ENGINE
              </p>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold"> AI Infrastructure</h3>
            </div>
            <div>
              <p className="text-cyan-400 text-sm"> MONITORING STATUS </p>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold"> Real-Time Operational</h3>
            </div>
            <div>
              <p className="text-orange-400 text-sm"> PLATFORM SCALE</p>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold">Enterprise Ready</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}