
import { motion } from "framer-motion";

export default function EcoScore({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160">
        <circle cx="80" cy="80" r={radius} stroke="#1f2937" strokeWidth="10" fill="transparent" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#22c55e"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <h2 className="text-3xl text-green-400 font-bold mt-2">{score}</h2>
    </div>
  );
}

