import React, { useState } from "react";
import "../css/Step2.css";

const Step2 = ({ nextStep, prevStep, updateFormData }) => {
  const [formData, setFormData] = useState({
    material: "",
    weight: "",
    size: "",
    category: "",
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
    <div className="step2-container">
      <form onSubmit={handleSubmit} className="form-step2">
        <h2>Step 2: Material and Category</h2>
        <label>
          Material:
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="platinum">Platinum</option>
          </select>
        </label>
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="necklace">Necklace</option>
            <option value="ring">Ring</option>
            <option value="bracelet">Bracelet</option>
          </select>
        </label>
        <button type="button" onClick={prevStep}>
          Back
        </button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Step2;
