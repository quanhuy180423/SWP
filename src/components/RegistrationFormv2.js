// src/components/RegistrationForm.js
import React, { useState } from 'react';
// import axios from 'axios';

const RegistrationFormv2 = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;  // Example: simple validation for 10 digit phone number

    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Email must be a valid @gmail.com address';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 8 || formData.password.length > 23) {
      formErrors.password = 'Password must be between 8 and 23 characters';
    }

    if (formData.password !== formData.passwordConfirm) {
      formErrors.passwordConfirm = 'Passwords do not match';
    }

    if (!formData.address) formErrors.address = 'Address is required';

    if (!formData.phone) {
      formErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = 'Phone number must be a valid 10 digit number';
    }

    return formErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formErrors = validateForm();
  //   if (Object.keys(formErrors).length === 0) {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/register', formData);
  //       if (response.status === 200) {
  //         setSuccess(true);
  //       }
  //     } catch (error) {
  //       console.error('Failed to submit form:', error);
  //       setErrors({ submit: 'Failed to submit form. Please try again.' });
  //     }
  //   } else {
  //     setErrors(formErrors);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted successfully', formData);
      // Call an API or perform further processing here
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
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
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
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

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {errors.submit && <span className="error">{errors.submit}</span>}
      {/* {success && <span className="success">Registration successful!</span>} */}

      <button type="submit">Register</button>
     
    </form>
  );
};

export default RegistrationFormv2;
