import React from "react";
import { assets } from "../assets/assets_frontend/assets";
const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="flex md:flex-row flex-col  gap-12 my-10">
        <img
          className="w-full lg:w-100 md:w-70"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4">
          <p>
            Welcome to DocGhor, your trusted partner in managing your healthcare
            needs conveniently and efficiently. At DocGhor, we understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records
          </p>
          <p>
            DocGhor is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, DocGhor is here to support you every step of the way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at DocGhor is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-20">
        <div className="border px-6 sm:px-10 md:px-8 py-8 sm:py-16 md:py-10 flex flex-col gap-5 text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer flex-1">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-6 sm:px-10 md:px-8 py-8 sm:py-16 md:py-10 flex flex-col gap-5 text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer flex-1">
          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-6 sm:px-10 md:px-8 py-8 sm:py-16 md:py-10 flex flex-col gap-5 text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer flex-1">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
