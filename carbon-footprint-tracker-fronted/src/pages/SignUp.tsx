import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import google from "../assets/google.jpg";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import type { AppDispatch } from "../redux/store";

function SignUp() {
  const [show, setShow]=useState(false);
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();

  const handleSignup=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    if(!name || !email || !password){
      toast.error("All fields are required");
      return;
    }
    if(loading) 
      return; 
    setLoading(true);
    try {
      const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{ withCredentials: true });
      dispatch(setUserData({token:result.data.token,user:result.data.user}));
      toast.success("Signup successful");
      navigate("/");
    } catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Signup failed");
      } else{
        toast.error("Signup failed");
      }
    } finally{
      setLoading(false);
    }
  };

  const googleSignUp=async()=>{
    try{
      const response=await signInWithPopup(auth,provider);
      const user=response.user;
      const result=await axios.post(`${serverUrl}/api/auth/googleauth`,{name:user.displayName,email:user.email,},{ withCredentials: true });

      dispatch(setUserData({token:result.data.token,user:result.data.user,}));
      toast.success("Signup successful");
      navigate("/");
    } catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Google signup failed");
      } else{
        toast.error("Google signup failed");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[900px] h-[560px] bg-white rounded-xl shadow-2xl flex overflow-hidden"
      >
        {/* LEFT SIDE */}
        <form onSubmit={handleSignup} className="w-[50%] bg-black text-white flex flex-col justify-center px-12 gap-4"
        >
          <h1 className="font-semibold text-center text-2xl">let's get started</h1>
          <h2 className="text-center text-xl font-semibold">Create your account</h2>
   
          <div onClick={googleSignUp} className="flex items-center justify-center gap-2 border border-gray-600 h-[40px] rounded-md cursor-pointer hover:bg-gray-900 transition"
          >
            <img src={google} className="w-[18px]" alt="google" />
            <span className="text-sm">Continue with Google</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Your name"
              className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-gray-700 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Your Email"
              className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-gray-700 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-gray-700 outline-none focus:border-blue-500"
            />
            {!show ? (
              <IoEyeOutline className="absolute right-3 top-[36px] cursor-pointer text-black"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="absolute right-3 top-[36px] cursor-pointer text-black"
                onClick={()=>setShow(false)}
              />
            )}
          </div>

          <button type="submit" disabled={loading} className="h-[40px] bg-blue-600 rounded-md hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-60"
          >
            {loading ? (<ClipLoader size={18} color="white" />
            ):("Sign Up")}
          </button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?
            <span className="ml-2 text-blue-400 cursor-pointer hover:text-white" onClick={()=>navigate("/login")}>Login</span>
          </div>
        </form>

        <div className="w-[50%] bg-gradient-to-b from-[#000428] via-[#004e92] to-[#ffffff] flex items-center justify-center">
         <h1 className="text-4xl font-bold text-white">Carbon Tracker</h1>
        </div>
      </motion.div>
    </div>
  );
}
export default SignUp;