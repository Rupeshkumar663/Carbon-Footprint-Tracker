import { useState, type ChangeEvent } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/authSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import type { RootState } from "../redux/store";
import api from "../api/axios";
import axios from "axios";
function EditProfile(){
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { userData,token }=useSelector((state:RootState)=>state.auth);
  const [name, setName]=useState<string>(userData?.name || "");
  const [description, setDescription]=useState<string>(userData?.description || "");
  const [photoUrl, setPhotoUrl]=useState<File | null>(null);
  const [loading, setLoading]=useState<boolean>(false);

  const handleEditProfile=async()=>{
     if(!name.trim()){
      toast.error("Username is required");
      return;
     }
    try{
      setLoading(true);
      const formData=new FormData();
      formData.append("name",name);
      formData.append("description",description.trim());
      if(photoUrl) {
        formData.append("photoUrl",photoUrl);
      }
      const result=await api.post(`${serverUrl}/api/auth/updateprofile`,formData,{ withCredentials: true});
     dispatch(setUserData({token:token!,user:result.data.user,}));
      toast.success("Profile Updated");
      navigate("/profile");
    } catch(error:unknown){
      console.log(error);
       if(axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Update failed");
       }
    } finally {
      setLoading(false);
    }
  };
  if(!userData) 
    return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 sm:px-4 py-6 sm:py-10">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 max-w-md w-full relative">
        <FaArrowLeftLong className="absolute top-4 left-4 w-[22px] h-[22px] cursor-pointer text-green-700" onClick={()=>navigate("/profile")} />
        <h2 className="text-xl sm:text-2xl font-bold text-center text-green-600 mb-5">Edit Profile</h2>
        <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            {userData.photoUrl ? (<img src={userData.photoUrl} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-600" alt="avatar" />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-green-500 border-white"> {userData.name?.slice(0, 1).toUpperCase()}</div>)}
          </div>
          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-green-700">Select avatar</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg text-sm text-green-700 cursor-pointer"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>
                setPhotoUrl(e.target.files?.[0] || null)
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-green-700">UserName</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-sm text-green-700"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-green-700">Email</label>
            <input
              readOnly
              type="text"
              value={userData.email}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-100 text-green-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-green-700">Bio</label>
            <textarea
              rows={2}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-600 text-green-700"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>

          <button
            className="w-full py-2.5 border border-green-400 text-green-400 rounded-xl font-medium hover:bg-green-400 hover:text-black disabled:opacity-60 disabled:cursor-not-allowed transition"
            disabled={loading || !name.trim()} onClick={handleEditProfile} >
            {loading ? (<div className="flex justify-center"><ClipLoader size={18} color="black"/></div>):("Save Changes")}
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditProfile;