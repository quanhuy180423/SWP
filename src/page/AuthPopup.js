import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Container,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { jwtDecode } from "jwt-decode";
import "tailwindcss/tailwind.css";

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
      <Container component={Paper} className="relative p-6 w-96">
        <IconButton className="absolute top-3 right-3" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <div className="flex justify-center items-center mb-6">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <Typography variant="h6" className="font-serif text-gray-500 pl-2">
            Sun Shine
          </Typography>
        </div>
        <div className="flex justify-around mb-6">
          <Button
            variant={isLogin ? "contained" : "outlined"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "contained" : "outlined"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Button>
        </div>
        <Typography variant="h6" className="text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin && (
            <>
              <TextField
                label="Username"
                name="userName"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                error={!!formErrors.userName}
                helperText={formErrors.userName}
              />
              <TextField
                label="Password"
                name="passWord"
                type="password"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                error={!!formErrors.passWord}
                helperText={formErrors.passWord}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
              <Divider className="my-4" />
              <Typography align="center">--- Or login with ---</Typography>
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
              <TextField
                label="Username"
                name="userName"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.userName}
                error={!!formErrors.userName}
                helperText={formErrors.userName}
              />
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.name}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.phone}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.email}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.address}
                error={!!formErrors.address}
                helperText={formErrors.address}
              />
              <TextField
                label="Password"
                name="passWord"
                type="password"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.passWord}
                error={!!formErrors.passWord}
                helperText={formErrors.passWord}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </>
          )}
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </form>
      </Container>
    </div>
  );
};

export default AuthPopup;
