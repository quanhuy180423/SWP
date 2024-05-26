import React, { useState } from "react";
import "../css/Registration.css";
import { GoogleLogin } from "@react-oauth/google";

const AuthPopup = ({ onClose }) => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    // Dữ liệu của form
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Lưu thông tin đăng nhập vào localStorage với key là email và value là password
      localStorage.setItem(formData.email, formData.password);

      // Giao tiếp với server để thực hiện xác thực người dùng sử dụng key là username hoặc email
      try {
        const response = await fetch("http://your-server-address/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed!");
        }

        // Xử lý đăng nhập thành công
        console.log("Login successful!");
        onClose();
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Lưu thông tin đăng ký vào localStorage với key là email và value là họ tên
      localStorage.setItem(formData.email, formData.fullName);

      // Giao tiếp với server để kiểm tra người dùng đã tồn tại hay chưa bằng cách tìm kiếm username hoặc email
      try {
        const response = await fetch("http://your-server-address/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail: formData.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to check user!");
        }

        const data = await response.json();

        if (data.exists) {
          // Thông báo cho người dùng nếu người dùng đã tồn tại
          setError("User already exists!");
        } else {
          // Nếu người dùng chưa tồn tại, thực hiện insert thông tin xuống database
          const registrationResponse = await fetch(
            "http://your-server-address/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                fullName: formData.fullName,
                // Các trường thông tin khác của người dùng
              }),
            }
          );

          if (!registrationResponse.ok) {
            throw new Error("Registration failed!");
          }

          // Xử lý đăng ký thành công
          console.log("Registration successful!");
          onClose();
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="auth-popup-overlay">
        <div className="auth-popup">
          <div className="auth-popup-content">
            <div className="close" onClick={onClose}>
              &times;
            </div>
            <div className="auth-popup-header">
              <button
                className={`toggle-button ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`toggle-button ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit} className="login-form">
              {/* Form đăng nhập */}
              {isLogin && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Login</button>
                  <p>---Đăng nhập bằng mạng xã hội---</p>
                  <div className="google-login">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleFailure}
                    />
                  </div>
                  <div className="logo-h3-login">
                    <div>
                      <img src="./img/diamond.png" alt="logo" />
                    </div>
                    <div>
                      <h3>Sun Shine</h3>
                    </div>
                  </div>
                </>
              )}

              {/* Form đăng ký */}
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                  />
                  <div className="password-container">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="gender-container">
                    {/* Các trường khác */}
                  </div>
                  <label className="agree-container">
                    {/* Checkbox đồng ý */}
                  </label>
                  <button type="submit">Register</button>
                  <div className="logo-h3-login">
                    <div>
                      <img src="./img/diamond.png" alt="logo" />
                    </div>
                    <div>
                      <h3>Sun Shine</h3>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPopup;
