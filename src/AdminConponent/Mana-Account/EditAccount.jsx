import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getUserById, updateUser } from "../../server/api"; // Assuming you have API functions for fetching and updating user details
import Header from '../Header/Header';

function EditAccount() {
    const { UserId } = useParams();
    const [formData, setFormData] = useState({
        UserName: '',
        PassWord: '',
        Name: '',
        Phone: '',
        Address: '',
        Email: '',
        Role: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(UserId)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setErrorMessage('Failed to fetch user details');
            });

    }, [UserId]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.UserName) tempErrors.UserName = "UserName is required";
        if (!formData.Name) tempErrors.Name = "Name is required";
        else if (formData.Name.trim().split(' ').length < 3) tempErrors.Name = "Name must have more than 2 words";
        if (!formData.Phone) tempErrors.Phone = "Phone number is required";
        if (!formData.Address) tempErrors.Address = "Address is required";
        if (!formData.Email) tempErrors.Email = "Email is required";
        if (!formData.Role) tempErrors.Role = "Role is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            updateUser(UserId, formData)
                .then(() => {
                    alert('Account updated successfully');
                    navigate('/admin');
                })
                .catch(error => {
                    console.error('Error updating account:', error);
                    setErrorMessage('Failed to update account');
                });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header title='EDIT ACCOUNT' subtitle='' />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '75%' }}>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="UserName"
                        name="UserName"
                        value={formData.UserName}
                        onChange={handleChange}
                        error={!!errors.UserName}
                        helperText={errors.UserName}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        error={!!errors.Name}
                        helperText={errors.Name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="PassWord"
                        name="PassWord"
                        type="password"
                        value={formData.PassWord}
                        onChange={handleChange}
                        error={!!errors.PassWord}
                        helperText={errors.PassWord}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        error={!!errors.Phone}
                        helperText={errors.Phone}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Email"
                        name="Email"
                        type="email"
                        value={formData.Email}
                        onChange={handleChange}
                        error={!!errors.Email}
                        helperText={errors.Email}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Address"
                        name="Address"
                        value={formData.Address}
                        onChange={handleChange}
                        error={!!errors.Address}
                        helperText={errors.Address}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth error={!!errors.Role}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="Role"
                            value={formData.Role}
                            onChange={handleChange}
                            label="Role"
                        >
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Staff</MenuItem>
                            <MenuItem value={3}>User</MenuItem>
                        </Select>
                        {errors.Role && <Alert severity="error">{errors.Role}</Alert>}
                    </FormControl>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Update Account</Button>
        </Box>
    );
}

export default EditAccount;
