import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
const api=axios.create({
  baseURL:"http://localhost:9000",
  withCredentials:true,
});
api.interceptors.request.use(
  (config:InternalAxiosRequestConfig)=>{
    const token=store.getState().auth.token;
     console.log("TOKEN:", token); 
    if(token){
      config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
  },
  (error:unknown)=>Promise.reject(error)
);
export default api;