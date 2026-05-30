import {SiReact,SiTypescript,SiNodedotjs,SiMongodb,SiRedis,SiTailwindcss,SiGoogle,} from "react-icons/si";
import { ShieldCheck, Database, ServerCog,} from "lucide-react";
export default function TechStack() {
  const stack=[
    {
      name:"React",
      icon:<SiReact size={28} />,
      color:"text-cyan-400",
    },

    {
      name:"TypeScript",
      icon:<SiTypescript size={28} />,
      color:"text-blue-400",
    },

    {
      name:"Node.js",
      icon:<SiNodedotjs size={28} />,
      color:"text-green-400",
    },

    {
      name:"Express",
      icon:<ServerCog size={28} />,
      color:"text-gray-300",
    },

    {
      name:"MongoDB",
      icon:<SiMongodb size={28} />,
      color:"text-green-500",
    },

    {
      name:"Redis",
      icon:<SiRedis size={28} />,
      color:"text-red-400",
    },

    {
      name:"Gemini AI",
      icon:<SiGoogle size={28} />,
      color:"text-purple-400",
    },

    {
      name:"TailwindCSS",
      icon:<SiTailwindcss size={28} />,
      color:"text-sky-400",
    },

    {
      name:"JWT Auth",
      icon:<ShieldCheck size={28} />,
      color:"text-orange-400",
    },

    {
      name:"REST APIs",
      icon:<Database size={28} />,
      color:"text-pink-400",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-16 md:py-24 px-3 sm:px-6 text-white">
      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[220px] md:w-[350px] h-[220px] md:h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full pointer-events-none border border-green-500/20 bg-green-500/10 text-green-400 text-[11px] sm:text-sm mb-4 sm:mb-6">Technology Stack</div>
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">Built with Modern Technologies</h2>
          <p className="mt-4 sm:mt-6 text-gray-400 text-xs sm:text-base md:text-lg leading-relaxed">
            Powering CarbonTrack with a modern full-stack architecture,
            AI-driven intelligence, scalable cloud services,
            and enterprise-grade sustainability analytics.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6 mt-8 md:mt-20">
          {stack.map((tech,index)=>(
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] p-3 sm:p-6 md:p-8 hover:border-green-500/20 hover:-translate-y-1  hover:shadow-lg hover:shadow-green-500/10 transition-all duration-500 ease-out">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`${tech.color} scale-90 sm:scale-100`}>{tech.icon}</div>
             <h3 className="mt-2 sm:mt-4 text-[11px] sm:text-sm md:text-base font-semibold">{tech.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-20 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Engineered for scalability, security, performance, and real-time sustainability intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}