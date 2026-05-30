import React,{useState,useRef,useEffect,} from "react";
import {NavLink,NavLinkRenderProps,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {Menu, X, ChevronDown,User,LayoutDashboard,Settings,LogOut,Plane,Car,Shield} from "lucide-react";
import type { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";

const Navbar=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();
  const { userData }=useSelector((state:RootState)=>state.auth);
  const [open,setOpen]=useState(false);
  const [show,setShow]=useState(false);
  const [dashboardOpen,setDashboardOpen]=useState(false);
  const profileRef=useRef<HTMLDivElement>(null);
  const dashboardRef=useRef<HTMLDivElement>(null);

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/");
  };

  useEffect(()=>{
    const handleClickOutside=(event:MouseEvent)=>{
      if(profileRef.current && !profileRef.current.contains( event.target as Node)){
        setShow(false);
      }

      if(dashboardRef.current && !dashboardRef.current.contains( event.target as Node)){
        setDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>document.removeEventListener("mousedown",handleClickOutside);
  },[]);

  const navLinkClass=({isActive}:NavLinkRenderProps)=>isActive? `text-white relative after:absolute after:left-0 after:-bottom-[24px] after:w-full after:h-[2px] after:bg-green-400 after:rounded-full` : ` text-green-400 hover:text-green-200 transition duration-300`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between">
        <div onClick={()=>navigate("/")} className="flex items-center gap-3 cursor-pointer">
          <div className=" w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black text-sm font-bold shadow-[0_10px_30px_rgba(34,197,94,0.18)]">🌍</div>
        <div>
           <h1 className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.5px] text-white leading-none">Carbon<span className="text-green-400"> Track</span></h1>
            <p className="hidden sm:block text-[10px] uppercase tracking-[2px] text-green-300 mt-1">AI Sustainability</p>
        </div>
      </div>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
           <NavLink to="/inputpage"  className={navLinkClass}>Vehicle</NavLink>
          <NavLink to="/flighthome"  className={navLinkClass}>Flight</NavLink>
          <NavLink to="/fighter-jet" className={navLinkClass}>Fighter Jet</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>

          {/* DASHBOARD */}
          <div className="relative" ref={dashboardRef}>
            <button onClick={()=>setDashboardOpen(!dashboardOpen)}className="flex items-center gap-1 text-green-400 hover:text-green-200 transition">Dashboard
              <ChevronDown
                size={15}
                className={`transition duration-300 ${
                  dashboardOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
          </button>

            {/* DROPDOWN */}
            {dashboardOpen && (
              <div className="absolute top-11 left-0 w-64 rounded-2xl border border-green-300 bg-[#101010]/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="p-2">

                  <button onClick={()=>{navigate("/overviewdashboard");setDashboardOpen(false);}} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition">
                    <LayoutDashboard size={17} />
                    Overview Dashboard
                  </button>

                  <button onClick={()=>{navigate("/dashboard");setDashboardOpen(false);}}className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition"><Car size={17} />Vehicle Dashboard
                  </button>

                  <button onClick={()=>{navigate("/flightdashboard");setDashboardOpen(false);}}className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition"><Plane size={17} />Flight Dashboard
                  </button>

                  <button onClick={()=>{navigate("/fighterdashboard");setDashboardOpen(false);}}className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition"><Shield size={17} />Fighter Jet Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className=" hidden xl:flex items-center gap-2 h-10 px-4 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-medium ">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> AI Live
        </div>
          {userData ? (<div className="relative" ref={profileRef}>
              <button onClick={()=>setShow(!show)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 hover:bg-white/[0.05] transition-all duration-300">

                <div className=" w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-sm font-semibold text-white ">
                  {userData?.photoUrl ? (
                    <img src={userData.photoUrl}alt="profile" className="w-full h-full object-cover"/>
                  ):(
                    userData?.name ?.slice(0,1).toUpperCase()
                  )}
                </div>
                <span className="text-sm text-green-200 font-medium max-w-[120px] truncate">{userData?.name}</span>
                <ChevronDown size={16} className={` text-gray-400 transition duration-300 ${ show? "rotate-180" : ""}`}
                />
              </button>

              {show && (
                <div className=" absolute right-0 mt-3  w-64  overflow-hidden  rounded-2xl border border-green-200 bg-[#121212]  shadow-2xl ">
                  <div className="px-5 py-4 border-b border-white/5">
                    <p className="text-green-400 font-semibold text-sm"> {userData?.name}</p>
                    <p className="text-green-300 text-xs mt-1"> AI Sustainability User</p>
                  </div>

                  <div className="py-2">
                    <button onClick={()=>{ navigate("/profile"); setShow(false);}} className=" w-full flex items-center gap-3 px-5 py-3 text-sm text-green-400 hover:bg-white/10  transition"><User size={16} /> My Profile
                    </button>

                    <button onClick={()=>{ navigate("/editprofile"); setShow(false); }} className=" w-full flex items-center gap-3 px-5 py-3  text-sm text-green-400  hover:bg-white/5  transition ">
                      <Settings size={16} /> Settings
                    </button>
                    <button onClick={()=>{ navigate( "/overviewdashboard" ); setShow(false);}} className=" w-full flex items-center gap-3  px-5 py-3  text-sm text-green-400  hover:bg-white/5 transition " > <LayoutDashboard size={16} /> Dashboard
                    </button>
                  </div>
                  <div className="border-t border-white/5 py-2">
                    <button onClick={()=>{ handleLogout(); setShow(false);}} className=" w-full flex items-center gap-3  px-5 py-3  text-sm text-red-400  hover:bg-red-500/10  transition  ">
                     <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          ):(
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/login")} className=" h-12 px-7 rounded-2xl border border-white/10 bg-white/[0.02]  text-gray-300  text-sm font-medium hover:bg-white  hover:text-black hover:border-white transition-all duration-300 " >Login</button>

              <button  onClick={() => navigate("/signup") } className=" relative overflow-hidden h-12 px-8 rounded-2xl bg-gradient-to-r from-green-400  via-emerald-500  to-green-500 text-black  text-sm font-semibold shadow-[0_10px_30px_rgba(34,197,94,0.25)]  hover:scale-[1.03]  transition-all duration-300 ">
                <span className="relative z-10">Get Started</span>
                <div className=" absolute inset-0   opacity-0 hover:opacity-100  bg-white/10  transition duration-300 "></div>
            </button>
            </div>
          )}
        </div>

        <div className="lg:hidden text-white">
          {open ? (
            <X size={26} className="cursor-pointer" onClick={()=>setOpen(false) }/>
          ):(
            <Menu size={26} className="cursor-pointer" onClick={()=>setOpen(true) }/>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#050505]/98 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-4 gap-2"> 
            {userData && (
             <div className="w-full border border-white/10 rounded-2xl p-4 bg-white/[0.02]">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
            {userData?.photoUrl ? (
            <img src={userData.photoUrl} alt="profile" className="w-full h-full object-cover"/>
            ):(userData?.name?.slice(0,1).toUpperCase())}
            </div>

            <div><p className="text-green-300 font-medium">{userData?.name}</p>
            <p className="text-xs text-green-500"> AI Sustainability User</p>
            </div>
           </div>

           <div className="flex flex-col gap-2">
            <button onClick={()=>{ navigate("/profile"); setOpen(false);}}className="text-left text-green-400"> My Profile </button>
          <button onClick={()=>{ navigate("/editprofile"); setOpen(false); }} className="text-left text-green-400">Settings</button>

          <button onClick={()=>{ handleLogout(); setOpen(false);}} className="text-left text-red-400">Logout</button>
          </div>
          </div>
        )}       
            <NavLink to="/inputpage" onClick={()=>setOpen(false)} className="text-[15px] font-medium text-green-400 hover:text-green-200">Vehicle</NavLink>
            <NavLink to="/flighthome" onClick={() => setOpen(false) } className="text-[15px] font-medium text-green-400 hover:text-green-200"> Flight</NavLink>
            <NavLink to="/fighter-jet" onClick={()=>setOpen(false)} className="text-[15px] font-medium text-green-400 hover:text-green-200"> Fighter Jet</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false) } className="text-[15px] font-medium text-green-400 hover:text-green-200">About Us </NavLink>

            {/* LOGIN / SIGNUP */}
            {!userData && (<div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <button onClick={()=>{ navigate("/login"); setOpen(false);}}
           className="w-full h-10 rounded-xl text-sm border border-white/10 bg-white/[0.03] text-white font-medium hover:bg-green-300 hover:text-black transition-all duration-300">Login</button>
           <button onClick={()=>{ navigate("/signup"); setOpen(false);}}
           className="w-full h-10 rounded-xl text-sm bg-gradient-to-r from-green-400 via-emerald-500 to-green-500 text-black font-semibold shadow-[0_10px_25px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition-all duration-300">Get Started</button>
           </div>
          )}
            {/* DASHBOARD */}
            {userData && (
              <>
               <div className="text-[11px] uppercase tracking-[4px] text-green-500 border-t border-white/10 pt-5">Dashboards</div>
               <div className="flex flex-col gap-4">
                <button
                 onClick={()=>{
                  navigate("/overviewdashboard");
                  setOpen(false);
                }}
                className="text-left text-green-400">Overview Dashboard</button>
 
               <button
                onClick={()=>{
                navigate("/dashboard");
                setOpen(false);
               }}
               className="text-left text-green-400">Vehicle Dashboard</button>

               <button
               onClick={()=>{
               navigate("/flightdashboard");
               setOpen(false);
              }}
              className="text-left text-green-400">Flight Dashboard</button>

             <button
             onClick={()=>{
             navigate("/fighterdashboard");
             setOpen(false);
             }}
            className="text-left text-green-400">Fighter Jet Dashboard</button>
           </div>
          </>
         )}
        </div>
      </div>
    )}
   </nav>
  );
};

export default Navbar;