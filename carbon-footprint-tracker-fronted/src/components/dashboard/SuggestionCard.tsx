import React from "react";
import { motion } from "framer-motion";

const SuggestionCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // ultra smooth easing
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative w-80 h-40 p-3 rounded-2xl text-center 
      
      bg-gradient-to-br from-[#020617]/90 via-[#0f172a]/90 to-[#1e293b]/90
      backdrop-blur-2xl border border-blue-500/10
      
      shadow-[0_20px_60px_rgba(0,0,0,0.7)]
      hover:shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.25)]
      
      transition-all duration-500 overflow-hidden"
    >

      {/* 🌊 Smooth floating ambient glow */}
      <motion.div
        animate={{ x: ["-50%", "50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-[-50%] w-[200%] h-full 
        bg-gradient-to-r from-transparent via-blue-400/10 to-transparent 
        rotate-12 blur-2xl pointer-events-none"
      />

      {/* 🔵 bottom glow pulse */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-full h-6 
        bg-blue-500/30 blur-2xl"
      />

      {/* 🌌 gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-400/5 to-transparent" />

      {/* 🧠 Title */}
      <div className="relative text-gray-200 font-semibold text-left mb-1 tracking-wide">
        AI Suggestions
      </div>

      {/* ⚡ Advanced Divider */}
      <div className="relative mt-1">

        {/* animated line */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />

        {/* glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 
          bg-blue-400 blur-xl opacity-40"
        />
      </div>

      {/* ✨ subtle breathing effect */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-blue-400"
      />

    </motion.div>
  );
};

export default SuggestionCard;