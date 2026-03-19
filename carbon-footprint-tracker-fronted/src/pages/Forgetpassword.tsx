import axios from "axios";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Forgetpassword() {
  const [step, setStep]=useState<number>(1);
  const [email, setEmail]=useState<string>("");
  const [otp, setOtp]=useState<string>("");
  const [newPassword, setNewPassword]=useState<string>("");
  const [conPassword, setConPassword]=useState<string>("");
  const [loading, setLoading]=useState<boolean>(false);
  const navigate=useNavigate();
  const sendOtp=async():Promise<void>=>{
    setLoading(true);
    try {
      const result=await axios.post(`${serverUrl}/api/auth/sendotp`,{ email },{ withCredentials: true });
      toast.success(result.data?.message);
      setStep(2);
    } catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Failed to send OTP");
      } else{
        toast.error("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP=async():Promise<void>=>{
    setLoading(true);
    try {
      const result=await axios.post(`${serverUrl}/api/auth/verifiedotp`,{ email, otp },{ withCredentials: true });
      toast.success(result.data?.message);
      setStep(3);
    } catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "OTP verification failed");
      } else {
        toast.error("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };
  const resetPassword=async():Promise<void>=>{
    if(newPassword !==conPassword){
      toast.error("Password does not match");
      return;
    }
    setLoading(true);
    try {
      const result=await axios.post(`${serverUrl}/api/auth/resetpassword`,{ email, password: newPassword },{ withCredentials: true });
      toast.success(result.data?.message);
      navigate("/login");
    } catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Reset failed");
      } else{
        toast.error("Reset failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget Your Password</h2>
          <form onSubmit={(e:FormEvent<HTMLFormElement>)=>e.preventDefault()}>
            <input
              type="text"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              disabled={loading}
              onClick={sendOtp}
              className="w-full bg-black text-white py-2 px-4 rounded-md mt-4">
              {loading ? <ClipLoader size={25} color="white" /> : "Send OTP"}
            </button>
          </form>
        </div>
      )}
      {step===2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2>
          <form onSubmit={(e:FormEvent<HTMLFormElement>)=>e.preventDefault()}>
            <input
              type="text"
              required
              placeholder="* * * *"
              value={otp}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setOtp(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"/>
            <button
              type="button"
              disabled={loading}
              onClick={verifyOTP}
              className="w-full bg-black text-white py-2 px-4 rounded-md mt-4">
              {loading ? <ClipLoader size={25} color="white" /> : "Verify OTP"}
            </button>
          </form>
        </div>
      )}

      {step===3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset your Password</h2>
          <form onSubmit={(e:FormEvent<HTMLFormElement>)=>e.preventDefault()}>
            <input
              type="password"
              required
              placeholder="New Password"
              value={newPassword}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setNewPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"/>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={conPassword}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setConPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md mt-4"/>
            <button
              type="button"
              disabled={loading}
              onClick={resetPassword}
              className="w-full bg-black text-white py-2 px-4 rounded-md mt-4">
              {loading ? <ClipLoader size={25} color="white" /> : "Reset Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default Forgetpassword;