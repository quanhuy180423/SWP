import React, { useState, useEffect } from "react";
import axios from "axios";
import DiamondFilter from "../page/DiamodFilter";
import DiamondList from "../conponent/DiamondList"; // Update the import path if necessary

const DiamondPage = () => {
  const [diamonds, setDiamonds] = useState([]);

  const fetchDiamonds = async () => {
    try {
      const response = await axios.get("http://localhost:8090/test/getAllGem");
      setDiamonds(response.data);
    } catch (error) {
      console.error("Error fetching diamonds:", error);
    }
  };

  useEffect(() => {
    fetchDiamonds();
  }, []);

  const handleSearch = async (filters) => {
    try {
      const response = await axios.post("/api/diamonds/search", filters, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDiamonds(response.data);
    } catch (error) {
      console.error("Error searching diamonds:", error);
    }
  };

  return (
    <div>
      <img
        src="./img/kimcuong_banner.png"
        alt="img 1"
        className="article-img mb-5"
      />
      <h1 className="title text-3xl font-bold text-center">
        Trang Giá Kim Cương
      </h1>
      {/* <DiamondFilter onSearch={handleSearch} /> */}
      <DiamondList diamonds={diamonds} />
    </div>
  );
};

export default DiamondPage;
