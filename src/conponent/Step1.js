import React, { useState } from "react";
import "../css/Step1.css";

const Step1 = ({ nextStep, updateFormData  }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Cập nhật dữ liệu trong OrderForm
    updateFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="form-step1">
      <h2>Step 1: Personal Information</h2>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;
