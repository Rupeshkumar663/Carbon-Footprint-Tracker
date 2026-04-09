import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from "react";
import type { RootState } from "../redux/store";

function Profile(){
  const navigate=useNavigate();
  const userData=useSelector((state:RootState)=>state.auth.userData);
  useEffect(()=>{
    if(!userData){
      navigate("/login");
    }
  },[userData,navigate]);
  if(!userData)
    return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowLeftLong className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer text-green-700" onClick={()=>navigate("/")}/>
        <div className="flex flex-col items-center text-center">
          {userData.photoUrl ? (
            <img src={userData.photoUrl} className="w-24 h-24 rounded-full object-cover border-4 border-green-800" alt="Profile"/>
          ) : (
            <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-green-500 border-white"> {userData.name?.slice(0, 1).toUpperCase()}</div>
          )}

          <h2 className="text-2xl font-bold mt-4 text-green-600">{userData.name}</h2>
          <p className="text-sm text-green-500">Carbon Saver 🌿</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="text-sm flex items-center gap-1 text-green-700">
            <span className="font-semibold text-green-700">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div className="text-sm flex items-center gap-1 text-green-700">
            <span className="font-semibold text-green-700">Bio:</span>
            <span>{userData.description || "No bio added"}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
           className="px-4 py-2 border border-green-400 text-green-400 rounded-lg font-medium hover:bg-green-400 hover:text-black transition" onClick={() => navigate("/editprofile")} > Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;