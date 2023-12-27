import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const onboarding = (updateState) => {
  const navigate = useNavigate;

  const login = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/auth/login", {
      email,
      password
    });
}
  return (
    <div>
      <div className="flex overflow-x-hidden">
        <img
          src={window.location.origin + '/login.png'}
          className="bg-[#efebea] max-h-screen"
        />
        <div className="flex flex-col min-h-screen w-screen bg-[#efebea] overflow-x-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 text-bold">
              Onboarding
            </h1>
            <form className="mt-6">
              <div className="mb-2">
                <label
                  className="block text-sm font-semibold text-gray-800"
                >
                  Select Instructor
                </label>
                <select className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 
                focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                            <option value="" disabled defaultValue> Select an option </option>
                            <option value="admin"> Afaq Ahmed </option>
                            <option value="instrctor"> Ali Ahmad </option>
                            <option value="trainee"> Bilawal Zaman </option>
                </select>
              </div>
              <div className="mt-6">
              <button
                    className="w-full px-4 py-2 tracking-wide bg-purple-700 text-white
                    transition-colors duration-200 transform rounded-md focus:outline-none">
                    Select Instructor
            </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default onboarding;
