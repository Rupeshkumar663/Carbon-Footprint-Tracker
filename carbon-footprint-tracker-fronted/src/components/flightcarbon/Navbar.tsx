import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LeafIcon, Edit, LogOut } from "lucide-react";
import { IoMdHome } from "react-icons/io";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

export default function Navbar({ variant }: any) {
  const [open, setOpen] = useState(false); // profile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // ☰ menu
  const ref = useRef<HTMLDivElement>(null);

  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-5 bg-black/80 shadow-sm relative z-50">

      {/* LOGO */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        Carbon<span className="text-green-400">Track</span>
      </h1>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-10">
        <span onClick={() => navigate("/")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">
          Home
        </span>

        {variant !== "dash" && (
          <span onClick={() => navigate("/dashboard")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">
            Dashboard
          </span>
        )}

        {variant === "inputpage" ? null : (
          <span onClick={() => navigate("/inputpage")} className="text-green-400 text-xl font-bold hover:text-green-300 cursor-pointer">
            CarbonInput
          </span>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* ☰ MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-green-400 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* PROFILE */}
        <div className="relative" ref={ref}>
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {userData?.photoUrl ? (
              <img src={userData.photoUrl} className="w-full h-full object-cover rounded-full" />
            ) : (
              userData?.name?.slice(0, 1).toUpperCase()
            )}
          </div>

          {/* SAME DROPDOWN */}
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
                                { variant!=="dash" && <DropdownItem icon={<LuLayoutDashboard size={18} className="font-semibold text-green-600" onClick={()=>navigate("/dashboard")}/>} text="Dashboard" />}
                               {variant==="inputpage" ? "":<DropdownItem icon={<LeafIcon size={18} className="font-semibold text-green-600" onClick={()=>navigate("/inputpage")}/>} text="CarbonInput" />}
                                <DropdownItem icon={<Edit size={18} className="font-semibold text-green-600" onClick={()=>navigate("/editprofile")}/>} text="Edit Profile" />
                                <DropdownItem icon={<LogOut size={18} className="font-semibold text-green-600" onClick={handleLogout}/>} text="Logout" danger />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col items-center gap-4 py-4 text-green-400 font-bold text-lg">

              <span onClick={() => { navigate("/"); setMenuOpen(false); }}>
                Home
              </span>

              {variant !== "dash" && (
                <span onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>
                  Dashboard
                </span>
              )}

              {variant === "inputpage" ? null : (
                <span onClick={() => { navigate("/inputpage"); setMenuOpen(false); }}>
                  CarbonInput
                </span>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

function DropdownItem({ icon, text, danger, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
      ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-400 hover:bg-gray-800"}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}