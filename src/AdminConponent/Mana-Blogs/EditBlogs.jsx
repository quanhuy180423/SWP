import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert, InputLabel } from '@mui/material';
import { getBlogsById, updateBlogs } from "../../server/api"; // Assuming you have an API function for fetching and updating blogs
import { Editor } from '@tinymce/tinymce-react';
import handleUploadImages from '../../firebase/HandleUploadToFirebase';

function EditBlog() {
    const { BlogId } = useParams();
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const [formData, setFormData] = useState({
        UserId: '',
        BlogId: '',
        Title: '',
        Content: '',
        Image: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogsById(BlogId);
                const blogData = response.data;
                setFormData({
                    UserId: user.Id,
                    BlogId: blogData.BlogId,
                    Title: blogData.Title,
                    Content: blogData.Content,
                    Image: '', // Initialize as empty, handle existing images separately
                });
                console.log(formData.UserId)
                setExistingImages(blogData.Image); // Assuming blogData.Image is an array of URLs
                if (editorRef.current) {
                    editorRef.current.setContent(blogData.Content);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setErrorMessage('Failed to fetch blog data');
            }
        };

        fetchBlog();
    }, [BlogId]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.Title) tempErrors.title = "Title is required";
        if (!formData.Content) tempErrors.content = "Content is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditorChange = (content, editor) => {
        setFormData({ ...formData, Content: content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (formData.Image) {
                    const imageUrls = await handleUploadImages(formData.Image);
                    formData.Image = imageUrls;
                }
                console.log(formData)
                await updateBlogs(formData);
                alert('Blog updated successfully');
                navigate('/admin/manage-blogs');
            } catch (error) {
                console.error('Error updating blog:', error);
                setErrorMessage('Failed to update blog');
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
                <Grid item xs={12} sm={6} md={8}>
                    <TextField
                        label="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        error={!!errors.Title}
                        helperText={errors.Title}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box>
                        <InputLabel>Images</InputLabel>
                        {/* {existingImages.length > 0 && (
                            <div>
                                <p>Existing Images:</p>
                                {existingImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Existing ${index + 1}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
                                ))}
                            </div>
                        )} */}
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
                <Grid item xs={12}>
                    <Editor
                        apiKey='cy6nfm793cpsebdngtbam1krs668s4g1qgwmc0otd5e4cmlc'
                        initialValue={formData.Content}
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
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Update Blog</Button>
        </Box>
    );
}

export default EditBlog;
