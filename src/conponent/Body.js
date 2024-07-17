import React, { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "../JewelyPage/JewelryItem";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const Body = () => {
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const API_URL_CATEGORY = "http://localhost:8090/test/getProductByCategory";
  const categories = ["Rings", "Necklaces", "Bracelets"];
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryNameFromUrl = searchParams.get("categoryName");
    if (categoryNameFromUrl) {
      setSelectedCategoryName(categoryNameFromUrl);
    }

    const fetchProductsByCategory = async (categoryName) => {
      try {
        const response = await axios.get(API_URL_CATEGORY, {
          params: { CategoryName: categoryName },
        });
        setProducts((prevProducts) => ({
          ...prevProducts,
          [categoryName]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    categories.forEach((category) => {
      fetchProductsByCategory(category);
    });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [location.search]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const renderProductsByCategoryName = (categoryName) => {
    const filteredProducts = products[categoryName] || [];
    return (
      <Box key={categoryName} mb={8}>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Link to={`/jewelry?CategoryName=${categoryName}`}>
            <Typography
              variant="h4"
              component="h2"
              borderBottom={2}
              borderColor="red"
            >
              {categoryName}
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={2}>
          {filteredProducts.slice(0, 4).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.ProductId}>
              <JewelryItem
                to={`/Jewelry/${product.ProductId}`}
                firstImage={product.Image[0]}
                title={product.Name}
                material={product.MaterialName}
                gem={product.GemName}
                productCost={product.ProductCost}
              />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            component={Link}
            to={`/jewelry?CategoryName=${categoryName}`}
            variant="outlined"
            color="primary"
          >
            See more
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Box width="83%">
            <hr className="my-4 border-t-2 border-gray-300" />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box minHeight="100vh" bgcolor="gray.100">
      <Box
        className="banner"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box position="relative" overflow="hidden" width="100%">
          <Box
            className="carousel"
            display="flex"
            transition="transform 0.5s ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <Box className="carousel-item" flex="none" width="100%">
              <img
                src="./img/banner1.png"
                alt="img 1"
                style={{ width: "100%" }}
              />
            </Box>
            <Box className="carousel-item" flex="none" width="100%">
              <img
                src="./img/banner2.png"
                alt="img 2"
                style={{ width: "100%" }}
              />
            </Box>
            <Box className="carousel-item" flex="none" width="100%">
              <img
                src="./img/banner3.png"
                alt="img 3"
                style={{ width: "100%" }}
              />
            </Box>
            <Box className="carousel-item" flex="none" width="100%">
              <img
                src="./img/banner4.png"
                alt="img 4"
                style={{ width: "100%" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Box width="83%">
          <hr className="my-4 border-t-2 border-gray-300" />
        </Box>
      </Box>

      <Container>
        {categories.map((categoryName) =>
          renderProductsByCategoryName(categoryName)
        )}
      </Container>
    </Box>
  );
};

export default Body;
