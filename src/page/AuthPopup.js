import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { jwtDecode } from "jwt-decode";

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const API_URL_Login = "http://localhost:8090/test/login";
  const API_URL_Register = "http://localhost:8090/test/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleFailure = (error) => {
    setError("Google login failed. Please try again.");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "userName is required.";
    }
    if (!values.passWord) {
      errors.passWord = "passWord is required.";
    } else if (values.passWord.length < 6) {
      errors.passWord = "passWord must be at least 6 characters.";
    }
    if (!isLogin) {
      if (!values.name) {
        errors.name = "Full name is required.";
      }
      if (!values.phone) {
        errors.phone = "phone is required.";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "phone must be a 10-digit number.";
      }
      if (!values.email) {
        errors.email = "email is required.";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email =
          "email format is invalid. email must be in the format of 'abc@gmail.com'";
      }
      if (!values.address) {
        errors.address = "address is required.";
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  const handleLogin = async () => {
    try {
      const url = API_URL_Login;
      const response = await axios.post(url, {
        userName: formData.userName,
        passWord: formData.passWord,
      });

      if (response.status !== 200) {
        throw new Error("Login failed!");
      }
      const data = response.data;
      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);

      const decodedToken = jwtDecode(accessToken);
      const user = decodedToken.payload;

      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const registerUrl = API_URL_Register;
      const registrationResponse = await axios.post(registerUrl, {
        userName: formData.userName,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        passWord: formData.passWord,
      });

      if (registrationResponse.status !== 201) {
        throw new Error("Registration failed!");
      }

      const data = registrationResponse.data;
      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);

      const decodedToken = jwtDecode(accessToken);
      const user = decodedToken.user || decodedToken;

      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-630px relative">
        <button className="absolute top-3 right-3 text-2xl" onClick={onClose}>
          &times;
        </button>
        <div className="flex justify-center items-center mb-6">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <h3 className="text-xl font-serif text-gray-500 pl-2">Sun Shine</h3>
        </div>
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 rounded ${
              isLogin ? "bg-black text-white" : "bg-transparent text-black"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 rounded ${
              !isLogin ? "bg-black text-white" : "bg-transparent text-black"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin && (
            <>
              <input
                type="text"
                name="userName"
                placeholder="userName"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.userName && (
                <p className="text-red-500">{formErrors.userName}</p>
              )}
              <input
                type="passWord"
                name="passWord"
                placeholder="passWord"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.passWord && (
                <p className="text-red-500">{formErrors.passWord}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 text-white rounded hover:bg-black"
              >
                Login
              </button>
              <p className="text-center my-4">---Or login with---</p>
              <div className="flex justify-center">
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
                name="userName"
                placeholder="userName"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.userName && (
                <p className="text-red-500">{formErrors.userName}</p>
              )}
              <input
                type="text"
                name="name"
                placeholder="Full name"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.name}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.name && (
                <p className="text-red-500">{formErrors.name}</p>
              )}
              <input
                type="text"
                name="phone"
                placeholder="phone"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.phone}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.phone && (
                <p className="text-red-500">{formErrors.phone}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.email}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
              <input
                type="text"
                name="address"
                placeholder="address"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.address}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.address && (
                <p className="text-red-500">{formErrors.address}</p>
              )}
              <input
                type="passWord"
                name="passWord"
                placeholder="passWord"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.passWord && (
                <p className="text-red-500">{formErrors.passWord}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
              >
                Register
              </button>
            </>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthPopup;
