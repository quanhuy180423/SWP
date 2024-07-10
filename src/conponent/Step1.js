import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const API_URL = "http://localhost:8090/test/getUserById";

const Step1 = ({ nextStep, updateFormData, formData }) => {
  const [localData, setLocalData] = useState({
    Name: formData.Name || "",
    Phone: formData.Phone || "",
    Address: formData.Address || "",
    Email: formData.Email || "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.Id) {
        const userId = storedUser.Id;

        try {
          const response = await axios.get(`${API_URL}?UserId=${userId}`);
          const userData = response.data;
          setLocalData({
            Name: userData.Name || "",
            Phone: userData.Phone || "",
            Address: userData.Address || "",
            Email: userData.Email || "",
          });
          updateFormData({
            UserId: userData.UserId || "",
            UserName: userData.UserName || "",
            Name: userData.Name || "",
            Phone: userData.Phone || "",
            Address: userData.Address || "",
            Email: userData.Email || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User ID not found in localStorage");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    updateFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Step 1: Personal Information
        </Typography>
        <TextField
          label="Full Name"
          name="Name"
          value={localData.Name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="Phone"
          value={localData.Phone}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="Address"
          value={localData.Address}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="Email"
          type="email"
          value={localData.Email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Step1;
