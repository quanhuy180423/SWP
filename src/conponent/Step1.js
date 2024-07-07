import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8090/test/getUserById";

const Step1 = ({ nextStep, updateFormData, formData }) => {
  const [localData, setLocalData] = useState({
    Name: formData.Name || "",
    Phone: formData.Phone || "",
    Address: formData.Address || "",
    Email: formData.Email || "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.Id) {
        const userId = storedUser.Id;

        try {
          const response = await axios.get(`${API_URL}?UserId=${userId}`);
          const userData = response.data;
          setLocalData({
            Name: userData.Name || "",
            Phone: userData.Phone || "",
            Address: userData.Address || "",
            Email: userData.Email || "",
          });
          updateFormData({
            UserId: userData.UserId || "",
            UserName: userData.UserName || "",
            Name: userData.Name || "",
            Phone: userData.Phone || "",
            Address: userData.Address || "",
            Email: userData.Email || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User ID not found in localStorage");
      }
    };

    fetchUserData();
  }, [updateFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    updateFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-2"
      >
        <h2 className="text-center mb-5 text-2xl text-gray-800">
          Step 1: Personal Information
        </h2>
        <label className="block mb-4 text-gray-600">
          Full Name:
          <input
            type="text"
            name="Name"
            value={localData.Name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Phone:
          <input
            type="text"
            name="Phone"
            value={localData.Phone}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Address:
          <input
            type="text"
            name="Address"
            value={localData.Address}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Email:
          <input
            type="email"
            name="Email"
            value={localData.Email}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full text-lg hover:bg-green-600"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step1;
