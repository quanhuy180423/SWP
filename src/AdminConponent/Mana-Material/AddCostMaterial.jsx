import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertCostMaterial } from "../../server/api";  // Make sure to update the API function accordingly

function AddCostMaterial() {
    const { materialId } = useParams(); // Get the MaterialId from the URL parameters
    const [formData, setFormData] = useState({
        PurchasePrice: '',
        Price: '',
        MaterialId: materialId || '', // Initialize MaterialId with the value from the URL or an empty string
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prev) => ({ ...prev, MaterialId: materialId })); // Update MaterialId if it changes
        console.log(materialId)
    }, [materialId]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.PurchasePrice) tempErrors.PurchasePrice = "Purchase Price is required";
        if (!formData.Price) tempErrors.Price = "Price is required";
        if (!formData.MaterialId) tempErrors.MaterialId = "Material ID is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            insertCostMaterial(formData)  // Make sure to update the API function accordingly
                .then(() => {
                    alert('Cost Material added successfully');
                    navigate('/admin/manage-material');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Material already exists');
                    } else {
                        console.error('Error adding cost material:', error);
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
                        label="Purchase Price"
                        name="PurchasePrice"
                        value={formData.PurchasePrice}
                        onChange={handleChange}
                        error={!!errors.PurchasePrice}
                        helperText={errors.PurchasePrice}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Price"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        error={!!errors.Price}
                        helperText={errors.Price}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Material ID"
                        name="MaterialId"
                        value={formData.MaterialId}
                        onChange={handleChange}
                        error={!!errors.MaterialId}
                        helperText={errors.MaterialId}
                        fullWidth
                        disabled // Disable the Material ID field to prevent changes
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Cost Material</Button>
        </Box>
    );
}

export default AddCostMaterial;
