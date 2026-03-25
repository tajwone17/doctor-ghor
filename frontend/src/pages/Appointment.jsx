import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextInstance";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appointment = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const { doctors, currencySymbol, BACKEND_URL, token, getAllDoctors } =
    useContext(AppContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const navigate = useNavigate();
  const docSlot = useMemo(() => {
    if (!doctorInfo) return [];
    const slots = [];
    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
          0,
          0,
          0,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          doctorInfo.slots_booked[slotDate] &&
          doctorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          //add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            formattedTime: formattedTime,
          });
        }
        //Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(...timeSlots);
    }
    return slots;
  }, [doctorInfo]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Group slots by date
  const groupedSlots = useMemo(() => {
    const grouped = {};
    docSlot.forEach((slot) => {
      const dateKey = slot.dateTime.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: slot.dateTime,
          times: [],
        };
      }
      grouped[dateKey].times.push(slot);
    });
    return Object.values(grouped);
  }, [docSlot]);

  const fetchDocInfo = async () => {
    if (!doctors || doctors.length === 0) return;
    const doctor = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(doctor);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.warn("Please select a slot");
      return;
    }
    try {
      const date = groupedSlots[slotIndex].date;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: { token },
        },
      );
      if (data.success) {
        toast.success("Appointment booked successfully");
        getAllDoctors();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      console.error("Error booking appointment:", error);
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    fetchDocInfo();
  }, [docId, doctors]);
  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);
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
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified"
              />{" "}
            </p>
            <div className="flex items-center gap-2 md:text-2xl text-xl mt-1 text-gray-600">
              <p>
                {doctorInfo?.degree} - {doctorInfo?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-sm rounded-full">
                {doctorInfo?.experience}
              </button>
            </div>
            {/* -----Doctor About----- */}
            <div>
              <p className="flex items-center gap-1 md:text-2xl text-xl font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info" />
              </p>
              <p className="md:text-xl text-lg text-gray-500 max-w-175 mt-1">
                {doctorInfo?.about}
              </p>
            </div>
            <p className="text-2xl font-semibold text-gray-500 mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {doctorInfo?.fees}
              </span>
            </p>
          </div>
        </div>
        {/* Booking slot */}
        <div className="lg:ml-103 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {groupedSlots.length > 0 &&
              groupedSlots.map((daySlots, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white " : "border border-gray-200"}`}
                  key={index}
                >
                  <p>{daysOfWeek[daySlots.date.getDay()]} </p>
                  <p>{daySlots.date.getDate()} </p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {groupedSlots.length > 0 &&
              groupedSlots[slotIndex].times.map((slot, index) => (
                <p
                  onClick={() => setSlotTime(slot.formattedTime)}
                  className={`text-sm font-light rounded-full cursor-pointer shrink-0 px-5 py-2 ${slot.formattedTime === slotTime ? "bg-primary text-white" : "border border-gray-300 text-gray-400"}`}
                  key={index}
                >
                  {slot.formattedTime}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm px-14 rounded-full font-light py-3 my-6 cursor-pointer hover:bg-white hover:border hover:border-primary hover:text-primary"
          >
            Book an Appointment
          </button>
        </div>
        {/* Listing related doctors */}
        <RelatedDoctors docId={docId} speciality={doctorInfo?.speciality} />
      </div>
    )
  );
};

export default Appointment;
