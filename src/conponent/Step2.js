import React, { useState } from "react";

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
    updateFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex justify-center items-center flex-col ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-2"
      >
        <h2 className="text-center mb-5 text-2xl text-gray-800">
          Step 2: Material and Category
        </h2>
        <label className="block mb-4 text-gray-600">
          Chất liệu:
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">Select</option>
            <option value="gold">Vàng/Gold</option>
            <option value="silver">Bạc/Silver</option>
            <option value="platinum">Bạch kim/Platinum</option>
          </select>
        </label>
        <label className="block mb-4 text-gray-600">
          Trọng lượng (chỉ):
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Kích thước sản phẩm gia công (Ni):
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-4 text-gray-600">
          Thể loại đồ gia công:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="">Select</option>
            <option value="necklace">Vòng cổ/Necklace</option>
            <option value="ring">Nhẫn/Ring</option>
            <option value="bracelet">Vòng đeo tay/Bracelet</option>
          </select>
        </label>
        <div className="flex justify-between">
          {/* <button
            type="button"
            onClick={prevStep}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Back
          </button> */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
