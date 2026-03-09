import axios from "axios";
export const predictCarbon=async(data:any)=>{
 try{
  const response=await axios.post("http://127.0.0.1:8000/predict",data,{headers:{"Content-Type":"application/json"}});
  return response.data;
 }catch(error:any){
  console.error("ML SERVICE ERROR:", error?.response?.data || error.message);
  throw error;
 }
};