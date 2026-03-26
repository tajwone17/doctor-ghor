import React from "react";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContextInstance";
import { AppContext } from "../../context/AppContextInstance";
import { assets } from "../../assets/assets";
const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);
  useEffect(() => {
    getAllAppointments();
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-100 rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            className="flex justify-between max-sm:gap-2 sm:grid sm:grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50 flex-wrap"
            key={index}
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={appointment.userData.image}
                alt="patient"
              />
              <p>{appointment.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)} ,{appointment.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={appointment.docData.image}
                alt="doctor"
              />
              <p>{appointment.docData.name}</p>
            </div>
            <p>
              {currencySymbol}
              {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className="text-red-400 font-medium text-xs">Cancelled</p>
            ) : (
              <img className="w-10 cursor-pointer" src={assets.cancel_icon} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
