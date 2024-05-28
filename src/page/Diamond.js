import React, { useState } from 'react';
import DiamondFilter from '../page/DiamodFilter';
import DiamondList from '../conponent/DiamondList';
import Headers from '../conponent/Header';

const DiamondPage = () => {
  const [diamonds, setDiamonds] = useState([]);

  const handleSearch = async (filters) => {
    // Gọi API để tìm kiếm kim cương với các thông tin lọc đã nhận
    // Dưới đây là ví dụ giả định bạn đã có API endpoint `api/diamonds/search`
    const response = await fetch('/api/diamonds/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    const data = await response.json();
    setDiamonds(data);
  };

  return (
    <div>
      <Headers />
      <h1>Trang Kim Cương</h1>
      <DiamondFilter onSearch={handleSearch} />
      <DiamondList diamonds={diamonds} />
    </div>
  );
};

export default DiamondPage;
