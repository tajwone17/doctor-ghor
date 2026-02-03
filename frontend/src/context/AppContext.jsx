import { AppContext } from "./AppContextInstance";
import { doctors } from "../assets/assets_frontend/assets";

const AppContextProvider = (props) => {
  const value = { doctors };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
