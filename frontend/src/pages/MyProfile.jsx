import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Tajwone Chowdhury",
    image: assets.profile_pic,
    email: "tajwone@gmail.com",
    phone: "01700000000",
    address: {
      line1: "House 10, Road 5",
      line2: "Dhanmondi, Dhaka",
    },
    gender: "Male",
    dob: "1998-01-01",
  });
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img src={userData.image} alt="Profile" className="w-36 rounded" />
      {isEdit ? (
        <input
        className="bg-gray-50 text-3xl font-medium max-w-70 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-px border-none" />
      <div>
        <p className="text-neutral-500 mt-3 underline">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
            className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
              className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
               className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p>BASIC INFORMATION</p>
        <div>
          <p>Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
          <p>Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
        {
          isEdit ? (
            <button onClick={() => setIsEdit(false)}>Save</button>
          ) : (
            <button onClick={() => setIsEdit(true)}>Edit</button>
          )
        }
      </div>
    </div>
  );
};

export default MyProfile;
