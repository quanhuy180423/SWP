import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-around bg-gray-200 p-6 mt-5">
      <div className="w-1/5">
        <ul>
          <li className="flex items-center">
            <img src="./img/diamond.png" alt="logo" className="w-16 h-16" />
            <h3 className="text-gray-600 pl-2 text-xl font-serif">Sun Shine</h3>
          </li>
          <li className="mt-2 text-gray-600">Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
          <li className="mt-2 text-gray-600">Số điện thoại: 0123 456 789</li>
          <li className="mt-2 text-gray-600">Email: info@example.com</li>
        </ul>
      </div>
      <div className="w-1/5">
        <h4 className="text-lg text-gray-800 mb-2">Sản phẩm</h4>
        <ul>
          <li className="text-gray-600">Nhẫn</li>
          <li className="mt-2 text-gray-600">Vòng cổ</li>
          <li className="mt-2 text-gray-600">Vòng tay</li>
          <li className="mt-2 text-gray-600">Nhẫn cưới</li>
        </ul>
      </div>
      <div className="w-1/5">
        <h4 className="text-lg text-gray-800 mb-2">Chính sách đặt hàng</h4>
        <ul>
          <li className="text-gray-600">Chính sách & bảo hành</li>
          <li className="mt-2 text-gray-600">Điều khoản mua hàng</li>
        </ul>
      </div>
      <div className="w-1/5">
        <h4 className="text-lg text-gray-800 mb-2">Hỗ trợ khách hàng</h4>
        <ul>
          <li className="text-gray-600">Góp ý</li>
          <li className="mt-2 text-gray-600">Hướng dẫn đặt hàng</li>
          <li className="mt-2 text-gray-600">Hướng dẫn kiểm tra đơn hàng</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
