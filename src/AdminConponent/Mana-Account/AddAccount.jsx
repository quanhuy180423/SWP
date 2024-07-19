import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, colors } from '@mui/material';
import { registerUser } from "../../server/api";
import Header from '../Header/Header';

function AddAccount() {
    const [formData, setFormData] = useState({
        UserName: '',
        PassWord: '',
        confirmPassWord: '',
        Name: '',
        Phone: '',
        Address: '',
        Email: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.UserName) tempErrors.UserName = "UserName is required";
        if (!formData.PassWord) tempErrors.PassWord = "PassWord is required";
        if (formData.PassWord !== formData.confirmPassWord) tempErrors.confirmPassWord = "PassWords do not match";
        if (!formData.Name) tempErrors.Name = "Name is required";
        else if (formData.Name.trim().split(' ').length < 1) tempErrors.Name = "Name must have more than 1 words";
        if (!formData.Phone) tempErrors.Phone = "Phone number is required";
        if (!formData.Address) tempErrors.Address = "Address is required";
        if (!formData.Email) tempErrors.Email = "Email is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            registerUser(formData)
                .then(() => {
                    alert('Account added successfully');
                    navigate('/admin');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Account already exists');
                    } else {
                        console.error('Error adding account:', error);
                    }
                });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header title='ADD ACCOUNT' subtitle='' />
            <Box
                width='100%'
                display='flex'
                justifyContent='end'
            >
                <Button variant="contained" style={{
                    color: 'black', backgroundColor: colors.orange[400],
                }} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box >
            <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
                            label="Confirm PassWord"
                            name="confirmPassWord"
                            type="password"
                            value={formData.confirmPassWord}
                            onChange={handleChange}
                            error={!!errors.confirmPassWord}
                            helperText={errors.confirmPassWord}
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
                    <Grid item xs={12} sm={12} md={12}>
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

                </Grid>
                <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Account</Button>
            </Box>
        </>

    );
}

export default AddAccount;
