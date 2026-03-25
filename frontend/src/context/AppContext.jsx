import { AppContext } from "./AppContextInstance";

import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors fetched successfully:", data.doctors);
      } else {
        toast.error(data.message);
        console.error("Failed to fetch doctors:", data.message);
      }
    } catch (error) {
      toast.error("Error fetching doctors");
      console.error("Error fetching doctors:", error);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/get-user-info`,
        {
          headers: { token },
        },
      );
      if (data.success) {
        setUserData(data.userData);
        console.log("User data fetched successfully:", data.userData);
      } else {
        toast.error(data.message);
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      toast.error("Error fetching user data");
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getAllDoctors();
  }, []);

  const currencySymbol = "$";
  const value = {
    doctors, getAllDoctors,
    currencySymbol,
    token,
    setToken,
    BACKEND_URL,
    userData,
    setUserData,
    loadUserProfileData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
