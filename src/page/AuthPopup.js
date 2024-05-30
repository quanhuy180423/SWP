import React, { useState } from "react";
import "../css/Registration.css";
import { GoogleLogin } from "@react-oauth/google";

const AuthPopup = ({ onClose }) => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    phone: "",
    email: "",
    address: ""
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
      const response = await fetch("http://localhost:8080/google-login", {
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
      try {
        const url = "https://6658c1015c3617052649ba18.mockapi.io/UserAPI/User"; // Đảm bảo rằng URL này là chính xác trong MockAPI
        console.log("Login URL:", url);
        console.log(formData.username, formData.password)
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed!");
        }

        const data = await response.json();
        console.log("Login successful!", data);
        onClose();
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const checkUserUrl = "https://6655a3763c1d3b60293a7722.mockapi.io/api/login/users";
        console.log("Check User URL:", checkUserUrl);

        const checkUserResponse = await fetch(checkUserUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!checkUserResponse.ok) {
          throw new Error("Failed to check user!");
        }

        const users = await checkUserResponse.json();
        const userExists = users.some(user => user.email === formData.email);

        if (userExists) {
          setError("User already exists!");
        } else {
          const registerUrl = "https://6655a3763c1d3b60293a7722.mockapi.io/api/login/users";
          console.log("Register URL:", registerUrl);

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
          console.log("Registration successful!", registrationData);
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
