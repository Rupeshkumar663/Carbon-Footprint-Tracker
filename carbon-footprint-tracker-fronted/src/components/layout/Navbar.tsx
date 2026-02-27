import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { Menu, X } from "lucide-react";

const Navbar=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { userData }=useSelector((state:RootState)=>state.auth);

  const [open,setOpen]=useState(false);
  const [show,setShow]=useState(false);
  const profileRef=useRef<HTMLDivElement>(null);

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/");
  };

  useEffect(()=>{
    const handleClickOutside=(event:any)=>{
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown",handleClickOutside);
    return () =>
      document.removeEventListener("mousedown",handleClickOutside);
  },[]);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="text-2xl font-bold text-white cursor-pointer"onClick={()=>navigate("/")} > Carbon<span className="text-green-400">Track</span></div>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <NavLink to="/" className={({ isActive })=>isActive? "text-green-400 font-medium" : "hover:text-white transition" }>Home</NavLink>
          
          <NavLink to="/calculate" className={({ isActive })=>isActive? "text-green-400 font-medium" : "hover:text-white transition" }>Calculate</NavLink>
          
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-4">

          {userData? (
            <>
              {/* Profile Photo */}
              <div className="relative" ref={profileRef}>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-green-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer" onClick={()=>setShow(!show)} >
                 {userData?.photoUrl ? (<img src={userData.photoUrl} alt="profile" className="w-full h-full object-cover" /> ) : ( userData?.name?.slice(0, 1).toUpperCase() )}
                </div>

                {/* Dropdown */}
               {show && ( <div className='absolute top-[120%] left-0 bg-white px-[10px] py-[8px] rounded-md border-[2px] border-black hover:border-white hover:text-white hover:bg-black'>

               <span className='bg-black text-white px-[18px] py-[6px] text-[14px] rounded-sm hover:bg-gray-600 cursor-pointer    whitespace-nowrap inline-block' onClick={()=>navigate("/profile")}>My Profile</span></div>)}

              </div>

              {/* Dashboard Button */}
              <button className="px-4 py-2 border border-green-400 text-green-400 rounded-lg font-medium hover:bg-green-400 hover:text-black transition" onClick={()=>navigate("/dashboard")}>Dashboard</button>

              {/* Logout Button */}
              <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:opacity-90 transition" onClick={handleLogout}>
                Logout</button>
           </>
           ) : (
            <>
              <button className="px-4 py-2 border border-green-400 text-green-400 rounded-lg font-medium hover:bg-green-400 hover:text-black transition"onClick={() => navigate("/login")} >Login</button>

              <button className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition"onClick={() => navigate("/signup")} >Sign Up</button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden text-white">
          {open ? ( <X onClick={() => setOpen(false)} className="cursor-pointer" /> ) : ( <Menu onClick={() => setOpen(true)} className="cursor-pointer" /> )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;