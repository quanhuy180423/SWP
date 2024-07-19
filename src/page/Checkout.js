import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart/CartContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  getOrderDetailByOrderId,
  updateStatusOrderDetailById,
  updateStatusOrdeById,
} from "../server/api";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("1");
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
        cart.some(
          (item) => item.ProductId === detail.ProductId && item.Status === 0
        )
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

  const totalCost = cart.reduce(
    (total, item) => total + item.ProductCost * item.quantity,
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2)).toLocaleString();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You need to sign in to pay.");
      return;
    }

    try {
      await getOrderDetail();

      if (orderId) {
        // Existing order found, proceed with payment update
        handlePaymentUpdate(orderId);
      } else {
        // No existing order, insert new order
        const productIds = cart.map((item) => item.ProductId);

        const orderRequestData = {
          PaymentMethods: paymentMethod,
          Phone: user.Phone,
          Address: user.Address,
          Status: "ChkOut",
          UserId: user.UserId,
          Description: "No description",
          Name: user.UserName,
          ProductIds: productIds,
        };

        const response = await axios.post(
          `${API_URL}/insertOrder`,
          orderRequestData
        );
        if (response) {
          setOrderId(response.data.OrderId);
          handlePaymentUpdate(response.data.OrderId);
        }
      }
    } catch (error) {
      console.error("Error during checkout process:", error);
      toast.error("Error during checkout process. Please try again.");
    }
  };

  const handlePaymentUpdate = async (orderId) => {
    const paymentDetails = {
      orderId: orderId,
      amount: totalCost,
      bankCode: "NCB",
    };

    try {
      if (paymentMethod === "1") {
        const paymentResponse = await axios.post(ORDER_API_URL, paymentDetails);
        const paymentUrl = paymentResponse.data.paymentUrl;
        await updateStatusOrderDetail(orderId, "banked");
        clearCart();
        window.location.href = paymentUrl;
      } else {
        await updateStatusOrderDetail(orderId, "COD");
        await updateStatusOrder(orderId, "Order_COD");
        clearCart();
        toast.success("Order will be paid on delivery.");
      }
    } catch (error) {
      console.error("Error during payment update process:", error);
      toast.error("Error during payment update process. Please try again.");
    }
  };

  const updateStatusOrderDetail = async (orderId, status) => {
    try {
      const orderDetails = await getOrderDetailByOrderId(orderId);
      for (let detail of orderDetails.data) {
        const updateOrderDetail = {
          OrderDetailId: detail.OrderDetailId,
          Status: status,
        };
        await updateStatusOrderDetailById(updateOrderDetail);
      }
    } catch (error) {
      console.error("Error updating order detail status:", error);
    }
  };

  const updateStatusOrder = async (orderId, status) => {
    try {
      const updateOrder = {
        OrderId: orderId,
        Status: status,
      };
      await updateStatusOrdeById(updateOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Payment Detail
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Customer Information
              </Typography>
              <TextField
                label="Name"
                value={user ? user.Name : ""}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Phone"
                value={user ? user.Phone : ""}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Address"
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
                label="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                fullWidth
                margin="normal"
                disabled
              />
              <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Payment with VN Pay"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Cash On Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Cart Summary
              </Typography>
              <List>
                {cart.map((item) => (
                  <React.Fragment key={item.ProductId}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={item.Image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.Name}
                        secondary={`Quantity: ${
                          item.quantity
                        } - Price: ${item.ProductCost.toLocaleString()} đ`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="h5"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  Total: {formattedTotalCost} đ
                </Typography>
              </Box>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    sx={{ marginTop: 2 }}
                  >
                    Checkout
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Checkout;
