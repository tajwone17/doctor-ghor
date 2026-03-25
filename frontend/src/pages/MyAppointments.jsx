import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContextInstance";
import axios from "axios";
import { toast } from "react-toastify";
const MyAppointments = () => {
  const { BACKEND_URL, token,getAllDoctors} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1] - 1] + " " + dateArray[2];
  };
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/list-appointments`,
        {
          headers: { token },
        },
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments fetched successfully:", data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("Cancelling appointment with ID:", appointmentId);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        },
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        console.log("Appointment cancelled successfully:", data);
        fetchAppointments();
        getAllDoctors();
      } else {
        toast.error(data.message);
        console.error("Failed to cancel appointment:", data.message);
      }
    } catch (error) {
      toast.error("Error cancelling appointment");
      console.error("Error cancelling appointment:", error);
    }
  };
  useEffect(() => {
    if (token) {
      //eslint-disable-next-line
      fetchAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 font-medium mt-12 text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments &&
          appointments.map((appointment, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  src={appointment.docData.image}
                  className="w-32 bg-indigo-50"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold ">
                  {appointment.docData.name}
                </p>
                <p>{appointment.docData.specialty}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{appointment.docData.address.line1}</p>
                <p className="text-xs">{appointment.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm font-medium text-neutral-700">
                    Date & Time:
                  </span>
                  {" " +
                    slotDateFormat(appointment.slotDate) +
                    " | " +
                    appointment.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col justify-end gap-2">
                
                {
                  !appointment.cancelled && (
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                  )

                }
                {!appointment.cancelled&& (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {
                  appointment.cancelled && (
                    <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>
                  )
                }
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
