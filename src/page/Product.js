import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../cart/CartContext";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Swipper from "../Swipper/Swipper"; // Adjust the import path as needed
import JewelryItem from "../JewelyPage/JewelryItem"; // Adjust the import path as needed

const Product = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState("");
  const [size, setSize] = useState("");

  const { addToCart } = useContext(CartContext);
  const API_URL = "http://localhost:8090/test/getProductByNameOrId";
  const API_URL_RELATED = "http://localhost:8090/test/getProductByCategory";

  const fetchProductData = async () => {
    if (ProductId) {
      try {
        const response = await axios.get(`${API_URL}?Name=${ProductId}`);
        const data = response.data;
        if (data[0]) {
          setProduct(data[0]);
          fetchRelatedProducts(data[0].CategoryName);
        } else {
          console.error(`No product found with ID ${ProductId}`);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Product ID not found in URL params");
    }
  };

  const fetchRelatedProducts = async (categoryName) => {
    try {
      const response = await axios.get(API_URL_RELATED, {
        params: { CategoryName: categoryName },
      });
      setRelatedProducts(response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [ProductId]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);

    if (value < 1 || value > 10) {
      setQuantityError("Quantity must be between 1 and 10");
    } else {
      setQuantityError("");
    }
  };

  const handleAddToCart = () => {
    if (!quantityError) {
      const itemToAdd = {
        ...product,
        Size: size, // Add selected size to item
      };
      addToCart(itemToAdd, parseInt(quantity));
    }
  };

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

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={5}
        bgcolor="gray.100"
      >
        <Box
          display="flex"
          flexDirection="row"
          maxWidth="lg"
          width="100%"
          bgcolor="white"
          boxShadow={3}
          mb={5}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            height={320}
          >
            <Swipper images={product.Image} /> {/* Use the Swipper component */}
          </Box>
          <Box flex={1} p={5}>
            <Typography
              variant="h4"
              component="h1"
              color="textPrimary"
              gutterBottom
            >
              {product.Name}
            </Typography>
            <Typography variant="h5" component="div" color="error" gutterBottom>
              {product.ProductCost}₫
            </Typography>
            {product.CategoryName === "Rings" ? (
              <FormControl fullWidth margin="normal">
                <InputLabel>Ring Size</InputLabel>
                <Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  label="Ring Size"
                >
                  {[9, 10, 11, 12, 13, 14].map((ringSize) => (
                    <MenuItem key={ringSize} value={ringSize}>
                      {ringSize}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : product.CategoryName === "Necklaces" ? (
              <FormControl fullWidth margin="normal">
                <InputLabel>Necklace Size</InputLabel>
                <Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  label="Necklace Size"
                >
                  {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44].map(
                    (necklaceSize) => (
                      <MenuItem key={necklaceSize} value={necklaceSize}>
                        {necklaceSize}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            ) : null}
            <Box display="flex" alignItems="center" mb={5}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                error={!!quantityError}
                helperText={quantityError}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAddToCart}
                disabled={!!quantityError}
              >
                ADD TO CART
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          maxWidth="lg"
          width="100%"
          bgcolor="white"
          boxShadow={3}
          p={5}
          mb={5}
        >
          <Typography
            variant="h5"
            component="h2"
            color="textPrimary"
            gutterBottom
          >
            Detailed Product Description
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>{product.CategoryName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>{product.ProductCost}₫</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell>{product.MaterialName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Diamond</TableCell>
                  <TableCell>{product.GemName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box maxWidth="lg" width="100%" bgcolor="white" boxShadow={3} p={5}>
          <Typography
            variant="h5"
            component="h2"
            color="textPrimary"
            gutterBottom
          >
            Related Products
          </Typography>
          <Grid container spacing={2}>
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.ProductId}>
                <JewelryItem
                  to={`/Jewelry/${relatedProduct.ProductId}`}
                  firstImage={relatedProduct.Image[0]}
                  title={relatedProduct.Name}
                  material={relatedProduct.MaterialName}
                  gem={relatedProduct.GemName}
                  productCost={relatedProduct.ProductCost}
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/jewelry?CategoryName=${product.CategoryName}`}
            >
              See more
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
