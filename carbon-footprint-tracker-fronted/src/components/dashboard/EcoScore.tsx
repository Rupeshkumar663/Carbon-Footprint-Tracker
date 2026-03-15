import React from "react";
import { motion } from "framer-motion";
interface Props {
  score: number;
}
const EcoScore:React.FC<Props>=({score})=>{
  const radius=85;
  const stroke=15;
  const circumference=Math.PI*radius;
  const progress=(score/100)*circumference;
  return (
    <div
      className="relative w-[320px] h-[160px] flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/10
      rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
      <svg width="220" height="120" viewBox="0 0 220 120">
        {/* background arc */}
        <path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke="#1f2937"
          strokeWidth={stroke}
        />
        {/* grey remaining */}
        <path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke="#d1d5db"
          strokeWidth={stroke}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={progress}
        />
        {/* green progress */}
        <motion.path
          d="M20 100 A85 85 0 0 1 200 100"
          fill="none"
          stroke="#4ade80"
          strokeWidth={stroke}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference}
          animate={{strokeDashoffset:circumference-progress}}
          transition={{ duration: 1.2,ease:"easeOut"}}
        />
      </svg>
      {/* center score */}
      <div className="absolute bottom-6 text-center">
         <p className="relative  text-gray-300 font-semibold text-1xl  tracking-wide">Eco Score</p>
        <h2 className="text-white text-5xl font-bold">{score}%</h2>
      </div>
    </div>
  );
};
export default EcoScore;
