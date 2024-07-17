import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <img
        src="./img/kimcuong_banner.png"
        alt="img 1"
        className="article-img mb-5"
      />
      <h1 className="title text-3xl font-bold text-center">
        Diamond Price Page
      </h1>
      <DiamondList diamonds={diamonds} />
    </div>
  );
};

export default DiamondPage;
