import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart/CartContext";
import axios from "axios";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import {
  getAllOrderDetail,
  getOrderById,
  getOrderDetailByOrderId,
  updateStatusOrderDetailById,
} from "../server/api";

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orderDetailId, setOrderDetailId] = useState("");
  const API_URL = "http://localhost:8090/test";

  const USER_API_URL = "http://localhost:8090/test/getUserById";
  const ORDER_API_URL = "http://localhost:8090/create_payment_url";
  const ORDER_DETAIL_API_URL = "http://localhost:8090/test/getAllOrderDetail";

  const getUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Id) {
      const userId = storedUser.Id;
      try {
        const response = await axios.get(`${USER_API_URL}?UserId=${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("User ID not found in localStorage");
    }
  };

  const getOrderDetail = async () => {
    try {
      const response = await axios.get(ORDER_DETAIL_API_URL);
      const orderDetails = response.data;

      const matchingOrderDetail = orderDetails.find((detail) =>
        cart.some((item) => item.ProductId === detail.ProductId)
      );

      if (matchingOrderDetail) {
        setOrderId(matchingOrderDetail.OrderId);
      } else {
        console.error("No matching order detail found for the cart items");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const getOrder = async () => {
    try {
      const Order = await getOrderById(orderId);
      console.log(Order.data[0]);
      if (Order.data[0].Status === "banked") {
        const statusOrderDetail = await getOrderDetailByOrderId(orderId);
        const OrderDetailId = statusOrderDetail.data[0].OrderDetailId;
        console.log(orderDetailId);
        const updateStatusOrderDetail = {
          OrderDetailId: OrderDetailId,
          Status: "banked",
        };
        console.log(statusOrderDetail.data[0].ProductId);
        await updateStatusOrderDetailById(updateStatusOrderDetail);
        removeFromCart(statusOrderDetail.data[0].ProductId);
        console.log("Payment successful, cart cleared.");
      } else {
        console.error(
          "Payment not successful, order status:",
          Order.data.status
        );
      }
    } catch (error) {
      console.error("Error checking order status:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (cart.length > 0) {
      getOrderDetail();
    }
  }, [cart]);

  useEffect(() => {
    if (orderId) {
      getOrder();
    }
  }, [orderId]);

  const totalCost = cart.reduce(
    (total, item) => total + item.ProductCost * item.quantity,
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2));

  const shipping = formattedTotalCost * 0.05;
  const formattedShipping = parseFloat(shipping.toFixed(2));

  const tax = formattedTotalCost * 0.1;
  const formattedTax = parseFloat(tax.toFixed(2));

  const totalAmount = formattedTotalCost + formattedShipping + formattedTax;

  const handleCheckout = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thanh toán.");
      return;
    }

    try {
      const orderDetails = await getAllOrderDetail(); // Correctly invoking the function
      const orderItems = orderDetails.data;

      let existingOrderId = null;

      for (let item of cart) {
        const matchingOrder = orderItems.find(
          (order) => order.ProductId === item.ProductId && order.Status === 0
        );
        if (matchingOrder) {
          existingOrderId = matchingOrder.OrderId;
          break;
        }
      }
      let response = null; // Declaring response variable outside the if block
      if (!existingOrderId) {
        const productIds = cart.map((item) => item.ProductId);
        const orderRequestData = {
          PaymentMethods: "1",
          Phone: user.Phone,
          Address: user.Address,
          Status: "ChkOut",
          UserId: user.UserId,
          Description: "Sản phẩm có sẵn của cửa hàng",
          Name: user.UserName,
          ProductIds: productIds,
        };

        response = await axios.post(`${API_URL}/insertOrder`, orderRequestData);
        if (response) {
          setOrderId(response.data.orderId);
        }
      } else {
        setOrderId(existingOrderId);
      }

      const paymentDetails = {
        orderId: existingOrderId || response.data.OrderId,
        amount: totalAmount,
        bankCode: "NCB",
      };

      const paymentResponse = await axios.post(ORDER_API_URL, paymentDetails);
      const paymentUrl = paymentResponse.data.paymentUrl;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error during checkout process:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Thông tin thanh toán
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Do Chính sách công ty, khách hàng sau khi nhận được giá từ cửa hàng báo
        trong 24 giờ sẽ phải thanh toán 100% giá trị sản phẩm.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Địa chỉ giao hàng
            </Typography>
            <TextField
              label="Tên"
              value={user ? user.Name : ""}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Số điện thoại"
              value={user ? user.Phone : ""}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Địa chỉ"
              value={user ? user.Address : ""}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Email"
              value={user ? user.Email : ""}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Mã đơn hàng"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Tóm tắt giỏ hàng
            </Typography>
            <List>
              {cart.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={item.Image[0]} alt={item.Name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.Name}
                      secondary={`Giá: ${item.ProductCost.toLocaleString()}₫ - Số lượng: ${
                        item.quantity
                      }`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                Tổng giá: {formattedTotalCost.toLocaleString()}₫
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phí vận chuyển: {formattedShipping.toLocaleString()}₫
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thuế: {formattedTax.toLocaleString()}₫
              </Typography>
              <Typography variant="h6" gutterBottom>
                Thành tiền: {totalAmount.toLocaleString()}₫
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
              >
                Xác nhận đơn hàng
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
