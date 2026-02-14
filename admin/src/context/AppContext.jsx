import { AppContext } from "./AppContextInstance";
// import { doctors } from "../assets/assets_frontend/assets";

const AppContextProvider = (props) => {
//   const currencySymbol = "$";
  const value = { };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
