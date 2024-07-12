import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertMaterial } from "../../server/api";  // Make sure to update the API function accordingly

const AddMaterial = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Unit: '',

    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Name) tempErrors.Name = "Name is required";
        if (!formData.Unit) tempErrors.Unit = "Unit is required";
        // if (!formData.buyPrice) tempErrors.buyPrice = "Buy price is required";
        // if (!formData.buyPrice) tempErrors.buyPrice = "Buy price is required";
        // if (!formData.costIdMaterial) tempErrors.costIdMaterial = "Cost ID Material is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            insertMaterial(formData)  // Make sure to update the API function accordingly
                .then(() => {
                    alert('Material added successfully');
                    navigate('/admin/manage-material');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Material already exists');
                    } else {
                        console.error('Error adding material:', error);
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
                        label="Unit"
                        name="Unit"
                        value={formData.Unit}
                        onChange={handleChange}
                        error={!!errors.Unit}
                        helperText={errors.Unit}
                        fullWidth
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Buy Price"
                        Name="buyPrice"
                        value={formData.buyPrice}
                        onChange={handleChange}
                        error={!!errors.buyPrice}
                        helperText={errors.buyPrice}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Sell Price"
                        Name="sellPrice"
                        value={formData.sellPrice}
                        onChange={handleChange}
                        error={!!errors.sellPrice}
                        helperText={errors.sellPrice}
                        fullWidth
                    />
                </Grid> */}

            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Material</Button>
        </Box>
    );
}

export default AddMaterial;
