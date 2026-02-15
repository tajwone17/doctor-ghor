import { React, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContextInstance";
const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const handleLogout = () => {
    localStorage.removeItem("aToken");
    setAtoken(null);
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 sm:px-10 border-b">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-40 sm:w-45 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 text-gray-600 rounded-full border-gray-500">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>{" "}
      <button
        onClick={handleLogout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
