import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "tailwindcss/tailwind.css";

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
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
      localStorage.setItem("user", JSON.stringify(data));
      onLoginSuccess(data);
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
      errors.userName = "Username is required.";
    }
    if (!values.passWord) {
      errors.passWord = "Password is required.";
    } else if (values.passWord.length < 6) {
      errors.passWord = "Password must be at least 6 characters.";
    }
    if (!isLogin) {
      if (!values.fullName) {
        errors.fullName = "Full Name is required.";
      }
      if (!values.phone) {
        errors.phone = "Phone is required.";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Phone must be a 10-digit number.";
      }
      if (!values.email) {
        errors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email =
          "Email format is invalid. Email must be in the format of 'abc@gmail.com'";
      }
      if (!values.address) {
        errors.address = "Address is required.";
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
      try {
        const url =
          "https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/User";
        const response = await axios.post(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: formData.userName,
            PassWord: formData.passWord,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed!");
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        onLoginSuccess(data);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const checkUserUrl =
          "https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User";
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
          const registerUrl =
            "https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User";
          const registrationResponse = await fetch(registerUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.userName,
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              password: formData.passWord,
            }),
          });

          if (!registrationResponse.ok) {
            throw new Error("Registration failed!");
          }

          const registrationData = await registrationResponse.json();
          localStorage.setItem(
            registrationData.id,
            JSON.stringify(registrationData)
          );
          onLoginSuccess(registrationData);
        }
      } catch (error) {
        setError(error.message);
      }
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
                placeholder="Username"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.userName && (
                <p className="text-red-500">{formErrors.userName}</p>
              )}
              <input
                type="password"
                name="passWord"
                placeholder="Password"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                className="w-full p-2 border border-gray-300 rounded"
                // required
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
                placeholder="Username"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                className="w-full p-2 border border-gray-300 rounded"
                // required
              />
              {formErrors.userName && (
                <p className="text-red-500">{formErrors.userName}</p>
              )}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.fullName}
                className="w-full p-2 border border-gray-300 rounded"
                // required
              />
              {formErrors.fullName && (
                <p className="text-red-500">{formErrors.fullName}</p>
              )}
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.phone}
                className="w-full p-2 border border-gray-300 rounded"
                // required
              />
              {formErrors.phone && (
                <p className="text-red-500">{formErrors.phone}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.email}
                className="w-full p-2 border border-gray-300 rounded"
                // required
              />
              {formErrors.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.address}
                className="w-full p-2 border border-gray-300 rounded"
                // required
              />
              {formErrors.address && (
                <p className="text-red-500">{formErrors.address}</p>
              )}
              <input
                type="password"
                name="passWord"
                placeholder="Password"
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                className="w-full p-2 border border-gray-300 rounded"
                // required
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
