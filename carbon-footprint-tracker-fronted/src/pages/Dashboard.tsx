import StatCard from "../components/dashboard/StatCard";
import EmissionChart from "../components/dashboard/EmmisionChart";
import { motion } from "framer-motion";

export default function DashboardPage(){

 return(

 <div className="space-y-12">

 {/* Heading */}

 <motion.h1
 initial={{opacity:0,y:20}}
 animate={{opacity:1,y:0}}
 transition={{duration:0.6}}
 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
 >
 Carbon Intelligence Dashboard
 </motion.h1>

 {/* Stats */}

 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

 <StatCard
  title="Total CO₂"
  value="24.5 kg"
 />

 <StatCard
  title="Green Score"
  value="88%"
 />

 <StatCard
  title="Routes"
  value="14"
 />

 <StatCard
  title="Trees Covered"
  value="120 🌳"
 />

 </div>

 {/* Chart Section */}

 <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">

 <h2 className="text-xl font-semibold text-slate-200 mb-6">
 Emission Analytics
 </h2>

 <EmissionChart/>

 </div>

 </div>

 );

}