import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
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
import { FcGoogle } from "react-icons/fc";
import api from "../api/axios";
function Login() {
 const [show,setShow]=useState(false);
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [loading,setLoading]=useState(false);
 const navigate=useNavigate();
 const dispatch=useDispatch<AppDispatch>();
 const handleLogin=async (e:FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   if(!email || !password){
   toast.error("Email and password required");
   return;
 }
  setLoading(true); 
 try{
 const result=await api.post(`${serverUrl}/api/auth/login`,{email,password},{withCredentials:true});
 dispatch(setUserData({token:result.data.token,user:result.data.user}));
 toast.success("Login successful");
 navigate("/");
}
catch(error:unknown){
  if(axios.isAxiosError(error)){
   toast.error(error.response?.data?.message || "Login failed");
  }else{
   toast.error("Login failed");
  }
 }
 finally{
  setLoading(false);
 }
};

const googleLogin=async()=>{
 try{
  const response=await signInWithPopup(auth,provider);
   const user=response.user;
   const result = await api.post(`${serverUrl}/api/auth/googleauth`,{name:user.displayName,email:user.email},{withCredentials:true});
   dispatch(setUserData({token:result.data.token,user:result.data.user}));
   toast.success("Login successfully");
   navigate("/");
  }
  catch(error:unknown){
   if(axios.isAxiosError(error)){
    toast.error(error.response?.data?.message || "Google login failed");
   }else{
    toast.error("Google login failed");
   }
  }
 };
return (
  <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
  <motion.div
   initial={{opacity:0,scale:0.95}}
   animate={{opacity:1,scale:1}}
   transition={{duration:0.5}}
   className="w-[900px] h-[560px] bg-white rounded-xl shadow-2xl flex overflow-hidden"
  >
 {/* LEFT SIDE */}
  <form onSubmit={handleLogin} className="w-[50%] bg-black text-white flex flex-col justify-center px-12 gap-4">
  <h2 className="text-center text-xl font-semibold text-green-300">Login to your account</h2>

  <div onClick={googleLogin} 
  className="flex items-center justify-center gap-2 border border-green-700 h-[40px] rounded-md cursor-pointer hover:bg-green-900 transition"
          >
   <FcGoogle className="w-[22px] h-[22px]"/>
  <span className="text-sm">Continue with Google</span>
 </div>

 <div className="flex flex-col gap-1">
   <label className="text-sm text-green-200">Email Address</label>
   <input type="email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
     placeholder="Your Email"
    className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-green-700 outline-none focus:border-green-500 text-green-300"
   />
 </div>

 <div className="flex flex-col gap-1 relative">
  <label className="text-sm text-green-200">Password</label>
  <input
   type={show?"text":"password"}
   value={password}
   onChange={(e)=>setPassword(e.target.value)}
   className="h-[40px] rounded-md px-3 bg-[#1a1a1a] border border-green-700 outline-none focus:border-green-500 text-green-300"
 />
   {!show ? <IoEyeOutline className="absolute right-3 top-[36px] cursor-pointer text-green-500"onClick={()=>setShow(true)}/>
    :
   <IoEye className="absolute right-3 top-[36px] cursor-pointer text-green-800"onClick={()=>setShow(false)}/>
  }
 </div>
  <div className="flex justify-between text-xs text-green-200">
   <span className="cursor-pointer hover:text-green-500" onClick={()=>navigate("/forgetpassword")}> Forgot Password</span>
  </div>
  
  <button
   type="submit"
   disabled={loading}
   className="h-[40px] bg-green-600 text-black rounded-md hover:bg-green-300 hover:text-black transition flex items-center justify-center disabled:opacity-60"
  >
  {loading ?<ClipLoader size={18} color="white"/> :"Login"}
   </button>
  <div className="text-center text-sm text-green-200">Don't have an account?
  <span className="ml-2 text-green-400 cursor-pointer hover:text-white" onClick={()=>navigate("/signup")}>Sign Up</span>
  </div>
  </form>

  {/* RIGHT SIDE */}
  <div className="w-[50%] bg-gradient-to-b  bg-green-400 to-[#ffffff] flex items-center justify-center">
   <h1 className="text-4xl font-bold text-black">Carbon Tracker</h1>
  </div>
 </motion.div>
</div>
);
}
export default Login;