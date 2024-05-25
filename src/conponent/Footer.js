// src/components/Footer.js
import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-logo">
          <div className="logo-h3-footer">
            <div>
              <img src="./img/diamond.png" alt="logo" />
            </div>
            <div>
              <h3>Sun Shine</h3>
            </div>
          </div>
          <div>
            <img
              src="./img/chung-nhan-bo-ct.jpg"
              alt="chứng nhận công thướng"
            />
          </div>
        </div>
        <div className="footer-sections">
          <div className="footer-section">
            <h4 className="footer-title">Về Thế Giới Kim Cương</h4>
            <ul className="footer-menu">
              <li>
                <a href="/pages/about-us">Giới Thiệu</a>
              </li>
              <li>
                <a href="/pages/destination">Hệ Thống Cửa Hàng</a>
              </li>
              <li>
                <a href="/pages/career">Tuyển Dụng</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Dịch Vụ Khách Hàng</h4>
            <ul className="footer-menu">
              <li>
                <a href="/pages/huong-dan-mua-hang">Hướng Dẫn Mua Hàng</a>
              </li>
              <li>
                <a href="/pages/dieu-khoan-su-dung">Điều Khoản Sử Dụng</a>
              </li>
              <li>
                <a href="/pages/chinh-sach-bao-mat">Chính Sách Bảo Mật</a>
              </li>
              <li>
                <a href="/pages/thu-doi-bao-hanh">Thu Đổi Bảo Hành</a>
              </li>
              <li>
                <a href="/pages/huong-dan-su-dung">Hướng Dẫn Sử Dụng</a>
              </li>
              <li>
                <a href="/pages/huong-dan-do-size-nhan">Hướng Dẫn Đo Size</a>
              </li>
              <li>
                <a href="/pages/tra-gop">Mua Hàng Trả Góp</a>
              </li>
              <li>
                <a href="/pages/phuong-thuc-thanh-toan">
                  Phương Thức Thanh Toán
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Kim Cương</h4>
            <ul className="footer-menu">
              <li>
                <a href="/collections/kim-cuong-lucky-star">
                  Kim Cương LUCKY STAR
                </a>
              </li>
              <li>
                <a href="/collections/kim-cuong-pho-thong">
                  Kim Cương Viên GIA
                </a>
              </li>
              <li>
                <a href="/pages/gia-kim-cuong">Bảng Giá Kim Cương</a>
              </li>
              <li>
                <a href="/pages/cam-nang-kim-cuong">Cẩm Nang Kim Cương</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Trang sức</h4>
            <ul className="footer-menu">
              <li>
                <a href="/collections/nhan">Nhẫn</a>
              </li>
              <li>
                <a href="/collections/nhan-cuoi">Nhẫn Cưới</a>
              </li>
              <li>
                <a href="/collections/mat">Mặt Dây</a>
              </li>
              <li>
                <a href="/collections/lac-tay">Lắc Tay</a>
              </li>
              <li>
                <a href="/collections/vong-deo-tay">Vòng Tay</a>
              </li>
              <li>
                <a href="/collections/day-chuyen">Dây Chuyền</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Bộ Sưu Tập Trang Sức</h4>
            <ul className="footer-menu">
              <li>
                <a href="/collections/bo-trang-suc-quy-ong">
                  BST Trang Sức Quý Ông
                </a>
              </li>
              <li>
                <a href="/collections/nhan-nu">BST Nhẫn Dành Cho Phái Nữ</a>
              </li>
              <li>
                <a href="/collections/hoa-tai">BST Hoa Tai</a>
              </li>
              <li>
                <a href="/collections/mat">BST Mặt Dây</a>
              </li>
              <li>
                <a href="/collections/trang-suc-bo">Trang Sức Bộ</a>
              </li>
              <li>
                <a href="/collections/nhan-cuoi-1">BST Nhẫn Cưới</a>
              </li>
              <li>
                <a href="/collections/bo-suu-tap-nhan-cau-hon">
                  BST Nhẫn Cầu Hôn
                </a>
              </li>
              <li>
                <a href="/collections/trang-suc-vang-24k">Trang Sức Vàng 24K</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <p>Công ty Cổ phần TGKC – Thành viên Tập đoàn DOJI</p>
          <p>
            Trụ sở chính: 59 Đường số 27, Phường 6, Quận Gò Vấp, Thành phố Hồ
            Chí Minh, Việt Nam.
          </p>
          <p>
            Điện thoại: <a href="tel: 0123456789">0123456789</a>
          </p>
          <p>
            Hotline: <a href="tel:0123456789">0123456789</a> (Miễn phí cước)
          </p>
          <p>Email: info@gamil.com</p>
          <p>
            Mã số Doanh Nghiệp: 0123456789, Ngày cấp: 25/03/2019, Nơi cấp: SỞ KẾ
            HOẠCH VÀ ĐẦU TƯ THÀNH PHỐ HỒ CHÍ MINH
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
