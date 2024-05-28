import React, { useState } from "react";
import Modal from "react-modal";
import "../css/UserInfo.css"; // Import CSS file
import Header from "../conponent/Header";
import Footer from "../conponent/Footer";

Modal.setAppElement("#root");

const UserInfo = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState("userInfo");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleUpdateUserInfo = (updatedUserInfo) => {
    setUser(updatedUserInfo);
  };

  const handleUpdateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const handleLogout = () => {
    // Logic để xử lý đăng xuất, ví dụ: xóa session người dùng
    setUser({
      name: "",
      phone: "",
      email: "",
      address: "",
      password: "",
    });
    setOrders([]);
    setCart([]);
    setActiveSection("userInfo");
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="infoAccForm">
        <div className="infoacc">
          <div>
            <div className="logo-h3-userInfo">
              <div>
                <img src="./img/diamond.png" alt="logo" />
              </div>
              <div>
                <h3>Sun Shine</h3>
              </div>
            </div>
            <h2>Hồ sơ của {user.name}</h2>
            <ul className="menu-user">
              <li
                className={`menu-item-user ${
                  activeSection === "userInfo" ? "active" : ""
                }`}
                onClick={() => setActiveSection("userInfo")}
              >
                Thông tin người dùng
              </li>
              <li
                className={`menu-item-user ${
                  activeSection === "orders" ? "active" : ""
                }`}
                onClick={() => setActiveSection("orders")}
              >
                Đơn hàng
              </li>
              <li
                className={`menu-item-user ${
                  activeSection === "cart" ? "active" : ""
                }`}
                onClick={() => setActiveSection("cart")}
              >
                Giỏ hàng
              </li>
              <li
                className={`menu-item-user ${
                  activeSection === "logout" ? "active" : ""
                }`}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>

        {activeSection === "userInfo" && (
          <div className="user-info">
            <h3>Thông tin người dùng</h3>
            <form className="user-info-form">
              <label className="form-label">
                Họ và tên:
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    handleUpdateUserInfo({ ...user, name: e.target.value })
                  }
                />
              </label>
              <label className="form-label">
                Số điện thoại:
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) =>
                    handleUpdateUserInfo({ ...user, phone: e.target.value })
                  }
                />
              </label>
              <label className="form-label">
                Email:
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    handleUpdateUserInfo({ ...user, email: e.target.value })
                  }
                />
              </label>
              <label className="form-label">
                Địa chỉ:
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    handleUpdateUserInfo({ ...user, address: e.target.value })
                  }
                />
              </label>
              <label className="form-label">
                Mật khẩu mới:
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    handleUpdateUserInfo({ ...user, password: e.target.value })
                  }
                />
              </label>
              <button type="submit" className="submit-button">
                Cập nhật thông tin
              </button>
            </form>
          </div>
        )}

        {activeSection === "orders" && (
          <div className="orders-user">
            <h3>Đơn hàng</h3>
            <ul className="order-list-user">
              {orders.map((order, index) => (
                <li key={index} className="order-item-user">
                  {order}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "cart" && (
          <div className="cart-user">
            <h3>Giỏ hàng</h3>
            <ul className="cart-list-user">
              {cart.map((item, index) => (
                <li key={index} className="cart-item-user">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
        contentLabel="Logout Confirmation"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Đăng xuất</h2>
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
        <div className="modal-buttons">
          <button onClick={handleLogout} className="modal-button confirm">
            Có
          </button>
          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="modal-button cancel"
          >
            Không
          </button>
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default UserInfo;
