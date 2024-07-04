import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertBlogs } from "../../server/api"; // Assuming you have an API function for adding blogs

function AddBlogs() {
    // Parse the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    const [formData, setFormData] = useState({
        userId: user.Id || '',
        title: '',
        content: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.title) tempErrors.title = "Title is required";
        if (!formData.content) tempErrors.content = "Content is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(user.Id)
        if (validateForm()) {
            // Assuming you have a function addBlog in your server/api module
            insertBlogs(formData)
                .then(() => {
                    alert('Blog added successfully');
                    navigate('/admin/dashboard');
                })
                .catch(error => {
                    console.error('Error adding blog:', error);
                    setErrorMessage('Failed to add blog');
                });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '75%' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Content"
                        name="content"
                        multiline
                        rows={4}
                        value={formData.content}
                        onChange={handleChange}
                        error={!!errors.content}
                        helperText={errors.content}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Blog</Button>
        </Box>
    );
}

export default AddBlogs;
