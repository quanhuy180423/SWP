import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, InputLabel } from '@mui/material';
import handleUploadImages from "../../firebase/HandleUploadToFirebase";
import { insertGem } from "../../server/api"; // API function to add a diamond

function AddDiamond() {
    const [formData, setFormData] = useState({
        Name: '',
        Color: '',
        CaraWeight: '',
        Clarity: '',
        Cut: '',
        AddedDate: new Date().toISOString().split('T')[0], // Get current date
        Origin: '',
        Image: [], // Changed to store multiple Image URLs
        Size: '',
        Identification: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Name) tempErrors.Name = "Name is required";
        if (!formData.Color) tempErrors.Color = "Color is required";
        if (!formData.CaraWeight) tempErrors.CaraWeight = "Cara Weight is required";
        if (!formData.Clarity) tempErrors.Clarity = "Clarity is required";
        if (!formData.Cut) tempErrors.Cut = "Cut is required";
        if (!formData.Size) tempErrors.Size = "Size is required";
        if (!formData.Origin) tempErrors.Origin = "Origin is required";
        if (formData.Image.length === 0) tempErrors.Image = "Image is required";
        if (!formData.Identification) tempErrors.Identification = "Identification is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log('Submitting form data:', formData); // Add log to check form data
                if (formData.Image.length > 0) {
                    const ImageUrls = await handleUploadImages(formData.Image);
                    formData.Image = ImageUrls;
                    console.log('Uploaded Image URLs:', ImageUrls); // Add log to check uploaded image URLs
                }

                insertGem(formData)
                    .then(() => {
                        alert('Diamond added successfully');
                        navigate('/admin/manage-diamond');
                    })
                    .catch(error => {
                        console.error('Error adding diamond:', error);
                        if (error.response && error.response.status === 400) {
                            setErrorMessage('Diamond already exists');
                        } else {
                            setErrorMessage('Error adding diamond');
                        }
                    });
            } catch (error) {
                console.error('Error uploading images:', error);
                setErrorMessage('Error uploading images');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Image' && files) {
            setFormData({ ...formData, Image: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '75%' }}>
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
                        label="Color"
                        name="Color"
                        value={formData.Color}
                        onChange={handleChange}
                        error={!!errors.Color}
                        helperText={errors.Color}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Cara Weight"
                        name="CaraWeight"
                        value={formData.CaraWeight}
                        onChange={handleChange}
                        error={!!errors.CaraWeight}
                        helperText={errors.CaraWeight}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Clarity"
                        name="Clarity"
                        value={formData.Clarity}
                        onChange={handleChange}
                        error={!!errors.Clarity}
                        helperText={errors.Clarity}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Cut"
                        name="Cut"
                        value={formData.Cut}
                        onChange={handleChange}
                        error={!!errors.Cut}
                        helperText={errors.Cut}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Size"
                        name="Size"
                        value={formData.Size}
                        onChange={handleChange}
                        error={!!errors.Size}
                        helperText={errors.Size}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Added Date"
                        name="AddedDate"
                        value={formData.AddedDate}
                        onChange={handleChange}
                        error={!!errors.AddedDate}
                        helperText={errors.AddedDate}
                        fullWidth
                        disabled // Disable the field so user can't change the date
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Origin"
                        name="Origin"
                        value={formData.Origin}
                        onChange={handleChange}
                        error={!!errors.Origin}
                        helperText={errors.Origin}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box>
                        <InputLabel>Images</InputLabel>
                        <input
                            type="file"
                            name="Image"
                            onChange={handleChange}
                            multiple
                            style={{ display: 'block', marginTop: '8px' }}
                        />
                        {errors.Image && <Alert severity="error">{errors.Image}</Alert>}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Identification"
                        name="Identification"
                        value={formData.Identification}
                        onChange={handleChange}
                        error={!!errors.Identification}
                        helperText={errors.Identification}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Diamond</Button>
        </Box>
    );
}

export default AddDiamond;
