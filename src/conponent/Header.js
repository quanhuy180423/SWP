// src/components/Header.js
import React, { useState } from "react";
import "../css/header.css";
import AuthPopup from "../page/AuthPopup";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="header-all">
      <div className="header">
        <div className="logo-h3-head">
          <div>
            <img src="./img/diamond.png" alt="logo" />
          </div>
          <div>
            <h3>Sun Shine</h3>
          </div>
        </div>

        <div className="menu-ngang">
          <div className="search">
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm..." />
              <button className="search-icon">
                <img src="./img/glass.png" alt="search-icon" />
              </button>
            </div>
          </div>
          <div className="menu">
            <a href="/">Trang chủ</a>
            <a href="/">Trang sức</a>
            <a href="/diamondpage">Kim cương viên</a>
            <a href="/blog">Blog-tin tức</a>
            <a href="/order-form">Đặt hàng</a>
          </div>
        </div>

        <div>
          <div className="user-request">
            <div className="user">
              <a href="/userinfo">
                <img src="./img/profile-user.png" alt="profile" />
              </a>

              <button className="openButton" onClick={openPopup}>
                Tài khoản
              </button>
            </div>
            <div className="cart">
              <img src="./img/shopping-bag.png" alt="document" />
              <a href="/order-form">Đặt gia công</a>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <AuthPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;
