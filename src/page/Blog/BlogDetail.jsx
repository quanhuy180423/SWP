import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

const BlogDetail = () => {
    const { BlogId } = useParams();
    const [blog, setBlog] = useState(null);
    const API_URL = "http://localhost:8090/test/getBlogById";

    const getBlog = async () => {
        try {
            const response = await axios.get(`${API_URL}?BlogId=${BlogId}`);
            const data = response.data;
            setBlog(data); // Assuming that data is an array with a single blog object
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBlog();
    }, [BlogId]);

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            {blog ? (
                <div>
                    <Typography variant="h4" component="h2" gutterBottom>
                        {blog.Title}
                    </Typography>
                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: blog.Content }} />
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            )}
        </Container>
    );
};

export default BlogDetail;
