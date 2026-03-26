import { AppContext } from "./AppContextInstance";

import axios from "axios";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  const handleAuthError = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      setToken(null);
      setUserData(false);
      toast.error(
        error.response?.data?.message || "Session expired. Please login again.",
      );
      return true;
    }
    return false;
  };

  const getAllDoctors = useCallback(async () => {
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
  }, [BACKEND_URL]);

  const loadUserProfileData = useCallback(async () => {
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
      if (handleAuthError(error)) return;
      toast.error("Error fetching user data");
      console.error("Error fetching user data:", error);
    }
  }, [BACKEND_URL, token]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token, loadUserProfileData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllDoctors();
  }, [getAllDoctors]);

  const currencySymbol = "$";
  const value = {
    doctors,
    getAllDoctors,
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
