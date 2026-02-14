import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 items-start m-auto p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] shadow-lg text-sm">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] mt-1 p-2 w-full rounded"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] mt-1 p-2 w-full rounded"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="bg-primary text-white w-full rounded-md text-base py-2 cursor-pointer" type="submit">Login</button>
        {
            state === "Admin" ? (
                <p >Doctor Login? <span className="cursor-pointer text-primary underline"  onClick={() => setState("Doctor")}>Click Here</span></p>
            ) : (
                <p >Admin Login? <span className="cursor-pointer text-primary underline"  onClick={() => setState("Admin")}>Click Here</span></p>
            )
        }
      </div>
    </form>
  );
};

export default Login;
