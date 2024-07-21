import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, colors } from '@mui/material';
import { insertCostMaterial } from "../../server/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCostMaterial() {
    const { MaterialId } = useParams();
    const [formData, setFormData] = useState({
        PurchasePrice: '',
        Price: '',
        MaterialId: MaterialId || '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setFormData((prev) => ({ ...prev, MaterialId: MaterialId }));
        console.log(MaterialId)
    }, [MaterialId]);

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
            insertCostMaterial(formData)
                .then(() => {
                    toast.success('Cost Material added successfully');
                    navigate('/admin/manage-material');
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        toast.error('Material already exists');
                    } else {
                        console.error('Error adding cost material:', error);
                        toast.error('An error occurred');
                    }
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'PurchasePrice' || name === 'Price') {
            const formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            setFormData({ ...formData, [name]: formattedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const formatNumber = (number) => {
        if (!number) return '';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
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
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '75%' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Purchase Price"
                            name="PurchasePrice"
                            value={formatNumber(formData.PurchasePrice)}
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
                            value={formatNumber(formData.Price)}
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
                            disabled
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Cost Material</Button>
            </Box>
            <ToastContainer />
        </>
    );
}

export default AddCostMaterial;
