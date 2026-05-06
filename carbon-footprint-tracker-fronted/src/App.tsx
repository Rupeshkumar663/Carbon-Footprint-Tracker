import { Routes, Route ,Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Forgetpassword from "./pages/Forgetpassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { useSelector } from "react-redux";
import type { RootState } from "../src/redux/store"
import InputPage from "./pages/InputPage";
import CarbonEmissionPage from "./pages/CarbonEmissonPage";
import FlightHome from "./pages/flight/Home";
import FighterJetPage from "./pages/flight/Fighterjet";
import FlighResult from "./pages/flight/FlightResult";
import FighterjetResult from "./pages/flight/FighterjetResult";
import FlightDashboard from "./pages/flight/FlightDashboard";
import FighterjetDashboard from "./pages/flight/FighterjetDashboard";
import CarbonDashboard from "./pages/Dashboard";


export const serverUrl="http://localhost:9000";
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
        <Route path="/login" element={<Login/>} /> 
         <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/dashboard" element={userData?(<CarbonDashboard/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/profile" element={userData?(<Profile/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/editprofile" element={userData?(<EditProfile/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/inputpage" element={userData?(<InputPage/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/result" element={userData?(<CarbonEmissionPage/>):(<Navigate to="/signup"/>)} /> 

        {/*flight */}
        <Route path="/flighthome" element={userData?(<FlightHome/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/fighter-jet" element={userData?(<FighterJetPage/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/flightresult" element={userData?(<FlighResult/>):(<Navigate to="/signup"/>)} /> 
       <Route path="/fighterjetresult" element={<FighterjetResult/>} />
        <Route path="/flightdashboard" element={userData?(<FlightDashboard/>):(<Navigate to="/signup"/>)} /> 
        <Route path="/fighterdashboard" element={userData?(<FighterjetDashboard/>):(<Navigate to="/signup"/>)} /> 
      </Routes>
    </>
  );
};

export default App;
