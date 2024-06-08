import React, { useState, useEffect } from "react";
import DiamondFilter from "../page/DiamodFilter";
import DiamondList from "../conponent/DiamondList";

const DiamondPage = () => {
  const [diamonds, setDiamonds] = useState([]);

  const fetchDiamonds = async () => {
    // Gọi API để lấy danh sách các viên kim cương có sẵn
    const response = await fetch("https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/Diamond");
    const data = await response.json();
    setDiamonds(data);
  };

  useEffect(() => {
    fetchDiamonds();
  }, []); // Fetch danh sách kim cương khi component được mount lần đầu

  const handleSearch = async (filters) => {
    // Gọi API để tìm kiếm kim cương với các thông tin lọc đã nhận
    const response = await fetch("/api/diamonds/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });
    const data = await response.json();
    setDiamonds(data);
  };

  return (
    <div>
      <img src="./img/kimcuong_banner.png" alt="img 1" className="article-img mb-5"/>
      <h1 className="title font-bold text-4xl flex justify-center">
        Trang Giá Kim Cương
      </h1>
      <DiamondFilter onSearch={handleSearch} />
      <h1 className="title font-bold text-4xl flex justify-center mb-5">
        Bảng Giá Kim Cương
      </h1>
      <DiamondList diamonds={diamonds} />
    </div>
  );
};

export default DiamondPage;
