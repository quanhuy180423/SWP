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
          Chất liệu:
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="gold">Vàng/Gold</option>
            <option value="silver">Bạc/Silver</option>
            <option value="platinum">Bạch kim/Platinum</option>
          </select>
        </label>
        <label>
          Trọng lượng (chỉ):
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kích thước sản phẩm gia công (Ni):
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Thể loại đồ gia công:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="necklace">Vòng cổ/Necklace</option>
            <option value="ring">Nhẫn/Ring</option>
            <option value="bracelet">Vòng đeo tay/Bracelet</option>
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
