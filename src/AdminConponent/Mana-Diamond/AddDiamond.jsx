import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertGem } from "../../server/api"; // Giả sử bạn có một hàm API để thêm kim cương

function AddDiamond() {
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        caraWeight: '',
        clarity: '',
        cut: '',
        costIdGem: '',
        addedDate: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại
        origin: '',
        image: '',
        identification: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.color) tempErrors.color = "Color is required";
        if (!formData.caraWeight) tempErrors.caraWeight = "Cara Weight is required";
        if (!formData.clarity) tempErrors.clarity = "Clarity is required";
        if (!formData.cut) tempErrors.cut = "Cut is required";
        if (!formData.costIdGem) tempErrors.costIdGem = "Cost ID Gem is required";
        if (!formData.origin) tempErrors.origin = "Origin is required";
        if (!formData.image) tempErrors.image = "Image URL is required";
        if (!formData.identification) tempErrors.identification = "Identification is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            insertGem(formData)
                .then(() => {
                    alert('Diamond added successfully');
                    navigate('/admin/manage-diamond');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Diamond already exists');
                    } else {
                        console.error('Error adding diamond:', error);
                    }
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
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        error={!!errors.color}
                        helperText={errors.color}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Cara Weight"
                        name="caraWeight"
                        value={formData.caraWeight}
                        onChange={handleChange}
                        error={!!errors.caraWeight}
                        helperText={errors.caraWeight}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Clarity"
                        name="clarity"
                        value={formData.clarity}
                        onChange={handleChange}
                        error={!!errors.clarity}
                        helperText={errors.clarity}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Cut"
                        name="cut"
                        value={formData.cut}
                        onChange={handleChange}
                        error={!!errors.cut}
                        helperText={errors.cut}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Cost ID Gem"
                        name="costIdGem"
                        value={formData.costIdGem}
                        onChange={handleChange}
                        error={!!errors.costIdGem}
                        helperText={errors.costIdGem}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Added Date"
                        name="addedDate"
                        value={formData.addedDate}
                        onChange={handleChange}
                        error={!!errors.addedDate}
                        helperText={errors.addedDate}
                        fullWidth
                        disabled // Disable the field so user can't change the date
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        error={!!errors.origin}
                        helperText={errors.origin}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        error={!!errors.image}
                        helperText={errors.image}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Identification"
                        name="identification"
                        value={formData.identification}
                        onChange={handleChange}
                        error={!!errors.identification}
                        helperText={errors.identification}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Diamond</Button>
        </Box>
    );
}

export default AddDiamond;
