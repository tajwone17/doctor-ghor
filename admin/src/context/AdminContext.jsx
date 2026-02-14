import { AdminContext } from "./AdminContextInstance";


const AdminContextProvider = (props) => {

  const value = { };
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
