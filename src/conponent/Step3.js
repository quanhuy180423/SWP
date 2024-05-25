import React, { useState } from "react";
import '../css/Step3.css';

const Step3 = ({ nextStep, prevStep, updateFormData }) => {
  const [formData, setFormData] = useState({
    color: "",
    clarity: "",
    cut: "",
    carat: "",
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
    <form className="form-step3" onSubmit={handleSubmit}>
      <h2>Step 3: Diamond Details</h2>
      <label>
        Color:
        <select name="color" value={formData.color} onChange={handleChange} required>
          <option value="">Select</option>
          {[...'DEFGHIJKLMNOPQRSTUVWXYZ'].map((char) => (
            <option key={char} value={char}>{char}</option>
          ))}
        </select>
      </label>
      <label>
        Clarity:
        <select name="clarity" value={formData.clarity} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="FL">FL</option>
          <option value="IF">IF</option>
          <option value="VVS1">VVS1</option>
          <option value="VVS2">VVS2</option>
          <option value="SI1">SI1</option>
          <option value="SI2">SI2</option>
          <option value="SI3">SI3</option>
          <option value="I1">I1</option>
          <option value="I2">I2</option>
          <option value="I3">I3</option>
        </select>
      </label>
      <label>
        Cut:
        <select name="cut" value={formData.cut} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Excellent">Excellent</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </label>
      <label>
        Carat:
        <input type="text" name="carat" value={formData.carat} onChange={handleChange} required />
      </label>
      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step3;
