// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    if (!formData.username) formErrors.username = 'Username or Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
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
    navigate('/register');
  };

  return (
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

        {success && <span className="success">Login successful!</span>}

        <button type="submit">Login</button>
      </form>

      <div className="register-link">
        <span>Don't have an account?</span>
        <button onClick={goToRegister}>Register here</button>
      </div>
    </div>
  );
};

export default LoginForm;
