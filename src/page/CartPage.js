import React, { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const totalCost = cart.reduce(
    (total, item) => total + item.ProductCost * item.quantity,
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2)) || 0;
  const shipping = formattedTotalCost * 0.05;
  const formattedShipping = parseFloat(shipping.toFixed(2)) || 0;
  const tax = formattedTotalCost * 0.1;
  const formattedTax = parseFloat(tax.toFixed(2)) || 0;
  const totalAmount = formattedTotalCost + formattedShipping + formattedTax;

  const handleDelete = (ProductId) => {
    removeFromCart(ProductId);
    console.log("Deleting product with id:", ProductId);
  };

  const handleQuantityChange = (ProductId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(ProductId, newQuantity);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-7">Your cart</h1>
      <Box width="100%" display="flex" justifyContent="end">
        <Button
          style={{
            color: "black",
            textDecoration: "underline",
            fontSize: "20px",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          {cart.map((item, index) => (
            <Card
              key={item.ProductId}
              className="flex justify-between items-center mb-8 p-4 rounded-lg shadow-md bg-white"
            >
              <CardMedia
                className="w-44 h-48 object-cover rounded-lg"
                component="img"
                image={item.Image}
                title={item.Name}
              />
              <CardContent className="flex-1 ml-4">
                <Typography variant="h5" fontWeight={"bold"}>
                  Name: {item.Name}
                </Typography>
                <Typography>Category: {item.CategoryName}</Typography>
                <Typography>Diamond: {item.GemName}</Typography>
                <Typography>Size: {item.Size}</Typography>
                <Typography fontWeight={"bold"}>
                  Price: {item.ProductCost} đ
                </Typography>
                <div className="flex items-center mt-2">
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.ProductId, item.quantity - 1)
                    }
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    inputProps={{ readOnly: true }}
                    size="small"
                    variant="outlined"
                    className="w-16 text-center"
                  />
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.ProductId, item.quantity + 1)
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.ProductId)}>
                    <Delete color="error" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="col-span-1 bg-slate-200 p-4 rounded-lg grid place-items-center h-60">
          <Typography variant="h5" className="mb-2">
            Bill
          </Typography>
          <Typography variant="h6" className="font-bold">
            Price: {totalAmount.toLocaleString()}₫
          </Typography>
          {totalAmount <= 0 ? (
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              className="mt-4"
              disabled
            >
              Check out
            </Button>
          ) : (
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Check out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
