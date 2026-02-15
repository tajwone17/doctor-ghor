import {React,useContext} from "react";
import Login from "./pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {AdminContext} from "./context/AdminContextInstance";
import Navbar from "./components/Navbar";
const App = () => {
  const {aToken} = useContext(AdminContext);
 
  return aToken ? (
    <div className="bg-[#F8F9FD]">
   
      <ToastContainer />
       <Navbar />
    </div>
  ) : (
   <>
       <Login />
      <ToastContainer />
   </>
  );
};

export default App;
