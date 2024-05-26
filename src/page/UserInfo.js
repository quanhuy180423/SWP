import React, { useState } from 'react';
import '../css/UserInfo.css'; // Import CSS file

const UserInfo = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({
      name: '',
      phone: '',
      email: '',
      address: '',
      password: ''
    });
    setOrders([]);
    setCart([]);
  };

  const handleUpdateUserInfo = (updatedUserInfo) => {
    setUser(updatedUserInfo);
  };

  const handleUpdateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
    <div>
      <div className="infoacc">
        {loggedIn ? (
          <div>
            <h2>Tài khoản của {user.name}</h2>
            <ul className="menu">
              <li className="menu-item">Thông tin người dùng</li>
              <li className="menu-item">Đơn hàng</li>
              <li className="menu-item">Giỏ hàng</li>
              <li className="menu-item" onClick={handleLogout}>Đăng xuất</li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>Đăng nhập</h2>
            <button className="login-button" onClick={handleLogin}>Đăng nhập</button>
          </div>
        )}
      </div>
      {loggedIn && (
        <div className="user-info">
          <h3>Thông tin người dùng</h3>
          <form className="user-info-form">
            <label className="form-label">
              Họ và tên:
              <input type="text" value={user.name} onChange={(e) => handleUpdateUserInfo({ ...user, name: e.target.value })} />
            </label>
            <label className="form-label">
              Số điện thoại:
              <input type="text" value={user.phone} onChange={(e) => handleUpdateUserInfo({ ...user, phone: e.target.value })} />
            </label>
            <label className="form-label">
              Email:
              <input type="email" value={user.email} onChange={(e) => handleUpdateUserInfo({ ...user, email: e.target.value })} />
            </label>
            <label className="form-label">
              Địa chỉ:
              <input type="text" value={user.address} onChange={(e) => handleUpdateUserInfo({ ...user, address: e.target.value })} />
            </label>
            <label className="form-label">
              Mật khẩu:
              <input type="password" value={user.password} onChange={(e) => handleUpdateUserInfo({ ...user, password: e.target.value })} />
            </label>
            <button type="submit" className="submit-button">Cập nhật thông tin</button>
          </form>
        </div>
      )}
      {loggedIn && (
        <div className="orders">
          <h3>Đơn hàng</h3>
          <ul className="order-list">
            {orders.map((order, index) => (
              <li key={index} className="order-item">{order}</li>
            ))}
          </ul>
        </div>
      )}
      {loggedIn && (
        <div className="cart">
          <h3>Giỏ hàng</h3>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
