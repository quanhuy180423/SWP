import React from "react";
import "../css/header.css";

const Header = () => {
  return (
    <div className="header-all">
      <div class="header">
        <div class="logo-h3-head">
          <div>
            <img src="./img/diamond.png" alt="logo" />
          </div>
          <div>
            <h3>Sun Shine</h3>
          </div>
        </div>

        <div class="menu-ngang">
          <div class="search">
            <div class="search-bar">
              <input type="text" placeholder="Tìm kiếm..." />
              <button class="search-icon">
                <img src="./img/glass.png" alt="search-icon" />
              </button>
            </div>
          </div>
          <div class="menu">
            <a href="/">Trang chủ</a>
            <a href="/">Trang sức</a>
            <a href="/">Kim cương</a>
            <a href="/">Blog-tin tức</a>
            <a href="/">Liên hệ</a>
          </div>
        </div>

        <div>
          <div class="user-request">
            <div class="user">
              <img src="./img/profile-user.png" alt="profile" />
              <a href="/">Tài khoản</a>
            </div>
            <div class="request">
              <img src="./img/document.png" alt="document" />
              <a href="/">Đặt gia công</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
