import { motion } from "framer-motion";
export default function EcoScore({ score }:{ score:number }){
  const radius=70;
  const stroke=10;
  const normalized=Math.max(0,Math.min(100,score));
  const circumference=2*Math.PI*radius;
  const offset=circumference-(normalized/100)*circumference;
  const getLabel=()=>{
    if(normalized>=85) 
      return "Excellent";
    if(normalized>=60) 
      return "Good";
    if(normalized>=40) 
      return "Average";
    return "Poor";
  };
  const label=getLabel();
  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      <svg  width="160" height="160" className="sm:w-[180px] sm:h-[180px]">
        <defs>
          <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1f2937"
          strokeWidth={stroke}
          fill="transparent"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#ecoGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          initial={{ strokeDashoffset:circumference }}
          animate={{ strokeDashoffset:offset }}
          transition={{ duration:1.2,ease:"easeInOut" }}
          style={{filter:"drop-shadow(0 0 10px rgba(34,197,94,0.6))"}}
        />
      </svg>
      {/* Center */}
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-400">{normalized}</h2>
        <p className="text-[11px] sm:text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}