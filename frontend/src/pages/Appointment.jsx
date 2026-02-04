import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContextInstance";
import { assets } from "../assets/assets_frontend/assets";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors,currencySymbol } = useContext(AppContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const fetchDocInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(doctor);
  };
  useEffect(() => {
    //eslint-disable-next-line
    fetchDocInfo();
  }, [docId, doctors]);

  return (
    doctorInfo && (
      <div>
        {/* -----Doctor Details----- */}
        <div className="flex  gap-4 lg:flex-row flex-col">
          <div>
            <img
              className="bg-primary w-full rounded-lg sm-max-w-72"
              src={doctorInfo?.image}
              alt={doctorInfo?.name}
            />
          </div>
          <div className="border border-gray-400 rounded-lg p-8 py-7  bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 flex-1 ">
            {/* ------Doctor Info: Name,Degree,Experience------ */}
            <p className="flex items-center gap-2 md:text-5xl text-3xl font-medium text-gray-900">
              {doctorInfo?.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="verified" />{" "}
            </p>
            <div className="flex items-center gap-2 md:text-2xl text-xl mt-1 text-gray-600">
              <p>
                {doctorInfo?.degree} - {doctorInfo?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-sm rounded-full">{doctorInfo?.experience}</button>
            </div>
            {/* -----Doctor About----- */}
            <div>
            <p className="flex items-center gap-1 md:text-2xl text-xl font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info" />
            </p>
            <p className="md:text-xl text-lg text-gray-500 max-w-175 mt-1">{doctorInfo?.about}</p>
          </div>
          <p className="text-2xl font-semibold mt-4">Appointment Fee: <span>{currencySymbol}{doctorInfo?.fees}</span></p>
        </div>
      </div>
      </div>
    )
  );
};

export default Appointment;
