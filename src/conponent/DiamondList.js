import React from "react";
import { useNavigate } from "react-router-dom";
import ReadMode from "@mui/icons-material/Diamond";
const DiamondList = ({ diamonds }) => {
  const nagative = useNavigate();
  const handleViewDetail = (diamond) => {
    nagative(`/diamond-detail/${diamond.GemID}`);
  };
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
              <th className="px-4 py-2 border">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {diamonds.map((diamond, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">
                  {diamond.CaraWeight}
                </td>
                <td className="border px-4 py-2 text-center">{diamond.Cut}</td>
                <td className="border px-4 py-2 text-center">
                  {diamond.Color}
                </td>
                <td className="border px-4 py-2 text-center">
                  {diamond.Clarity}
                </td>
                <td className="border px-4 py-2 text-center">
                  <a
                    href={diamond.Identification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Xem
                  </a>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewDetail(diamond)}
                    className="text-blue-500 hover:underline"
                  >
                    <ReadMode />
                    {/* {console.log(diamond)} */}
                  </button>
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
