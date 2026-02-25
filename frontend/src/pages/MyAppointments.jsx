import React, { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="pb-3 font-medium mt-12 text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {doctors &&
          doctors.slice(0, 3).map((doctor, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img src={doctor.image} className="w-32 bg-indigo-50" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold ">{doctor.name}</p>
                <p>{doctor.specialty}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{doctor.address.line1}</p>
                <p className="text-xs">{doctor.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm font-medium text-neutral-700">
                    Date & Time:
                  </span>
                  25 July, 2026 | 8.30 PM
                </p>
              </div>
              <div></div>
              <div className="flex flex-col justify-end gap-2">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
