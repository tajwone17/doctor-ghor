import React, { useContext,useEffect,useState } from 'react'
import { AppContext } from '../context/AppContextInstance';
import { useNavigate } from 'react-router-dom';
const RelatedDoctors = ({docId, speciality}) => {
    const {doctors}=useContext(AppContext);
    const [relatedDoctors,setRelatedDoctors]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData=doctors.filter(doc=>doc.speciality===speciality && doc._id!==docId);
            //eslint-disable-next-line
            setRelatedDoctors(doctorsData);
        }
    },[doctors,speciality,docId])
  return (
 <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3  text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relatedDoctors.slice(0, 5 ).map((doctor, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doctor._id}`),scrollTo(0, 0);
            }}
            key={index}
            className="border border-green-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 "
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className={` ${doctor.available == true? "bg-green-50" : "bg-red-50"}`}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center  ${doctor.available == true ? "text-green-500" : "text-red-500"}`}
              >
                <p
                  className={`w-2 h-2 ${doctor.available == true ? "bg-green-500" : "bg-red-500"} rounded-full`}
                ></p>
                <p>{doctor.available == true ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-blue-700 px-12 py-3 rounded-full mt-10 border border-blue-700 cursor-pointer hover:bg-primary hover:text-white"
      >
        {" "}
        See more
      </button>
    </div>
  )
}

export default RelatedDoctors
