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
  Box,
} from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const API_URL = "http://localhost:8090";

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/test/getAllBlogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogs();
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
            <Card sx={{ height: "100%" }}>
              <Link
                to={`/Blog/${blog.BlogId}`}
                style={{ textDecoration: "none", height: "100%" }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300px"
                    image={blog.Image}
                    alt={blog.Title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.Title}
                    </Typography>
                  </CardContent>
                </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
