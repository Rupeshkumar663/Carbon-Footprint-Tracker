import { motion } from "framer-motion";
export default function EcoScore({ score }:{ score:number }) {
  const safeScore=Number(score) || 0;
  const normalized=Math.max(0,Math.min(100,Math.round(safeScore)));
  const radius=70;
  const stroke=10;
  const circumference=2*Math.PI*radius;
  const offset=circumference-(normalized/100)*circumference;

  const getColor=()=>{
    if(normalized>=85) 
      return "#22c55e"; 
    if(normalized>=60) 
      return "#eab308"; 
    if(normalized>=40) 
      return "#f97316"; 
    return "#ef4444"; 
  };

  const getLabel=()=>{
    if(normalized>=85) 
      return "Excellent";
    if(normalized>=60) 
      return "Good";
    if(normalized>=40) 
      return "Average";
    return "Poor";
  };

  const color=getColor();
  const label=getLabel();

  return (
    <div className="flex flex-col items-center justify-center relative w-full max-w-[180px] mx-auto">
      <svg viewBox="0 0 180 180" className="w-full h-auto">
        <defs>
          <linearGradient id={`ecoGradient-${normalized}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
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

        {/* Progress */}
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke={`url(#ecoGradient-${normalized})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`
          }}
        />
      </svg>

      {/* Center */}
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color }}>
          {normalized}
        </h2>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}