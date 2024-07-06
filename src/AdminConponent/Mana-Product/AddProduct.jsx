import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertProduct } from "../../server/api"; // Assuming you have an API function for adding products
import { Editor } from '@tinymce/tinymce-react';

function AddProduct() {


    const [formData, setFormData] = useState({
        name: '',
        materialId: '',
        gemId: '',
        categoryId: '',
        materialCost: '',
        gemCost: '',
        productCost: '',
        image: '',
        quantityGem: '',
        size: '',
        warrantyCard: '',
        description: '',
        quantityMaterial: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.materialId) tempErrors.materialId = "Material ID is required";
        // if (!formData.gemId) tempErrors.gemId = "Gem ID is required";
        if (!formData.categoryId) tempErrors.categoryId = "Category ID is required";
        if (!formData.materialCost) tempErrors.materialCost = "Material cost is required";
        // if (!formData.gemCost) tempErrors.gemCost = "Gem cost is required";
        if (!formData.productCost) tempErrors.productCost = "Product cost is required";
        if (!formData.image) tempErrors.image = "Image is required";
        // if (!formData.quantityGem) tempErrors.quantityGem = "Quantity of gem is required";
        if (!formData.size) tempErrors.size = "Size is required";
        if (!formData.warrantyCard) tempErrors.warrantyCard = "Warranty card is required";
        if (!formData.description) tempErrors.description = "Description is required";
        if (!formData.quantityMaterial) tempErrors.quantityMaterial = "Quantity of material is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditorChange = (content, editor) => {
        if (formData) {
            setFormData({ ...formData, description: content });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if (validateForm()) {
            insertProduct(formData)
                .then(() => {
                    alert('Product added successfully');
                    navigate('/admin/dashboard');
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    setErrorMessage('Failed to add product');
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
                        label="Category ID"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        error={!!errors.categoryId}
                        helperText={errors.categoryId}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Material ID"
                        name="materialId"
                        value={formData.materialId}
                        onChange={handleChange}
                        error={!!errors.materialId}
                        helperText={errors.materialId}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Material Cost"
                        name="materialCost"
                        type="number"
                        value={formData.materialCost}
                        onChange={handleChange}
                        error={!!errors.materialCost}
                        helperText={errors.materialCost}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Quantity Material"
                        name="quantityMaterial"
                        type="number"
                        value={formData.quantityMaterial}
                        onChange={handleChange}
                        error={!!errors.quantityMaterial}
                        helperText={errors.quantityMaterial}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Gem ID"
                        name="gemId"
                        value={formData.gemId}
                        onChange={handleChange}
                        error={!!errors.gemId}
                        helperText={errors.gemId}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Quantity Gem"
                        name="quantityGem"
                        type="number"
                        value={formData.quantityGem}
                        onChange={handleChange}
                        error={!!errors.quantityGem}
                        helperText={errors.quantityGem}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Gem Cost"
                        name="gemCost"
                        type="number"
                        value={formData.gemCost}
                        onChange={handleChange}
                        error={!!errors.gemCost}
                        helperText={errors.gemCost}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Image"
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
                        label="Size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        error={!!errors.size}
                        helperText={errors.size}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Warranty Card"
                        name="warrantyCard"
                        value={formData.warrantyCard}
                        onChange={handleChange}
                        error={!!errors.warrantyCard}
                        helperText={errors.warrantyCard}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Product Cost"
                        name="productCost"
                        type="number"
                        value={formData.productCost}
                        onChange={handleChange}
                        error={!!errors.productCost}
                        helperText={errors.productCost}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Editor
                        apiKey='0ywy09pu3fif7crqzb9n5eygtvh5hwbbpj4vold92e6q9r11'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofDescriptions footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                        }}
                        onInit={(evt, editor) => editorRef.current = editor}
                        onEditorChange={handleEditorChange}
                    />
                </Grid>

            </Grid>
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Product</Button>
        </Box>
    );
}

export default AddProduct;
