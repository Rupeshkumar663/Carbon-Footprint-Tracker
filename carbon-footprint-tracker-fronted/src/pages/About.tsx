import {Brain, Shield, Plane, Car, Globe, Cpu, Lock, Radar, ArrowRight, Stars} from "lucide-react"
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TechStack from "../components/layout/TechStack";

export default function About(){
  const navigate=useNavigate();
  const systems=[
    {
      title:"Vehicle Intelligence",
      icon:<Car size={34} />,
      color:"text-green-400",
      description:"Real-time vehicle emission analytics, eco scoring, and sustainability monitoring infrastructure.",
    },
    {
      title:"Flight Analytics",
      icon:<Plane size={34} />,
      color:"text-cyan-400",
      description:"Advanced aviation sustainability analytics with intelligent fuel and emission monitoring.",
    },
    {
      title:"Defense AI",
      icon:<Shield size={34} />,
      color:"text-orange-400",
      description:"Military sustainability intelligence platform for fighter mission carbon analytics.",
    },
  ];

  const architecture=[

    {
      title:" AI Engine",
      icon:<Brain size={34} />,
      color:"text-green-400",
      description:"AI-powered sustainability intelligence and environmental recommendation systems.",
    },
    {
      title:"Real-Time Monitoring",
      icon:<Radar size={34} />,
      color:"text-cyan-400",
      description:"Live carbon intelligence infrastructure across transportation ecosystems.",
    },
    {
      title:"Scalable APIs",
      icon:<Cpu size={34} />,
      color:"text-orange-400",
      description:"Enterprise-grade backend systems optimized for analytics and sustainability monitoring.",
    },
    {
      title:"Secure Platform",
      icon:<Lock size={34} />,
      color:"text-purple-400",
      description:"JWT authentication and protected APIs built with scalable infrastructure.",
    },
  ];

  return (
    <MainLayout>
      <div className="bg-black text-white overflow-hidden min-h-screen">
        <section className="relative overflow-hidden px-6 pt-36 pb-32">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-medium mb-8">AI Sustainability Intelligence Platform</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-3px] leading-[1.02] max-w-5xl mx-auto"> Building Smarter
              <span className="text-green-400">{" "}Environmental{" "}</span>Intelligence
            </h1>
      
            <p className="mt-8 text-gray-400 text-xl leading-relaxed max-w-4xl mx-auto">
              CarbonTrack is an AI-powered sustainability
              intelligence platform designed to monitor,
              analyze,
              and optimize carbon emissions across
              transportation,
              aviation,
              and defense ecosystems.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap justify-center gap-5 mt-12">
              <button  onClick={()=>navigate("/overviewdashboard")}
                className="group px-8 py-4 rounded-2xl bg-green-500 text-black text-lg font-semibold hover:bg-green-400 transition-all duration-300 flex items-center gap-3 shadow-[0_10px_30px_rgba(34,197,94,0.25)]">Launch Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
              </button>

              <button onClick={()=>navigate("/")}
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300 text-lg font-semibold">
                Back to Home
              </button>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="px-6 py-28">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Our Mission</div>
              <h2 className="text-5xl font-bold tracking-[-2px] leading-tight"> Creating Intelligent Sustainability Infrastructure</h2>
              <p className="mt-8 text-gray-400 text-lg leading-relaxed">
                Modern transportation and aviation systems
                generate significant environmental impact.
                CarbonTrack was built to provide intelligent
                sustainability analytics using AI-powered
                monitoring and real-time environmental intelligence.
              </p>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                The platform combines enterprise-grade dashboards,
                carbon intelligence systems,
                AI recommendations,
                and scalable monitoring infrastructure
                into one unified sustainability ecosystem.
              </p>
            </div>

            <div className="relative rounded-[36px] border border-white/10 bg-[#0B0B0B] p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-52 h-52 bg-green-500/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Globe className="text-black" size={40}/>
                </div>
                <h3 className="mt-10 text-3xl font-semibold"> Unified Carbon Intelligence</h3>
                <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                  Real-time environmental analytics platform
                  integrating transportation,
                  aviation,
                  and defense intelligence systems.
                </p>
    
                <div className="grid grid-cols-2 gap-5 mt-10">
                  <div className="rounded-2xl border border-white/10 bg-black p-5">
                    <h4 className="text-green-400 text-3xl font-bold">AI</h4>
                    <p className="text-gray-400 mt-2 text-sm">Intelligence Engine</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black p-5">
                    <h4 className="text-cyan-400 text-3xl font-bold">Live</h4>
                    <p className="text-gray-400 mt-2 text-sm"> Monitoring Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEMS */}
        <section className="bg-[#050505] py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Sustainability Systems</div>
              <h2 className="text-5xl font-bold tracking-[-2px]">Unified Intelligence Modules</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {systems.map((system,index)=>(
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0B0B] p-10 hover:border-green-500/20 transition-all duration-500">
                  <div className="relative z-10">
                    <div className={system.color}>{system.icon}</div>
                    <h3 className="mt-8 text-2xl font-semibold">{system.title}</h3>
                    <p className="mt-5 text-gray-400 leading-relaxed">{system.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Platform Architecture</div>
              <h2 className="text-5xl font-bold tracking-[-2px]">Enterprise Infrastructure</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {architecture.map((item,index)=>(
                <div
                  key={index}
                  className="rounded-[30px] border border-white/10 bg-[#0B0B0B] p-8 hover:border-green-500/20 transition-all duration-500">
                  <div className={item.color}>{item.icon}</div>
                  <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="bg-[#050505] py-28 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">Technology Stack</div>
            <h2 className="text-5xl font-bold tracking-[-2px]"> Modern Production Technologies</h2>
            <div className="flex flex-wrap justify-center gap-5 mt-16">
              <TechStack/>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32">
          <div className="max-w-5xl mx-auto text-center rounded-[40px] border border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-16">
            <Stars className="mx-auto text-green-400" size={48} />
            <h2 className="mt-8 text-5xl font-bold tracking-[-2px] leading-tight">Launch the AI Sustainability Platform</h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Explore enterprise-grade sustainability analytics,
              AI-powered carbon intelligence,
              and real-time environmental monitoring systems.
            </p>
            <button  onClick={()=>navigate("/overviewdashboard")}
              className="mt-10 group px-10 py-5 rounded-2xl bg-green-500 text-black text-lg font-semibold hover:bg-green-400 transition-all duration-300 flex items-center gap-3 mx-auto shadow-[0_10px_30px_rgba(34,197,94,0.25)]">Launch Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}