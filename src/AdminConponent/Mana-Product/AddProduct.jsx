import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, MenuItem, Select, InputLabel, FormControl, colors } from '@mui/material';
import { insertProduct, getAllMaterial, getAllCategories, getAllGem } from "../../server/api"; // Assuming you have API functions for fetching materials and categories
import { Editor } from '@tinymce/tinymce-react';
import handleUploadImages from "../../firebase/HandleUploadToFirebase";

function AddProduct() {
    const [formData, setFormData] = useState({
        Name: '',
        MaterialId: '',
        GemId: '',
        CategoryId: '',
        ProductCost: '',
        Image: [], // Change to handle multiple images
        QuantityGem: '',
        Size: '',
        WarrantyCard: '',
        Description: '',
        QuantityMaterial: ''
    });
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [gems, setGems] = useState([]);

    useEffect(() => {
        // Fetch materials, categories, and gems
        const fetchGems = async () => {
            try {
                const response = await getAllGem();
                setGems(response.data);
            } catch (error) {
                console.error('Error fetching gems:', error);
            }
        };
        fetchGems();
        getAllMaterial()
            .then(response => setMaterials(response.data))
            .catch(error => console.error('Error fetching materials:', error));

        getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Name) tempErrors.Name = "Name is required";
        if (!formData.MaterialId) tempErrors.MaterialId = "Material is required";
        if (!formData.CategoryId) tempErrors.CategoryId = "Category is required";
        if (!formData.ProductCost) tempErrors.ProductCost = "Product cost is required";
        if (formData.ProductCost < 0) tempErrors.ProductCost = "Product cost must be a positive number";
        if (!formData.Image.length) tempErrors.Image = "At least one image is required";
        if (!formData.Size) tempErrors.Size = "Size is required";
        if (formData.Size < 9 || formData.Size > 45) tempErrors.Size = "Size must be between 9 and 45";
        if (!formData.WarrantyCard) tempErrors.WarrantyCard = "Warranty card is required";
        if (!formData.Description) tempErrors.Description = "Description is required";
        if (!formData.QuantityMaterial) tempErrors.QuantityMaterial = "Quantity of material is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditorChange = (content, editor) => {
        setFormData({ ...formData, Description: content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                if (formData.Image.length > 0) {
                    const imageUrls = await handleUploadImages(formData.Image);
                    formData.Image = imageUrls;
                }
                await insertProduct(formData);
                alert('Product added successfully');
                navigate('/admin');
            } catch (error) {
                console.error('Error adding product:', error);
                setErrorMessage('Failed to add product');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Images' && files) {
            setFormData({ ...formData, Image: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
            </Box >

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
                        <FormControl fullWidth error={!!errors.CategoryId}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                name="CategoryId"
                                value={formData.CategoryId}
                                onChange={handleChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.CategoryId} value={category.CategoryId} style={{ color: 'black', height: '20px' }}>
                                        {category.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.CategoryId && <Alert severity="error">{errors.CategoryId}</Alert>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth error={!!errors.MaterialId}>
                            <InputLabel>Material</InputLabel>
                            <Select
                                label="Material"
                                name="MaterialId"
                                value={formData.MaterialId}
                                onChange={handleChange}
                            >
                                {materials.map((material) => (
                                    <MenuItem key={material.MaterialId} value={material.MaterialId} style={{ color: 'black', height: '20px' }}>
                                        {material.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.MaterialId && <Alert severity="error">{errors.MaterialId}</Alert>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Quantity Material"
                            name="QuantityMaterial"
                            type='number'
                            value={formData.QuantityMaterial}
                            onChange={handleChange}
                            error={!!errors.QuantityMaterial}
                            helperText={errors.QuantityMaterial}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth error={!!errors.GemId}>
                            <InputLabel>Gem ID</InputLabel>
                            <Select
                                label="Gem ID"
                                name="GemId"
                                value={formData.GemId}
                                onChange={handleChange}
                            >
                                {gems.map((gem) => (
                                    <MenuItem key={gem.GemId} value={gem.GemId} style={{ color: 'black', height: '20px' }}>
                                        {gem.GemId}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.GemId && <Alert severity="error">{errors.GemId}</Alert>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Quantity Gem"
                            name="QuantityGem"
                            type='number'
                            value={formData.QuantityGem}
                            onChange={handleChange}
                            error={!!errors.QuantityGem}
                            helperText={errors.QuantityGem}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box>
                            <InputLabel>Images</InputLabel>
                            <input
                                type="file"
                                name="Images"
                                onChange={handleChange}
                                multiple
                                style={{ display: 'block', marginTop: '8px' }}
                            />
                            {errors.Image && <Alert severity="error">{errors.Image}</Alert>}
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Size"
                            name="Size"
                            type='number'
                            value={formData.Size}
                            onChange={handleChange}
                            error={!!errors.Size}
                            helperText={errors.Size}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Product Cost"
                            name="ProductCost"
                            type='number'
                            value={formData.ProductCost}
                            onChange={handleChange}
                            error={!!errors.ProductCost}
                            helperText={errors.ProductCost}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Warranty Card"
                            name="WarrantyCard"
                            value={formData.WarrantyCard}
                            onChange={handleChange}
                            error={!!errors.WarrantyCard}
                            helperText={errors.WarrantyCard}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Editor
                            apiKey='cy6nfm793cpsebdngtbam1krs668s4g1qgwmc0otd5e4cmlc' // Replace with your TinyMCE API key
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p></p>"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                        {errors.Description && <Alert severity="error">{errors.Description}</Alert>}
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>Add Product</Button>
            </Box>
        </>

    );
}

export default AddProduct;
