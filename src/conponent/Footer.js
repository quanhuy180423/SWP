import React from "react";
import "../css/Footer.css"; // Import CSS file for styling (optional)

const Footer = () => {
  return (
    <footer>
      <div className="footer-column">
        <ul>
          <li>
            <div className="logo-h3-footer">
              <div>
                <img src="./img/diamond.png" alt="logo" />
              </div>
              <div>
                <h3>Sun Shine</h3>
              </div>
            </div>
          </li>
          <li>Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
          <li>Số điện thoại: 0123 456 789</li>
          <li>Email: info@example.com</li>
        </ul>
      </div>
      <div className="footer-column">
        <div className="footer-column-product">
          <h4>Sản phẩm</h4>
          <ul>
            <li>Nhẫn</li>
            <li>Vòng cổ</li>
            <li>Vòng tay</li>
            <li>Nhẫn cưới</li>
          </ul>
        </div>
      </div>
      <div className="footer-column">
        <h4>Chính sách đặt hàng</h4>
        <ul>
          <li>Chính sách & bảo hành</li>
          <li>Điều khoản mua hàng</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Hỗ trợ khách hàng</h4>
        <ul>
          <li>Góp ý</li>
          <li>Hướng dẫn đặt hàng</li>
          <li>Hướng dẫn kiểm tra đơn hàng</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
