import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { Menu, X } from "lucide-react";
import Button from "../layout/Button"

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          Carbon<span className="text-green-400">Track</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-400 font-medium"
                : "hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-green-400 font-medium"
                : "hover:text-white transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/calculate"
            className={({ isActive }) =>
              isActive
                ? "text-green-400 font-medium"
                : "hover:text-white transition"
            }
          >
            Calculate
          </NavLink>

        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">

          {userData ? (
            <>
              {/* Profile Circle */}
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold text-white">
                {userData.name?.slice(0, 1).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition"
            >
              Login
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          {open ? (
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
          )}
        </div>

      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4 text-gray-300">

          <div onClick={() => {navigate("/"); setOpen(false);}} className="cursor-pointer hover:text-white">
            Home
          </div>

          <div onClick={() => {navigate("/dashboard"); setOpen(false);}} className="cursor-pointer hover:text-white">
            Dashboard
          </div>

          <div onClick={() => {navigate("/calculate"); setOpen(false);}} className="cursor-pointer hover:text-white">
            Calculate
          </div>

              {userData && (
             
             
            <Button
             onClick={() =>navigate("/dashboard")}
              className="cursor-pointer text-red-400"
            >
             Dashboard
            </Button>
          ) }
          {userData && (
             
             
            <Button
              onClick={handleLogout}
              className="cursor-pointer text-red-400"
            >
              Logout
            </Button>
          ) }

      {!userData && (
           <div>
            <Button
              onClick={() => {navigate("/login"); setOpen(false);}}
              className="cursor-pointer text-green-400"
            >
              Login
             </Button>

             <Button
              onClick={() => {navigate("/signup"); setOpen(false);}}
              className="cursor-pointer text-green-400"
            >
              SignUp
             </Button>

             </div>

      )}
  

        </div>
      )}

    </nav>
  );
};

export default Navbar;