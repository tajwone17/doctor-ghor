import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextInstance";
const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoc, setFilteredDoc] = useState([]);
  const navigate = useNavigate();
  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase(),
      );
      setFilteredDoc(filtered);
    } else {
      setFilteredDoc(doctors);
    }
  };
  useEffect(() => {
    //eslint-disable-next-line
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div> {speciality===""?"bg-indigo-100 text-black ":""}
      <p className="text-gray-600">Browse through the doctors specialty.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text gray-600">
          <p onClick={()=>speciality!=='General Physician'?navigate('/doctors/General Physician'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General Physician"?"bg-indigo-100 text-black ":""}`}>General Physician</p>
          <p onClick={()=>speciality!=='Gynecologist'?navigate('/doctors/Gynecologist'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black ":""}`}>Gynecologist</p>
          <p onClick={()=>speciality!=='Dermatologist'?navigate('/doctors/Dermatologist'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black ":""}`}>Dermatologist</p>
          <p onClick={()=>speciality!=='Pediatricians'?navigate('/doctors/Pediatricians'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black ":""}`}>Pediatricians</p>
          <p onClick={()=>speciality!=='Neurologist'?navigate('/doctors/Neurologist'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black ":""}`}>Neurologist</p>
          <p onClick={()=>speciality!=='Gastroenterologist'?navigate('/doctors/Gastroenterologist'): navigate('/doctors')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black ":""}`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filteredDoc.map((doctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
              }}
              key={index}
              className="border border-green-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 "
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className={` ${doctor.status == "Available" ? "bg-green-50" : "bg-red-50"}`}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center  ${doctor.status == "Available" ? "text-green-500" : "text-red-500"}`}
                >
                  <p
                    className={`w-2 h-2 ${doctor.status == "Available" ? "bg-blue-500" : "bg-red-500"} rounded-full`}
                  ></p>
                  <p>{doctor.status}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
