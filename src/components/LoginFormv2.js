// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
//add demo
// import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username)
      formErrors.username = "Username or Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSuccess(true);
    } else {
      setErrors(formErrors);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="logo-login-form">
            <Link to={'/'} >
              <img src="./logo.png" alt="logo cua hang" className="logo" />
            </Link>
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username/Email"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          {success && <span className="success">Login successful!</span>}

          <div className="login-button">
            <button type="submit">Login</button>
          </div>
          <div className="register-link">
            <span>Don't have an account?</span>
            <button onClick={goToRegister}>Sign up</button>
          </div>
        </form>

        <div className="">
          <img src="./hinhLogin.png" alt="hinh login" className="hinhLogin" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
