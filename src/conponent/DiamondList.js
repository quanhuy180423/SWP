import React from 'react';
import '../css/DiamondList.css';

const DiamondList = ({ diamonds }) => {
  return (
    <table className="diamond-list-table">
      <thead>
        <tr>
          <th>Trọng lượng (Carat)</th>
          <th>Chế tác (Cut)</th>
          <th>Cấp màu</th>
          <th>Độ tinh khiết</th>
          <th>Giấy kiểm định</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        {diamonds.map((diamond, index) => (
          <tr key={index}>
            <td>{diamond.carat}</td>
            <td>{diamond.cut}</td>
            <td>{diamond.color}</td>
            <td>{diamond.clarity}</td>
            <td><a href={diamond.certificationLink} target="_blank" rel="noopener noreferrer">Xem</a></td>
            <td>{diamond.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiamondList;
