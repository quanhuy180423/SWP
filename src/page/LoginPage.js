import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import "../css/LoginPage.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://your-server-address/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Xử lý đăng nhập thành công
      console.log("Login successful:", data);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const response = await fetch("http://your-server-address/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenResponse.credential }),
      });

      if (!response.ok) {
        throw new Error("Google login failed!");
      }

      const data = await response.json();

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Xử lý đăng nhập thành công
      console.log("Google login successful:", data);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleFailure = (error) => {
    setError("Google login failed. Please try again.");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="logo-h3-login">
            <div>
              <img src="./img/diamond.png" alt="logo" />
            </div>
            <div>
              <h3>Sun Shine</h3>
            </div>
          </div>

          <h2>Đăng nhập</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <label>Username or Email:</label>
            <input
              type="text"
              placeholder="Nhập email hoặc username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Mật khẩu:</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-button">
              <button type="submit">Đăng nhập</button>
            </div>
          </form>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          <h5 className="link-signup">
            Chưa có tài khoản? <a href="/register"> Đăng kí</a>
          </h5>
        </div>

        <div className="popup-img-container">
          <div className="popup-img">
            <img src="./img/hinhLogin.png" alt="login-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
