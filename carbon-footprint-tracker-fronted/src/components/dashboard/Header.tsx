import React from "react";
import { motion } from "framer-motion";
export const Header:React.FC=()=>{
  return (
    <header className="w-full flex justify-center items-center mb-2">
      <motion.div
        initial={{ opacity:0,y:-40 }}
        animate={{ opacity:1,y:0 }}
        transition={{type:"spring",stiffness:70, damping:18}}
        whileHover={{y:-2}}
        className="relative w-full max-w-7xl bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out hover:shadow-[0_30px_80px_rgba(0,0,0,0.85)] flex items-center justify-center before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/before:via-transparent before:to-white/5 before:opacity-40 before:pointer-events-none">
        <motion.h1
          initial={{opacity:0,letterSpacing:"0.2em"}}
          animate={{opacity:1,letterSpacing:"0.05em"}}
          transition={{duration:0.9,ease:"easeOut"}}
          className="text-3xl md:text-4xl font-semibold text-white tracking-wide drop-shadow-sm">Carbon Footprint Tracker
        </motion.h1>
      </motion.div>
    </header>
  );
};
