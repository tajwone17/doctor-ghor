import React, { useState } from "react";

import { useContext } from "react";
import { AppContext } from "../context/AppContextInstance";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userData, setUserData } = useContext(AppContext);
  return userData && (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header with Background */}
          <div className="  bg-primary h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEdit && (
                  <button className="absolute bottom-0 right-0 bg-primary hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Name Section */}
            <div className="mb-8">
              {isEdit ? (
                <input
                  className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none focus:border-indigo-600 transition-colors w-full max-w-md bg-transparent"
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter your name"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900">
                  {userData.name}
                </h2>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-gray-200 pb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-blue-600">{userData.email}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Phone Number
                    </label>
                    {isEdit ? (
                      <input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="text"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-blue-600">{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Address
                    </label>
                    {isEdit ? (
                      <div className="space-y-2">
                        <input
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value,
                              },
                            }))
                          }
                          value={userData.address.line1}
                          type="text"
                          placeholder="Address Line 1"
                        />
                        <input
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value,
                              },
                            }))
                          }
                          value={userData.address.line2}
                          type="text"
                          placeholder="Address Line 2"
                        />
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p>{userData.address.line1}</p>
                          <p>{userData.address.line2}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-gray-200 pb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Basic Information
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Gender */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Gender
                    </label>
                    {isEdit ? (
                      <select
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        value={userData.gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                        {userData.gender}
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Date of Birth
                    </label>
                    {isEdit ? (
                      <input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="date"
                        value={userData.dob}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{userData.dob}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-end gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="px-6 py-2  bg-primary text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2  bg-primary text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
