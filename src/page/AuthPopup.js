import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import "../css/Registration.css";

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
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
      localStorage.setItem("user", JSON.stringify(data));
      onLoginSuccess(data);
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
      try {
        const url = "https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Login failed!");
        }
  
        const users = await response.json();
        const user = users.find(
          (user) => user.username === formData.username && user.password === formData.password
        );
  
        if (user) {
          // Lưu ID của người dùng làm khóa và các thông tin khác làm giá trị
          localStorage.setItem(user.id, JSON.stringify(user));
          onLoginSuccess(user);
        } else {
          setError("Invalid username or password!");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const checkUserUrl = "https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User";
        const checkUserResponse = await fetch(checkUserUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!checkUserResponse.ok) {
          throw new Error("Failed to check user!");
        }
  
        const users = await checkUserResponse.json();
        const userExists = users.some((user) => user.email === formData.email);
  
        if (userExists) {
          setError("User already exists!");
        } else {
          const registerUrl = "https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User";
          const registrationResponse = await fetch(registerUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              password: formData.password,
            }),
          });
  
          if (!registrationResponse.ok) {
            throw new Error("Registration failed!");
          }
  
          const registrationData = await registrationResponse.json();
          // Lưu ID của người dùng làm khóa và các thông tin khác làm giá trị
          localStorage.setItem(registrationData.id, JSON.stringify(registrationData));
          onLoginSuccess(registrationData);
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
              {isLogin && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
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
                </>
              )}
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
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
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Register</button>
                </>
              )}
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPopup;
