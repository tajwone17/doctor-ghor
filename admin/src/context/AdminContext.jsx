import { AdminContext } from "./AdminContextInstance";
import { useState } from "react";

const AdminContextProvider = (props) => {
const [aToken, setAtoken] = useState("");
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const value = { aToken, setAtoken, BACKEND_URL };
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
