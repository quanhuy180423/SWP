import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({});
  const API_URL = "http://localhost:8090";
  const API_URL_USER = "http://localhost:8090/test/getUserById";

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/test/getAllBlogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL_USER}?userId=${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getBlogs();

      // Collect all unique user IDs
      const userIds = [...new Set(blogs.map((blog) => blog.UserId))];
      console.log(userIds);
      // Fetch user data for each user ID
      const usersData = {};
      await Promise.all(
        userIds.map(async (userId) => {
          const userName = await getUser(userId);
          usersData[userId] = userName;
          console.log(userName);
        })
      );

      setUsers(usersData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Danh mục bài viết</h1>
      <div className="flex justify-center mb-8">
        <div className="flex justify-around">
          <div className="m-2">
            <Link
              to="/jewelry"
              className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black"
            >
              Tin tức - Blog
            </Link>
          </div>
          <div className="m-2">
            <Link
              to="/jewelry"
              className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black"
            >
              Bảng giá vàng
            </Link>
          </div>
          <div className="m-2">
            <Link
              to="/jewelry"
              className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black"
            >
              Trang sức vàng
            </Link>
          </div>
          <div className="m-2">
            <Link
              to="/jewelry"
              className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black"
            >
              Góc chia sẻ
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Card key={index}>
            <Link to={`/blog/${blog.BlogID}`}>
              <CardMedia
                className="w-full h-96"
                image="https://th.bing.com/th/id/OIP.ifiZuFOKsVZUSgB3F1viQQHaHa?rs=1&pid=ImgDetMain"
                title={blog.Title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {users[blog.UserId]}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
