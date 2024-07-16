import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { insertProduct, getAllMaterial, getAllCategories } from "../../server/api"; // Assuming you have API functions for fetching materials and categories
import { Editor } from '@tinymce/tinymce-react';
import handleUploadImages from "../../firebase/HandleUploadToFirebase"
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

    useEffect(() => {
        // Fetch materials and categories
        getAllMaterial()
            .then(response => setMaterials(response.data))
            .catch(error => console.error('Error fetching materials:', error));

        getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Name) tempErrors.name = "Name is required";
        if (!formData.MaterialId) tempErrors.materialId = "Material is required";
        if (!formData.CategoryId) tempErrors.categoryId = "Category is required";
        if (!formData.ProductCost) tempErrors.productCost = "Product cost is required";
        if (!formData.Image.length) tempErrors.images = "At least one image is required";
        if (!formData.Size) tempErrors.size = "Size is required";
        if (!formData.WarrantyCard) tempErrors.warrantyCard = "Warranty card is required";
        if (!formData.Description) tempErrors.description = "Description is required";
        if (!formData.QuantityGem) tempErrors.quantityMaterial = "Quantity of material is required";
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
            try {
                if (formData.Image.length > 0) {
                    const imageUrls = await handleUploadImages(formData.Image);
                    formData.Image = imageUrls;
                }
                console.log(formData)
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
                    <TextField
                        label="Gem ID"
                        name="GemId"
                        value={formData.GemId}
                        onChange={handleChange}
                        error={!!errors.GemId}
                        helperText={errors.GemId}
                        fullWidth
                    />
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
                        label="Product Cost"
                        name="ProductCost"
                        type="number"
                        value={formData.ProductCost}
                        onChange={handleChange}
                        error={!!errors.ProductCost}
                        helperText={errors.ProductCost}
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
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Product</Button>
        </Box>
    );
}

export default AddProduct;
