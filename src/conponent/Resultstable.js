import React, { useState } from "react";
import '../css/Resultstable.css';

const ResultsTable = ({ results }) => {
  const [selectedDiamonds, setSelectedDiamonds] = useState([]);

  const handleSelectDiamond = (diamond) => {
    // Kiểm tra xem kim cương đã được chọn chưa
    const isSelected = selectedDiamonds.some((selected) => selected.id === diamond.id);

    if (isSelected) {
      // Nếu đã được chọn thì loại bỏ khỏi danh sách các kim cương đã chọn
      const updatedSelectedDiamonds = selectedDiamonds.filter((selected) => selected.id !== diamond.id);
      setSelectedDiamonds(updatedSelectedDiamonds);
    } else {
      // Nếu chưa được chọn thì thêm vào danh sách các kim cương đã chọn
      setSelectedDiamonds([...selectedDiamonds, diamond]);
    }
  };

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Màu sắc</th>
          <th>Độ trong</th>
          <th>Giác cắt</th>
          <th>Carat</th>
          <th>Chọn</th> {/* Thêm cột mới cho nút bấm chọn */}
        </tr>
      </thead>
      <tbody>
        {results.map((diamond, index) => (
          <tr key={index}>
            <td>{diamond.color}</td>
            <td>{diamond.clarity}</td>
            <td>{diamond.cut}</td>
            <td>{diamond.carat}</td>
            <td>
              <button onClick={() => handleSelectDiamond(diamond)}>
                {selectedDiamonds.some((selected) => selected.id === diamond.id) ? 'Đã chọn' : 'Chọn'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
