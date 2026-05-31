import { useState } from "react";
import { motion } from "framer-motion";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import type { AppDispatch } from "../redux/store";
import { FcGoogle } from "react-icons/fc";
import api from "../api/axios";
import axios from "axios";
function SignUp() {
  const [show, setShow]=useState(false);
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();

  const handleSignup=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    if(!name || !email || !password){
      toast.error("All fields are required");
      return;
    }
    if(loading) 
      return; 
    setLoading(true);
    try {
      const result=await api.post("/api/auth/signup",{name,email,password},{ withCredentials: true });
      dispatch(setUserData({token:result.data.token,user:result.data.user}));
      toast.success("Signup successful");
      navigate("/");
    }catch(error:unknown){
      if(axios.isAxiosError?.(error)){
        toast.error(error?.response?.data?.message || "signUp failed");
     } else{
        toast.error("Login failed");
     }
    }
    finally{
     setLoading(false);
    }
  };

  const googleSignUp=async()=>{
    try{
      const response=await signInWithPopup(auth,provider);
      const user=response.user;
      const result=await api.post("/api/auth/googleauth",{name:user.displayName,email:user.email,},{ withCredentials: true });

      dispatch(setUserData({token:result.data.token,user:result.data.user,}));
      toast.success("Signup successful");
      navigate("/");
    } catch(error:unknown){
     if(axios.isAxiosError?.(error)){
        toast.error(error?.response?.data?.message || "Login failed");
      } else{
        toast.error("Login failed");
      }
     }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[900px] min-h-[520px] sm:min-h-[560px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT SIDE */}
        <form onSubmit={handleSignup} className="w-full md:w-[50%] bg-black text-white flex flex-col justify-center px-5 sm:px-6 md:px-12 py-6 sm:py-8 gap-3 sm:gap-4"
        >
          <h1 className="font-semibold text-center text-xl sm:text-2xl text-green-300">let's get started</h1>
          <h2 className="text-center text-lg sm:text-xl font-semibold text-green-300">Create your account</h2>
   
          <div onClick={googleSignUp} className="flex items-center justify-center gap-2 border border-green-700 h-[42px] rounded-md cursor-pointer hover:bg-green-900 transition"
          >
            <FcGoogle className="w-[22px] h-[22px]"/>
            <span className="text-sm">Continue with Google</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-green-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Your name"
              className="h-[42px] rounded-md px-3 bg-[#1a1a1a] border border-green-700 outline-none focus:border-green-500 text-green-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-green-200">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Your Email"
              className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-green-700 outline-none focus:border-green-500  text-green-300"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-sm text-green-200">Password</label>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-green-700 outline-none focus:border-green-500 text-green-300"
            />
            {!show ? (
              <IoEyeOutline className="absolute right-3 top-[38px] cursor-pointer text-green-500"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="absolute right-3 top-[36px] cursor-pointer text-green-800"
                onClick={()=>setShow(false)}
              />
            )}
          </div>

          <button type="submit" disabled={loading} className="h-[40px] bg-green-600 text-black rounded-md hover:bg-green-300 hover:text-black transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (<ClipLoader size={18} color="white" />
            ):("Sign Up")}
          </button>

          <div className="text-center text-xs sm:text-sm text-green-200">
            Already have an account?
            <span className="ml-2 text-green-400 cursor-pointer hover:text-white" onClick={()=>navigate("/login")}>Login</span>
          </div>
        </form>

        <div className="hidden md:flex md:w-[50%] bg-gradient-to-b bg-green-400 to-[#ffffff] items-center justify-center py-10">
         <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black text-center">Carbon Tracker</h1>
        </div>
      </motion.div>
    </div>
  );
}
export default SignUp;