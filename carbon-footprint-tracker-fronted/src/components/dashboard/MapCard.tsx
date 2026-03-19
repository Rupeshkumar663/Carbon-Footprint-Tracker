import React from "react";
import { motion } from "framer-motion";
    
const MapCard:React.FC=()=>{
  return (
    <motion.div
      initial={{opacity:0,y:25}}
      animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:80,damping:18}}
      whileHover={{y:-3}}
      className="relative w-100 h-40 p-3 rounded-2xl text-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 left-[-50%] w-[200%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-green-400/25 blur-2xl opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent"></div>
      <p className="relative text-gray-300 font-semibold text-left mb-1 tracking-wide">Route Map</p>
      
    </motion.div>
  );
};
export default MapCard;