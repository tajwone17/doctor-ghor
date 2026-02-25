import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";
const Navbar = () => {
  const navigate = useNavigate();
   const [showMenu, setShowMenu] = useState(false);
  const {token,setToken} = useContext(AppContext);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b  border-b-gray-400">
      <img onClick={() => navigate("/")} className="w-40 cursor-pointer" src={assets.logo} alt="Logo" />
      <ul className="hidden md:flex  items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 ">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={assets.profile_pic}
              alt="profile"
              className="w-8  rounded-full "
            />
            <img src={assets.dropdown_icon} alt="dropdown" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => localStorage.removeItem("token") || setToken('') || navigate("/login")}
                  className="hover:text-red-600 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full cursor-pointer font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img onClick={() => setShowMenu(!showMenu)} src={assets.menu_icon} alt="menu" className="w-6 md:hidden cursor-pointer" />
        {/* Mobile menu */}
        <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-3 bottom-0 overflow-hidden z-20 bg-white transition-all `}>
          <div className="flex items-center justify-between">
            <img className="w-36" src={assets.logo} alt="menu" />
            <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="cross_icon" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink   onClick={()=>setShowMenu(!showMenu)} to="/"><p  className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(!showMenu)} to="/doctors">< p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(!showMenu)} to="/about"><p  className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(!showMenu)} to="/contact"><p  className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
      </div>
        </div>
    </div>
  );
};

export default Navbar;
