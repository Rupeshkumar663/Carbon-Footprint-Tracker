import React, { useState, ChangeEvent } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/authSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import type { RootState } from "../redux/store";
import api from "../api/axios";
function EditProfile(){
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const { userData,token }=useSelector((state:RootState)=>state.auth);

  const [name, setName]=useState<string>(userData?.name || "");
  const [description, setDescription]=useState<string>(userData?.description || "");
  const [photoUrl, setPhotoUrl]=useState<File | null>(null);
  const [loading, setLoading]=useState<boolean>(false);

  const handleEditProfile=async()=>{
    try {
      setLoading(true);
      const formData=new FormData();
      formData.append("name",name);
      formData.append("description",description);
      if(photoUrl) {
        formData.append("photoUrl",photoUrl);
      }

      const result=await api.post(`${serverUrl}/api/auth/updateprofile`,formData,{ withCredentials: true});

  
   dispatch(setUserData({token:token!,user:result.data.user,}));
      toast.success("Profile Updated");
      navigate("/profile");

    } catch(error:RootState) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if(!userData) 
    return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">

        <FaArrowLeftLong className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={()=>navigate("/profile")} />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
        <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>

          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            {userData.photoUrl ? (<img src={userData.photoUrl} className="w-24 h-24 rounded-full object-cover border-4 border-black" alt="avatar" />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white"> {userData.name?.slice(0, 1).toUpperCase()}</div>)}
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">Select avatar</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhotoUrl(e.target.files?.[0] || null)
              }
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">UserName</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-sm"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              readOnly
              type="text"
              value={userData.email}
              className="w-full px-4 py-2 border rounded-md text-sm bg-gray-100"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              rows={3}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer" disabled={loading} onClick={handleEditProfile} >
            {loading ? (<ClipLoader size={25} color="white" />) : ( "Save Changes" )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;