import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const API_URL = "http://localhost:8090/test/getBlogById";

    const getBlog = async () => {
        try {
            const response = await axios.get(`${API_URL}?blogId=${blogId}`);
            const data = response.data;
            data.map((blog) => {
                setBlog(blog);
            })


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBlog();
    }, [blogId]);

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-4xl mx-auto px-4 py-8">

                {blog ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{blog.Title}</h2>
                        <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: blog.Content }} />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
