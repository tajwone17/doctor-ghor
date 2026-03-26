import { AppContext } from "./AppContextInstance";
// import { doctors } from "../assets/assets_frontend/assets";

const AppContextProvider = (props) => {
//   const currencySymbol = "$";
const calculateAge=(dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();

  return age;
}
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
   const currencySymbol = "$";
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1] - 1] + " " + dateArray[2];
  };
  const value = { calculateAge, slotDateFormat, currencySymbol };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
