import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertCostGem } from "../../server/api";

function AddDiamondCost() {
    const { GemId } = useParams();
    const [formData, setFormData] = useState({
        PurchasePrice: '',
        Price: '',
        GemId: GemId || '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prev) => ({ ...prev, GemId: GemId }));
        console.log(GemId);
    }, [GemId]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.PurchasePrice) tempErrors.PurchasePrice = "Purchase Price is required";
        if (!formData.Price) tempErrors.Price = "Price is required";
        if (!formData.GemId) tempErrors.GemId = "Gem ID is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const cleanFormData = {
                ...formData,
                PurchasePrice: formData.PurchasePrice.replace(/\./g, ''),
                Price: formData.Price.replace(/\./g, '')
            };

            insertCostGem(cleanFormData)
                .then(() => {
                    alert('Cost Gem added successfully');
                    navigate('/admin/manage-diamond');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Gem already exists');
                    } else {
                        console.error('Error adding cost gem:', error);
                    }
                });
        }
    };

    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const rawValue = value.replace(/[^\d]/g, ""); // Remove any non-numeric characters
        const formattedValue = formatNumber(rawValue); // Format the number with dots

        setFormData({ ...formData, [name]: formattedValue });
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
                        label="Gem ID"
                        name="GemId"
                        value={formData.GemId}
                        onChange={handleChange}
                        error={!!errors.GemId}
                        helperText={errors.GemId}
                        fullWidth
                        disabled // Disable the Gem ID field to prevent changes
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Cost Gem</Button>
        </Box>
    );
}

export default AddDiamondCost;
