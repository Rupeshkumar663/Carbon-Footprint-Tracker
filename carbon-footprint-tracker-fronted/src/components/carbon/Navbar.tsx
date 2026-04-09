import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User,LeafIcon,Edit,LogOut} from "lucide-react";
import { IoMdHome } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
export default function Navbar({variant}){
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  const { userData }=useSelector((state:RootState)=>state.auth);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    const handleClick=(e:any)=>{
      if(ref.current && !ref.current.contains(e.target)){
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return ()=>document.removeEventListener("mousedown",handleClick);
  },[]);

  const handleLogout=()=>{
      dispatch(logout());
      navigate("/");
    };
  
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-black/80 border-green-200 shadow-sm relative z-50">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight">Carbon<span className="text-green-400">Track</span></h1>
       <div className="flex items-center  gap-10">
           <span className="text-green-400 mt-3 font-bold text-2xl hover:text-green-300 " onClick={()=>navigate("/")}>Home</span>
          { variant!=="dash" && <span className="text-green-400 mt-3 font-bold text-2xl hover:text-green-300" onClick={()=>navigate("/dashboard")}>Dashboard</span>}
           <span className="text-green-400 mt-3 font-bold text-2xl hover:text-green-300" onClick={()=>navigate("/inputpage")}>carboninput</span>
       </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={ref}>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-green-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer border-green-300" onClick={()=>setOpen(!open)}>
                 {userData?.photoUrl ? (<img src={userData.photoUrl} alt="profile" className="w-full h-full object-cover" /> ) : ( userData?.name?.slice(0,1).toUpperCase() )}
            </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{opacity: 0,y:-8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.2}}
                className="absolute right-0 mt-3 w-40  bg-gray-900 border rounded-xl shadow-xl overflow-hidden text-base font-bold">
                <DropdownItem  icon={<User size={18} className="font-semibold text-green-600" onClick={()=>navigate("/profile")}/>} text="My Profile" />
                <DropdownItem icon={<IoMdHome size={18} className="font-semibold text-green-600" onClick={()=>navigate("/")}/>} text="Home" />
                { variant!=="dash" && <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/dashboard")}/>} text="Dashboard" />}
                <DropdownItem icon={<LeafIcon size={18} className="font-semibold text-green-600" onClick={()=>navigate("/inputpage")}/>} text="CarbonInput" />
                <DropdownItem icon={<Edit size={18} className="font-semibold text-green-600" onClick={()=>navigate("/editprofile")}/>} text="Edit Profile" />
                <DropdownItem icon={<LogOut size={18} className="font-semibold text-green-600" onClick={handleLogout}/>} text="Logout" danger />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
function DropdownItem({icon,text,danger}:any){
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition
      ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-500 hover:bg-gray-200"}`}>{icon}<span>{text}</span>
    </div>
  );
}