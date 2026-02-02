import React from "react";
import { assets } from "../assets/assets_frontend/assets";
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 py-14 m-auto md:py-[10vw] md:-mb-7.5">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center md:text-left  text-white leading-tight">
          Book Appointment <br className="hidden sm:block" /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src={assets.group_profiles} alt="group profiles" className="w-28" />
          <p className="text-center md:text-left">
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
          
        </div>
       <a
  href="#speciality"
  className="group flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
>
  Book Appointment
  <img
    src={assets.arrow_icon}
    alt="arrow right"
    className="w-3 transition-transform duration-300 group-hover:translate-x-3"
  />
</a>

      </div>
      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img src={assets.header_img} alt="header" className="w-full md:absolute h-auto rounded-lg bottom-0" />
      </div>
    </div>
  );
};

export default Header;
