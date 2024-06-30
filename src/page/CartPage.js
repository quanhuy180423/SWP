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
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

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

  const handleDelete = (ProductID) => {
    removeFromCart(ProductID);
    console.log("Deleting product with id:", ProductID);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleQuantityChange = (ProductID, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(ProductID, newQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-7">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          {cart.map((item, index) => (
            <Card
              key={item.ProductID}
              className="flex justify-between items-center mb-8 p-4 rounded-lg shadow-md bg-white"
            >
              {console.log(item)}
              <CardMedia
                className="w-40"
                component="img"
                image="https://th.bing.com/th/id/OIF.72OUna9vZtxLRpFvVGE5Wg?rs=1&pid=ImgDetMain"
                title={item.Name}
              />
              <CardContent className="flex-1 ml-4">
                <Typography variant="h6">Tên sản phẩm: {item.Name}</Typography>
                <Typography>Loại sản phẩm: {item.CategoryName}</Typography>
                <Typography>Kim cương: {item.GemName}</Typography>
                <Typography>Kích thước: {item.Size}</Typography>
                <Typography>
                  Giá thành phẩm: {item.ProductCost.toLocaleString()}₫
                </Typography>
                <div className="flex items-center mt-2">
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.ProductID, item.quantity - 1)
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
                      handleQuantityChange(item.ProductID, item.quantity + 1)
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.ProductID)}>
                    <Delete color="error" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="col-span-1 bg-slate-200 p-4 rounded-lg grid place-items-center">
          <Typography variant="h5" className="mb-2">
            Hóa đơn
          </Typography>
          <Typography>
            Phí vận chuyển: {formattedShipping.toLocaleString()}₫
          </Typography>
          <Typography>Thuế: {formattedTax.toLocaleString()}₫</Typography>
          <Typography variant="h6" className="font-bold">
            Thành cộng: {totalAmount.toLocaleString()}₫
          </Typography>
          <Button
            onClick={handleCheckout}
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
