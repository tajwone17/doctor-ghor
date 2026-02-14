import { DoctorContext } from "./DoctorContextInstance";
// import { doctors } from "../assets/assets_frontend/assets";

const DoctorContextProvider = (props) => {
  const value = {};
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
