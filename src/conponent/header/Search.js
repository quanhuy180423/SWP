import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const searchProduct = async (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/jewelry?search=${searchValue}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center border-2 border-blue-800 rounded-full px-2 bg-white w-full ">
        <form onSubmit={searchProduct} className="flex items-center w-full">
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm..."
            className="border-none outline-none flex-1 py-1 px-2 text-lg rounded-full"
            onChange={handleInputChange}
            value={searchValue}
          />
          <button
            type="submit"
            className="bg-none border-none cursor-pointer outline-none p-0 ml-2"
          >
            <img src="./img/glass.png" alt="search-icon" className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
