import React from "react";

const DiamondList = ({ diamonds }) => {
  return (
    <>
      <div className="flex justify-center text-center">
        <table className="table-auto min-w-96 w-4/5 ">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Trọng lượng (Carat)</th>
              <th className="px-4 py-2 border">Chế tác (Cut)</th>
              <th className="px-4 py-2 border">Cấp màu (Color)</th>
              <th className="px-4 py-2 border">Độ tinh khiết (Clarity)</th>
              <th className="px-4 py-2 border">Giấy kiểm định</th>
              <th className="px-4 py-2 border">Giá</th>
            </tr>
          </thead>
          <tbody>
            {diamonds.map((diamond, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">
                  {diamond.carat}
                </td>
                <td className="border px-4 py-2 text-center">{diamond.cut}</td>
                <td className="border px-4 py-2 text-center">
                  {diamond.color}
                </td>
                <td className="border px-4 py-2 text-center">
                  {diamond.clarity}
                </td>
                <td className="border px-4 py-2 text-center">
                  <a
                    href={diamond.certificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Xem
                  </a>
                </td>
                <td className="border px-4 py-2 text-center">
                  {diamond.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DiamondList;
