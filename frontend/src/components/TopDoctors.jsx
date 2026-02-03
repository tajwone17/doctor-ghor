import React from "react";
import { doctors } from "../assets/assets_frontend/assets";

const TopDoctors = () => {
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3  text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 5).map((doctor, index) => (
          <div
            key={index}
            className="border border-green-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 "
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className={` ${doctor.status == "Available" ? "bg-green-50" : "bg-red-50"}`}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center  ${doctor.status == "Available" ? "text-green-500" : "text-red-500"}`}
              >
                <p
                  className={`w-2 h-2 ${doctor.status == "Available" ? "bg-green-500" : "bg-red-500"} rounded-full`}
                ></p>
                <p>{doctor.status}</p>
              </div>
              <p>{doctor.name}</p>
              <p>{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
