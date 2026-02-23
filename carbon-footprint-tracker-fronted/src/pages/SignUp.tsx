import { useState } from "react";
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
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = async (): Promise<void> => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, password, email },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Signup successfully");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async (): Promise<void> => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Signup successfully");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Google signup failed"
        );
      } else {
        toast.error("Google signup failed");
      }
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT SIDE */}
        <div className="md:w-[50%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">
              Create your account
            </h2>
          </div>

          {/* NAME */}
          <div className="flex flex-col gap-1 w-[80%] items-start px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1 w-[80%] items-start px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 w-[80%] items-start px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] p-[20px]"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            className="w-[80%] h-[40px] bg-black text-white flex items-center justify-center rounded-[5px]"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={25} color="white" />
            ) : (
              "SignUp"
            )}
          </button>

          {/* DIVIDER */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]" />
            <div className="w-[50%] text-[#6f6f6f] text-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]" />
          </div>

          {/* GOOGLE */}
          <div
            className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer"
            onClick={googleSignUp}
          >
            <img src={google} className="w-[25px]" alt="google" />
            <span className="text-[18px] text-gray-500 ml-2">
              Google
            </span>
          </div>

          <div className="text-[#6f6f6f]">
            already have an account{" "}
            <span
              className="underline text-[black] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[50%] h-[100] rounded-r-2xl bg-black md:flex items-center justify-center hidden">
          <span className="text-5xl text-white">
            Carbon Tracker
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;