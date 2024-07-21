import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Switch, colors } from '@mui/material';
import { getProductById, updateProductById, getAllCategories, getAllMaterial } from "../../server/api"; // Assuming you have API functions for fetching and updating product details
import Header from '../Header/Header';
import handleUploadImages from '../../firebase/HandleUploadToFirebase';
import { Editor } from '@tinymce/tinymce-react';

function EditProduct() {
    const { ProductId } = useParams();
    const [formData, setFormData] = useState({
        Name: '',
        MaterialId: '',
        GemId: '',
        CategoryId: '',
        MaterialCost: '',
        GemCost: '',
        ProductCost: '',
        Image: '',
        QuantityGem: '',
        Size: '',
        WarrantyCard: '',
        Description: '',
        QuantityMaterial: '',
        Status: ''
    });
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);
    useEffect(() => {
        getProductById(ProductId)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setErrorMessage('Failed to fetch product details');
            });

        getAllCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to fetch categories');
            });

        getAllMaterial()
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
                setErrorMessage('Failed to fetch materials');
            });

    }, [ProductId]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Name) tempErrors.Name = "Name is required";
        if (!formData.MaterialId) tempErrors.MaterialId = "Material is required";
        if (!formData.GemId) tempErrors.GemId = "Gem is required";
        if (!formData.CategoryId) tempErrors.CategoryId = "Category is required";
        if (!formData.MaterialCost) tempErrors.MaterialCost = "Material cost is required";
        if (!formData.GemCost) tempErrors.GemCost = "Gem cost is required";
        if (!formData.ProductCost) tempErrors.ProductCost = "Product cost is required";
        if (!formData.Image) tempErrors.Image = "Image is required";
        if (!formData.QuantityGem) tempErrors.QuantityGem = "Quantity of gem is required";
        if (!formData.Size) tempErrors.Size = "Size is required";
        if (!formData.WarrantyCard) tempErrors.WarrantyCard = "Warranty card is required";
        if (!formData.Description) tempErrors.Description = "Description is required";
        if (!formData.QuantityMaterial) tempErrors.QuantityMaterial = "Quantity of material is required";
        // if (!formData.Status) tempErrors.Status = "Status is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditorChange = (content, editor) => {
        if (formData) {
            setFormData({ ...formData, Description: content });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (formData.Image.length > 0) {
                const imageUrls = await handleUploadImages(formData.Image);
                formData.Image = imageUrls;
            }
            updateProductById({ ...formData, ProductId })
                .then(() => {
                    alert('Product updated successfully');
                    navigate('/admin/manage-product');
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    setErrorMessage('Failed to update product');
                });
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

    const handleStatusChange = (e) => {
        setFormData({ ...formData, Status: e.target.checked ? 1 : 0 });
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
                <Header title='EDIT PRODUCT' subtitle='' />
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
                        <FormControl fullWidth error={!!errors.MaterialId}>
                            <InputLabel>Material</InputLabel>
                            <Select
                                name="MaterialId"
                                value={formData.MaterialId}
                                onChange={handleChange}
                                label="Material"
                            >
                                {materials.map((material) => (
                                    <MenuItem key={material.MaterialId} value={material.MaterialId}>
                                        {material.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.MaterialId && <Alert severity="error">{errors.MaterialId}</Alert>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="GemId"
                            name="GemId"
                            value={formData.GemId}
                            onChange={handleChange}
                            error={!!errors.GemId}
                            helperText={errors.GemId}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth error={!!errors.CategoryId}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="CategoryId"
                                value={formData.CategoryId}
                                onChange={handleChange}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.CategoryId} value={category.CategoryId}>
                                        {category.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.CategoryId && <Alert severity="error">{errors.CategoryId}</Alert>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Material Cost"
                            name="MaterialCost"
                            value={formData.MaterialCost}
                            onChange={handleChange}
                            error={!!errors.MaterialCost}
                            helperText={errors.MaterialCost}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Gem Cost"
                            name="GemCost"
                            value={formData.GemCost}
                            onChange={handleChange}
                            error={!!errors.GemCost}
                            helperText={errors.GemCost}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Product Cost"
                            name="ProductCost"
                            value={formData.ProductCost}
                            onChange={handleChange}
                            error={!!errors.ProductCost}
                            helperText={errors.ProductCost}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.Status === 1}
                                    onChange={handleStatusChange}
                                    name="Status"
                                    color="primary"
                                />
                            }
                            disabled
                            label="Status"
                        />
                        {errors.Status && <Alert severity="error">{errors.Status}</Alert>}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Quantity Gem"
                            name="QuantityGem"
                            value={formData.QuantityGem}
                            onChange={handleChange}
                            error={!!errors.QuantityGem}
                            helperText={errors.QuantityGem}
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
                            label="Warranty Card"
                            name="WarrantyCard"
                            value={formData.WarrantyCard}
                            onChange={handleChange}
                            error={!!errors.WarrantyCard}
                            helperText={errors.WarrantyCard}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Quantity Material"
                            name="QuantityMaterial"
                            value={formData.QuantityMaterial}
                            onChange={handleChange}
                            error={!!errors.QuantityMaterial}
                            helperText={errors.QuantityMaterial}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Editor
                            apiKey='os4d30ks8s1mm7ib9m5mkdik7gx1yov0gxkwelf5n5f3gz64'
                            init={{
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofDescriptions footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={handleEditorChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Update Product</Button>
            </Box>
        </>

    );
}

export default EditProduct;
