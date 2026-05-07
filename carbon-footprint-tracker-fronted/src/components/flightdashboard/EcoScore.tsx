import { motion } from "framer-motion";
export default function EcoScore({ score }:{ score:number }){
    console.log("EcoScore prop:", score);
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
    <div className="flex flex-col items-center justify-center relative">
      <svg width="180" height="180">
        <defs>
          <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#1f2937"
          strokeWidth={stroke}
          fill="transparent"
        />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#ecoGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          initial={{ strokeDashoffset:circumference }}
          animate={{ strokeDashoffset:offset }}
          transition={{ duration:1.2,ease:"easeInOut" }}
          style={{filter:"drop-shadow(0 0 10px rgba(34,197,94,0.6))"}}
        />
      </svg>
      {/* Center */}
      <div className="absolute flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-400">{normalized}</h2>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}