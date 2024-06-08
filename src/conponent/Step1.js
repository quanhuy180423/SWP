import React, { useState } from "react";

const Step1 = ({ nextStep, updateFormData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateFormData({ [name]: value });
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
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
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
