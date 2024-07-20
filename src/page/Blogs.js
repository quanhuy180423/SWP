import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

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
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        Blog-news
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <Link
                to={`/Blog/${blog.BlogId}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="https://th.bing.com/th/id/OIP.ifiZuFOKsVZUSgB3F1viQQHaHa?rs=1&pid=ImgDetMain"
                  alt={blog.Title}
                />
                <CardContent
                  sx={{
                    height: "300px",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.Title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {users[blog.UserId]}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
