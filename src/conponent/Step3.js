import React, { useState } from "react";
import '../css/Step3.css';
import ResultsTable from '../conponent/Resultstable'; // Đảm bảo bạn import đúng đường dẫn

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
  
      console.log('URL:', url);
  
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
      console.log('Data:', data);
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
    <div>
      <form className="form-step3" onSubmit={handleSearch}>
        <h2>Step 3: Chi tiết kim cương</h2>
        <label>
          Màu sắc:
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
          {/* <select name="color" value={formData.color} onChange={handleChange} required>
            <option value="">Chọn</option>
            {[...'DEFGHIJKLM'].map((char) => (
              <option key={char} value={char}>{char}</option>
            ))}
          </select> */}
        </label>
        <label>
          Độ trong:
          <input type="text" name="clarity" value={formData.clarity} onChange={handleChange} required />
          {/* <select name="clarity" value={formData.clarity} onChange={handleChange} required>
            <option value="">Chọn</option>
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
          </select> */}
        </label>
        <label>
          Giác cắt:
          <input type="text" name="cut" value={formData.cut} onChange={handleChange} required />
          {/* <select name="cut" value={formData.cut} onChange={handleChange} required>
            <option value="">Chọn</option>
            <option value="Excellent">Xuất sắc</option>
            <option value="Very Good">Rất tốt</option>
            <option value="Good">Tốt</option>
            <option value="Fair">Khá</option>
            <option value="Poor">Kém</option>
          </select> */}
        </label>
        <label>
          Carat:
          <input type="text" name="carat" value={formData.carat} onChange={handleChange} required />
        </label>
        
        <div className="search-button-container">
          <button type="submit">Tìm kiếm</button>
        </div>
        
        <div className="navigation-buttons">
          <button type="button" onClick={prevStep}>Trở lại</button>
          <button type="button" onClick={handleSubmit}>Tiếp tục</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {results.length > 0 && <ResultsTable results={results} />}
      
    </div>
  );
};

export default Step3;
