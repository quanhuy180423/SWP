import React, { useState } from "react";

const DiamondFilter = ({ onSearch }) => {
  const [caratOptions, setCaratOptions] = useState({
    "0.3-0.49": false,
    "0.5-0.89": false,
    "0.9-1.3": false,
    "1.3-1.9": false,
    "2.0-3.0": false,
    "Trên 3.0": false,
  });
  const [sizeOptions, setSizeOptions] = useState({
    "4.3-4.9": false,
    "5.0-5.9": false,
    "6.0-6.9": false,
    "7.0-7.9": false,
    "8.0-8.9": false,
    "Trên 9.0": false,
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
    "Very Good": false,
    Good: false,
  });
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [showCarat, setShowCarat] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showClarity, setShowClarity] = useState(false);
  const [showCut, setShowCut] = useState(false);

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
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md mr-36 ml-36 mb-10"
      >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Trọng lượng (Carat):
            </label>
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setShowCarat(!showCarat)}
            >
              {showCarat ? "▲" : "▼"}
            </button>
          </div>

          {showCarat && (
            <div className="pl-4 flex justify-around flex justify-around">
              {Object.entries(caratOptions).map(([option, checked]) => (
                <label
                  key={option}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setCaratOptions({
                        ...caratOptions,
                        [option]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Kích thước (Size):
            </label>
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setShowSize(!showSize)}
            >
              {showSize ? "▲" : "▼"}
            </button>
          </div>
          {showSize && (
            <div className="pl-4 flex justify-around">
              {Object.entries(sizeOptions).map(([option, checked]) => (
                <label
                  key={option}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setSizeOptions({
                        ...sizeOptions,
                        [option]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Cấp màu (Color Grade):
            </label>
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setShowColor(!showColor)}
            >
              {showColor ? "▲" : "▼"}
            </button>
          </div>
          {showColor && (
            <div className="pl-4 flex justify-around">
              {Object.entries(colorOptions).map(([option, checked]) => (
                <label
                  key={option}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setColorOptions({
                        ...colorOptions,
                        [option]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Độ tinh khiết (Clarity):
            </label>
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setShowClarity(!showClarity)}
            >
              {showClarity ? "▲" : "▼"}
            </button>
          </div>
          {showClarity && (
            <div className="pl-4 flex justify-around">
              {Object.entries(clarityOptions).map(([option, checked]) => (
                <label
                  key={option}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setClarityOptions({
                        ...clarityOptions,
                        [option]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Chế tác (Cut):
            </label>
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setShowCut(!showCut)}
            >
              {showCut ? "▲" : "▼"}
            </button>
          </div>
          {showCut && (
            <div className="pl-4 flex justify-around">
              {Object.entries(cutOptions).map(([option, checked]) => (
                <label
                  key={option}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setCutOptions({
                        ...cutOptions,
                        [option]: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Giá:</label>
          <div className="flex">
            <input
              type="number"
              className="form-input p-2 border border-gray-300 rounded mr-2"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Từ"
            />
            <input
              type="number"
              className="form-input p-2 border border-gray-300 rounded"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Đến"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
    </>
  );
};

export default DiamondFilter;
