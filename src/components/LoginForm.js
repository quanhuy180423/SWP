// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
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
    if (!formData.username) formErrors.username = 'Username or Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
    //   try {
    //     const response = await axios.post('http://localhost:5000/api/login', formData);
    //     if (response.status === 200) {
    //       setSuccess(true);
    //       // Handle successful login (e.g., save token, redirect)
    //     }
    //   } catch (error) {
    //     console.error('Failed to login:', error);
    //     setErrors({ submit: 'Failed to login. Please try again.' });
    //   }
    console.log('Form submitted successfully');
    } else {
      setErrors(formErrors);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // Handle successful Google login (e.g., send token to backend)
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <GoogleOAuthProvider clientId="522824290406-v4v3c8bcv7dev5qanhfkmsm68kmu9eig.apps.googleusercontent.com">
      <div>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Username/Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {errors.submit && <span className="error">{errors.submit}</span>}
          {/* {success && <span className="success">Login successful!</span>} */}

          <button type="submit">Login</button>
        </form>

        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>

        <div className="register-link">
          <span>Don't have an account?</span>
          <button onClick={goToRegister}>Register here</button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
