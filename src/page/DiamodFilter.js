import React, { useState } from 'react';
import '../css/DiamondFilter.css'; // Import file CSS

const DiamondFilter = ({ onSearch }) => {
  const [caratOptions, setCaratOptions] = useState({
    '0.3-0.49': false,
    '0.5-0.89': false,
    '0.9-1.3': false,
    '1.3-1.9': false,
    '2.0-3.0': false,
    'Trên 3.0': false,
  });
  const [sizeOptions, setSizeOptions] = useState({
    '4.3-4.9': false,
    '5.0-5.9': false,
    '6.0-6.9': false,
    '7.0-7.9': false,
    '8.0-8.9': false,
    'Trên 9.0': false,
  });
  const [colorOptions, setColorOptions] = useState({
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
  });
  const [clarityOptions, setClarityOptions] = useState({
    IF: false,
    VVS1: false,
    VVS2: false,
    VS1: false,
    VS2: false,
    SI1: false,
    SI2: false,
    I1: false,
    I2: false,
  });
  const [cutOptions, setCutOptions] = useState({
    Ideal: false,
    Excellent: false,
    'Very Good': false,
    Good: false,
  });
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedOptions = {
      caratOptions,
      sizeOptions,
      colorOptions,
      clarityOptions,
      cutOptions,
      priceMin,
      priceMax,
    };
    onSearch(selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="diamond-filter-form">
      <div className="form-group">
        <label className="form-label">Trọng lượng (Carat):</label>
        {Object.entries(caratOptions).map(([option, checked]) => (
          <div key={option} className="checkbox-container-diamond-filter">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setCaratOptions({
                  ...caratOptions,
                  [option]: e.target.checked,
                })
              }
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Kích thước (Size):</label>
        {Object.entries(sizeOptions).map(([option, checked]) => (
          <div key={option} className="checkbox-container-diamond-filter">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setSizeOptions({
                  ...sizeOptions,
                  [option]: e.target.checked,
                })
              }
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Cấp màu (Color Grade):</label>
        {Object.entries(colorOptions).map(([option, checked]) => (
          <div key={option} className="checkbox-container-diamond-filter">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setColorOptions({
                  ...colorOptions,
                  [option]: e.target.checked,
                })
              }
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Độ tinh khiết (Clarity):</label>
        {Object.entries(clarityOptions).map(([option, checked]) => (
          <div key={option} className="checkbox-container-diamond-filter">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setClarityOptions({
                  ...clarityOptions,
                  [option]: e.target.checked,
                })
              }
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Chế tác (Cut):</label>
        {Object.entries(cutOptions).map(([option, checked]) => (
          <div key={option} className="checkbox-container-diamond-filter">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setCutOptions({
                  ...cutOptions,
                  [option]: e.target.checked,
                })
              }
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Giá:</label>
        <input
          type="number"
          className="form-input"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          placeholder="Từ"
        />
        <input
          type="number"
          className="form-input"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          placeholder="Đến"
        />
      </div>
      <button type="submit" className="submit-button">
        Tìm kiếm
      </button>
    </form>
  );
};

export default DiamondFilter;
