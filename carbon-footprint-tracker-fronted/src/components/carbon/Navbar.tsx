import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { IoMdHome } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { LayoutDashboard } from "lucide-react";
import { DropdownItemProps, NavbarProps } from "../../types/carbonTypes";

export default function Navbar({ variant }:NavbarProps){
  const [open,setOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false); 
  useEffect(()=>{
  if(menuOpen){
    document.body.style.overflow="hidden";
  } else {
    document.body.style.overflow="auto";
  }

  return ()=>{
    document.body.style.overflow="auto";
  };
 },[menuOpen]);
  const ref=useRef<HTMLDivElement>(null);
  const { userData }=useSelector((state:RootState)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    const handleClick=(e: MouseEvent)=>{
      if(ref.current && !ref.current.contains(e.target as Node)){
        setOpen(false);
      }
    };
    document.addEventListener("mousedown",handleClick);
    return ()=>document.removeEventListener("mousedown",handleClick);
  },[]);

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-3 sm:px-5 lg:px-8 h-16 bg-black/80 backdrop-blur-xl border-b border-white/10 relative z-50">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
        Carbon<span className="text-green-400">Track</span>
      </h1>

      <div className="hidden md:flex items-center gap-6">
        <span onClick={()=>navigate("/")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">Home</span>
        {(variant==="inputpage"||variant==="carbonemissionpage") && <span onClick={()=>navigate("/dashboard")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">Vehicledashboard</span>}
         
        {variant==="inputpage"&& <span onClick={()=>navigate("/flighthome")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">FlightInput</span>}

        {variant==="inputpage"&& <span onClick={()=>navigate("/fighter-jet")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">FighterjetInput</span>}
        
        {variant==="carbonemissionpage" && <span onClick={()=>navigate("/inputpage")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">VehicleInput</span>}

        {variant==="vehicledashboard" && <span onClick={()=>navigate("/inputpage")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">VehicleInput</span>}

        {variant==="overview" && <span onClick={()=>navigate("/inputpage")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">Vehicle</span>}

         {variant==="overview" && <span onClick={()=>navigate("/flighthome")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">Flight</span>}

         
         {variant==="overview" && <span onClick={()=>navigate("/fighter-jet")} className="text-gray-300 text-sm font-medium hover:text-green-400 cursor-pointer transition-colors">Fighter</span>}

      </div>
      <div className="flex items-center gap-4">
        {/* mobile menu */}
        <button type="button" className="md:hidden text-green-400 text-xl p-2 rounded-lg hover:bg-white/5"onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
        {/* profile */}
        <div className="relative" ref={ref}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold cursor-pointer" onClick={()=>setOpen(!open)}>
            {userData?.photoUrl ? (
              <img src={userData.photoUrl} alt="Profile" className="w-full h-full object-cover rounded-full"/>
            ):(
              userData?.name?.slice(0,1).toUpperCase()
            )}
          </div>

          {/* dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 mt-3 w-52 bg-[#0B0B0B] border border-white/10 rounded-2xl shadow-xl text-sm">
                               <DropdownItem icon={<LayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/overviewdashboard")}/>} text="Overview" />
                               <DropdownItem  icon={<User size={18} className="font-semibold text-green-600" onClick={()=>navigate("/profile")}/>} text="My Profile" />

                                <DropdownItem icon={<IoMdHome size={18} className="font-semibold text-green-600" onClick={()=>navigate("/")}/>} text="Home" />

                                <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/flightdashboard")}/>} text="FlightDash" />

                                <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/fighterdashboard")}/>} text="Fighterdash" />

                               
                                <DropdownItem icon={<LogOut size={18} className="font-semibold text-green-600" onClick={handleLogout}/>} text="Logout" danger />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
           className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-[#050505] backdrop-blur-xl border-t border-white/10 md:hidden z-[9999]">
          <div className="flex flex-col gap-2 p-4 text-sm overflow-y-auto h-full">
          <span onClick={()=>{ navigate("/overviewdashboard"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Overview</span>

          <span onClick={()=>{navigate("/profile"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Profile</span>

           <span onClick={()=>{navigate("/"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Home</span>

          {(variant==="inputpage" || variant==="carbonemissionpage") && (
           <span onClick={()=>{ navigate("/dashboard"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Vehicledashboard</span>)}

          {variant==="inputpage"  && (
          <span onClick={()=>{ navigate("/flighthome"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">FlightInput</span>)}

          {variant==="inputpage" && (
           <span onClick={()=>{navigate("/fighter-jet"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">FighterjetInput</span>)}

         {variant==="carbonemissionpage" && (
          <span onClick={()=>{navigate("/inputpage"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">VehicleInput</span>)}

         {variant==="vehicledashboard" && (
          <span onClick={()=>{navigate("/inputpage"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">VehicleInput</span>)}

         {(variant==="fighterdashboard" || variant==="flightdashboard") && (
          <span onClick={()=>{navigate("/fighter-jet"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">FighterjetInput</span>)}

         {(variant==="fighterdashboard" || variant==="flightdashboard") && (
          <span onClick={()=>{navigate("/flighthome"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">FlightInput</span>)}

         {variant==="fighterjet" && (
          <span onClick={()=>{ navigate("/fighterdashboard"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Fighterdashboard</span>)}

         {(variant==="flightHome" || variant==="flightresult") && (
          <span onClick={()=>{navigate("/flightdashboard");setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Flightdashboard</span>)}
         
          {variant==="overview" && (
          <span onClick={()=>{ navigate("/inputpage"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Vehicle</span>)}

         {variant==="overview" && (
          <span onClick={()=>{ navigate("/flighthome"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Flight</span>)}

           {variant==="overview" && (
          <span onClick={()=>{ navigate("/fighter-jet"); setMenuOpen(false);}}className="w-full text-center py-3 rounded-lg bg-white/[0.02] border border-white/5 text-gray-300 hover:text-green-400 hover:border-green-500/20 active:scale-[0.98] transition-all">Fighter</span>)}
        </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
}

function DropdownItem({icon,text,danger,onClick }:DropdownItemProps){
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-300 hover:bg-white/5"}`}>{icon} <span>{text}</span>
    </div>
  );
}