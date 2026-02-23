import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgetpassword from "./pages/Forgetpassword";

export const serverUrl = "http://localhost:9000";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/forgetpassword" element={<Forgetpassword />} /> 
      </Routes>
    </>
  );
};

export default App;
