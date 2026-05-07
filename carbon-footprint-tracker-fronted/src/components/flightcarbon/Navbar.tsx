import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LeafIcon, Edit, LogOut } from "lucide-react";
import { IoMdHome } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

export default function Navbar({ variant }:any){
  const [open,setOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false); 
  const ref=useRef<HTMLDivElement>(null);
  const { userData }=useSelector((state:RootState)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    const handleClick=(e:any)=>{
      if(ref.current && !ref.current.contains(e.target)){
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
    <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-5 bg-black/80 shadow-sm relative z-50">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        Carbon<span className="text-green-400">Track</span>
      </h1>

      <div className="hidden md:flex items-center gap-10">
        <span onClick={()=>navigate("/")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">Home</span>
        {(variant==="fighterdashboard"||variant==="flightdashboard") &&
          <span onClick={()=>navigate("/fighter-jet")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">FighterjetInput</span>
        }
         
        {(variant==="fighterdashboard"||variant==="flightdashboard") &&<span onClick={()=>navigate("/flighthome")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">FlightInput</span>}

        {variant==="fighterjet" &&<span onClick={()=>navigate("/fighterdashboard")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">Fighterdashboard</span>}

        {variant==="fighterjet" &&<span onClick={()=>navigate("/flighthome")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">FlightInput</span>}

        {(variant==="flightHome" ||variant==="flightresult")&&<span onClick={()=>navigate("/flightdashboard")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">Flightdashboard</span>}
        
        {variant==="flightresult" &&
          <span onClick={()=>navigate("/flighthome")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">FlightInput</span>
        }
        
      </div>
      <div className="flex items-center gap-4">
        {/* mobile menu */}
        <button className="md:hidden text-green-400 text-2xl"onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
        {/* profile */}
        <div className="relative" ref={ref}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-pointer" onClick={()=>setOpen(!open)}>
            {userData?.photoUrl ? (
              <img src={userData.photoUrl} className="w-full h-full object-cover rounded-full"/>
            ):(
              userData?.name?.slice(0,1).toUpperCase()
            )}
          </div>

          {/* dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 mt-3 w-40 bg-gray-900 border rounded-xl shadow-xl text-base font-bold"
              >
                <DropdownItem  icon={<User size={18} className="font-semibold text-green-600" onClick={()=>navigate("/profile")}/>} text="My Profile" />

                                <DropdownItem icon={<IoMdHome size={18} className="font-semibold text-green-600" onClick={()=>navigate("/")}/>} text="Home" />

                               <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/dashboard")}/>} text="VehicleDash" />

                                { (variant==="fighterdashboard" || variant==="fighterjet") && <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/flightdashboard")}/>} text="Flightdash" />}

                                { (variant==="flightdashboard" || variant==="flightHome")  && <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/fighterdashboard")}/>} text="Fighterdash" />}

                               {variant==="inputpage"?"":<DropdownItem icon={<LeafIcon size={18} className="font-semibold text-green-600" onClick={()=>navigate("/inputpage")}/>} text="CarbonInput" />}

                                <DropdownItem icon={<Edit size={18} className="font-semibold text-green-600" onClick={()=>navigate("/editprofile")}/>} text="Edit Profile" />

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
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 md:hidden">
            <div className="flex flex-col items-center gap-5 py-5 text-green-400 font-bold text-lg">
              <span onClick={()=>{navigate("/"); setMenuOpen(false);}}className="cursor-pointer hover:text-green-300">Home</span>

             {(variant==="fighterdashboard" || variant==="flightdashboard") && (
              <span onClick={()=>{ navigate("/fighter-jet"); setMenuOpen(false);}} className="cursor-pointer hover:text-green-300">FighterjetInput</span>)}

             {(variant==="fighterdashboard" || variant==="flightdashboard") && (
             <span onClick={()=>{navigate("/flighthome"); setMenuOpen(false);}} className="cursor-pointer hover:text-green-300">FlightInput</span>)}

            {variant==="fighterjet" && (
             <span onClick={()=>{navigate("/fighterdashboard"); setMenuOpen(false);}} className="cursor-pointer hover:text-green-300">Fighterdashboard</span>)}

            {variant==="fighterjet" && (
             <span onClick={()=>{navigate("/flighthome"); setMenuOpen(false);}}className="cursor-pointer hover:text-green-300">FlightInput</span>)}

            {(variant==="flightHome" || variant==="flightresult") && (
             <span onClick={()=>{ navigate("/flightdashboard"); setMenuOpen(false);}}className="cursor-pointer hover:text-green-300">Flightdashboard</span>)}

            {variant==="flightresult" && (
             <span onClick={()=>{ navigate("/flighthome"); setMenuOpen(false);}}className="cursor-pointer hover:text-green-300">FlightInput</span>)}

           </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function DropdownItem({icon,text,danger,onClick }:any){
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-400 hover:bg-gray-800"}`}>{icon} <span>{text}</span>
    </div>
  );
}