import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { insertBlogs } from "../../server/api"; // Assuming you have an API function for adding blogs
import { Editor } from '@tinymce/tinymce-react';

function AddBlogs() {
    // Parse the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    const [formData, setFormData] = useState({
        userId: user.Id || '',
        title: '',
        content: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.title) tempErrors.title = "Title is required";
        if (!formData.content) tempErrors.content = "Content is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditorChange = (content, editor) => {
        if (formData) {
            setFormData({ ...formData, content: content });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(user.Id)
        if (validateForm()) {
            // Assuming you have a function addBlog in your server/api module
            insertBlogs(formData)
                .then(() => {
                    alert('Blog added successfully');
                    navigate('/admin/dashboard');
                })
                .catch(error => {
                    console.error('Error adding blog:', error);
                    setErrorMessage('Failed to add blog');
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
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Editor
                        apiKey='cy6nfm793cpsebdngtbam1krs668s4g1qgwmc0otd5e4cmlc'
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
            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>Add Blog</Button>
        </Box>
    );
}

export default AddBlogs;
