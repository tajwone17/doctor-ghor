import { AdminContext } from "./AdminContextInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const AdminContextProvider = (props) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const handleAuthError = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("aToken");
      setAtoken(null);
      toast.error(
        error.response?.data?.message || "Session expired. Please login again.",
      );
      return true;
    }
    return false;
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/admin/all-doctors`, {
        headers: {
          atoken: aToken,
        },
      });
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors fetched successfully:", data.doctors);
      } else {
        toast.error(data.message);
        console.error("Failed to fetch doctors:", data.message);
      }
    } catch (error) {
      if (handleAuthError(error)) return;
      toast.error("Error fetching doctors");
      console.error("Error fetching doctors:", error);
    }
  };
  const changeAvailablity = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/change-availablity`,
        { doctorId },
        {
          headers: {
            atoken: aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors(); // Refresh the doctors list to reflect the updated availability
      } else {
        toast.error(data.message);
        console.error("Failed to change doctor availability:", data.message);
      }
    } catch (error) {
      if (handleAuthError(error)) return;
      toast.error("Error changing doctor availability");
      console.error("Error changing doctor availability:", error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/appointments`,
        {
          headers: {
            atoken: aToken,
          },
        },
      );
      if (data.success) {
        setAppointments(data.appointment);
        console.log("Appointments fetched successfully:", data.appointment);
      } else toast.error(data.message);
    } catch (error) {
      if (handleAuthError(error)) return;
      toast.error(error.msg);
      console.error("Error fetching appointments:", error);
    }
  };
  const value = {
    aToken,
    setAtoken,
    BACKEND_URL,
    doctors,
    getAllDoctors,
    changeAvailablity,
    appointments,
    getAllAppointments,
    setAppointments,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
