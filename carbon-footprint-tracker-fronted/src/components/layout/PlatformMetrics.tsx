import {Activity,Plane,Shield,Leaf,ArrowUpRight,} from "lucide-react";
export default function PlatformMetrics() {
  const metrics=[
    {
      title:"Carbon Monitored",
      value:"2.4M+",
      subtitle:"Environmental records processed",
      icon:<Leaf size={30} />,
      color:"from-green-400 to-emerald-500",
    },
    {
      title:"Flights Analyzed",
      value:"18K+",
      subtitle:"Commercial aviation analytics",
      icon:<Plane size={30} />,
      color:"from-cyan-400 to-blue-500",
    },

    {
      title:"Defense Missions",
      value:"3.2K+",
      subtitle:"Defense intelligence tracking",
      icon:<Shield size={30} />,
      color:"from-orange-400 to-red-500",
    },

    {
      title:"AI Requests",
      value:"120K+",
      subtitle:"Gemini AI insights generated",
      icon:<Activity size={30} />,
      color:"from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 px-6 text-white">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Live Platform Metrics</div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-[-2px] leading-tight">Real-Time Sustainability Infrastructure</h2>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Enterprise-grade analytics platform monitoring
            transportation,
            aviation,
            and defense sustainability systems.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {metrics.map((metric,index)=>(
            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0B0B] p-8 hover:border-green-500/20 transition-all duration-500"
            >
             <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${metric.color} blur-3xl opacity-0 group-hover:opacity-10 transition duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-black shadow-lg`}>{metric.icon}</div>
                  <ArrowUpRight className="text-gray-600 group-hover:text-white transition" size={22}/>
                </div>

                <h3 className="mt-10 text-5xl font-bold tracking-tight">{metric.value}</h3>
                <p className="mt-4 text-xl font-semibold">{metric.title}
                </p>
                <p className="mt-3 text-gray-400 leading-relaxed">{metric.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-[36px] border border-white/10 bg-[#0B0B0B] p-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <p className="text-green-400 text-sm">ACTIVE AI ENGINE</p>
              <h3 className="mt-4 text-3xl font-bold"> AI Infrastructure</h3>
            </div>
            <div>
              <p className="text-cyan-400 text-sm"> MONITORING STATUS </p>
              <h3 className="mt-4 text-3xl font-bold"> Real-Time Operational</h3>
            </div>
            <div>
              <p className="text-orange-400 text-sm"> PLATFORM SCALE</p>
              <h3 className="mt-4 text-3xl font-bold">Enterprise Ready</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}