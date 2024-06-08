import React, { useState } from "react";
import ResultsTable from "./Resultstable"; // Ensure correct path

const Step3 = ({ nextStep, prevStep, updateFormData }) => {
  const [formData, setFormData] = useState({
    color: "",
    clarity: "",
    cut: "",
    carat: "",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateFormData({ [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(formData).toString();
      const url = `https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/Diamond?${queryParams}`;

      console.log("URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tìm kiếm!");
      }

      const data = await response.json();
      console.log("Data:", data);
      setResults(data);
      setError("");
    } catch (error) {
      setError(error.message);
      setResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex justify-center items-center flex-col  ">
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-2 w-1/2"
        onSubmit={handleSearch}
      >
        <h2 className="text-center mb-5 text-2xl text-gray-800">
          Step 3: Chi tiết kim cương
        </h2>
        <label className="block mb-2 text-gray-600">
          Màu sắc:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2 text-gray-600">
          Độ trong:
          <input
            type="text"
            name="clarity"
            value={formData.clarity}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2 text-gray-600">
          Giác cắt:
          <input
            type="text"
            name="cut"
            value={formData.cut}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2 text-gray-600">
          Carat:
          <input
            type="text"
            name="carat"
            value={formData.carat}
            onChange={handleChange}
            required
            className="w-full p-2 mt-2 mb-2 border border-gray-300 rounded-lg"
          />
        </label>
        <div className="text-center mb-5">
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="flex justify-between">
          {/* <button 
            type="button" 
            onClick={prevStep} 
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Trở lại
          </button> */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Tiếp tục
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default Step3;
