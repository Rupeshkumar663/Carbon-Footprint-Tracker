import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Route,
  BarChart3,
  Leaf,
  Brain,
  GitCompare
} from "lucide-react";

export default function Sidebar(){

 const location = useLocation();

 const menu = [
  {name:"Dashboard", path:"/", icon:LayoutDashboard},
  {name:"Green Route", path:"/green-route", icon:Route},
  {name:"Route Comparison", path:"/comparison", icon:GitCompare},
  {name:"Analytics", path:"/analytics", icon:BarChart3},
  {name:"AI Insights", path:"/insights", icon:Brain}
 ];

 return(

 <div className="w-72 min-h-screen bg-slate-900/70 backdrop-blur-2xl border-r border-slate-800 flex flex-col p-8">

 {/* Logo */}

 <div className="flex items-center gap-3 mb-12">

 <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-xl">
  <Leaf size={20}/>
 </div>

 <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
  CarbonAI
 </h1>

 </div>

 {/* Menu */}

 <nav className="space-y-4 flex-1">

 {menu.map((item)=>{

 const Icon = item.icon;

 const active = location.pathname === item.path;

 return(

 <Link
 key={item.path}
 to={item.path}
 className={`flex items-center gap-4 p-3 rounded-xl transition-all
 ${
  active
  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20"
  : "text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
 }
 `}
 >

 <Icon size={20}/>

 <span className="font-medium">
  {item.name}
 </span>

 </Link>

 );

 })}

 </nav>

 {/* Footer */}

 <div className="text-xs text-slate-500 mt-10">
  AI Carbon Tracker
 </div>

 </div>

 );

}