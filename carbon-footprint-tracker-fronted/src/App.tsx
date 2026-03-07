import { Routes, Route ,Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgetpassword from "./pages/Forgetpassword";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RoutePlannerPage from "./pages/RoutePlannerPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { useSelector } from "react-redux";
import type { RootState } from "../src/redux/store"
import CarbonPredictPage from "./pages/CarbonPredictionPage";
import InputPage from "./pages/Inputpage";

export const serverUrl = "http://localhost:9000";
const App=()=>{
 const userData = useSelector(
     (state: RootState) => state.auth.userData
   );
  return(
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/forgetpassword" element={userData?(<Forgetpassword/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/dashboard" element={userData?(<Dashboard/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/routeplannerpage" element={userData?(<RoutePlannerPage/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/profile" element={userData?(<Profile/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/editprofile" element={userData?(<EditProfile/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/carbonpredictionpage" element={userData?(<CarbonPredictPage/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/inputpage" element={userData?(<InputPage/>):(<Navigate to="/signup"/>)} /> 
      </Routes>
    </>
  );
};

export default App;
