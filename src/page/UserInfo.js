import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { validateUserInfo } from "../validation/validationUser";

const UserInfo = () => {
  const [user, setUser] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    PassWord: "",
    confirmPassWord: "",
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("userInfo");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8090/test/getUserById";
  const API_URL_UPDATE = "http://localhost:8090/test/updateUserById";

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Id) {
      const userId = storedUser.Id;
      try {
        const response = await axios.get(`${API_URL}?UserId=${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("User ID not found in localStorage");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateOrders = (updatedOrders) => {
    navigate("/order-of-user");
  };

  const handleUpdateCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    Cookies.remove("loginTime");
    setIsLogoutModalOpen(false);
    window.location.href = "/";
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const validationErrors = validateUserInfo(user);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsUpdateModalOpen(true);
    }
  };

  const handleConfirmUpdate = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Id) {
      const userId = storedUser.Id;
      console.log(user);
      try {
        await axios.put(API_URL_UPDATE, { userId, ...user });
        setIsUpdateModalOpen(false);
        alert("User information has been updated!");
        fetchUserData();
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user info:", error);
        alert("An error occurred while updating user information.");
      }
    } else {
      console.error("User ID not found in localStorage");
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Avatar
                  src="./img/diamond.png"
                  sx={{ width: 64, height: 64, mb: 2 }}
                />
                <Typography variant="h4">Sun Shine</Typography>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" align="center" gutterBottom>
                Profile
              </Typography>
              <List component="nav">
                <ListItem disablePadding>
                  <ListItemButton
                    selected={activeSection === "userInfo"}
                    onClick={() => setActiveSection("userInfo")}
                  >
                    <ListItemText primary="User information" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleUpdateOrders}>
                    <ListItemText primary="Order" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleUpdateCart}>
                    <ListItemText primary="Cart" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setIsLogoutModalOpen(true)}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {activeSection === "userInfo" && (
                <>
                  <Typography variant="h5" align="center" gutterBottom>
                    User information
                  </Typography>
                  {!isEditing ? (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Name"
                            value={user.Name}
                            fullWidth
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Phone"
                            value={user.Phone}
                            fullWidth
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Email"
                            value={user.Email}
                            fullWidth
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Address"
                            value={user.Address}
                            fullWidth
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" align="center" gutterBottom>
                        Change Password
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="New password"
                            value={user.PassWord}
                            fullWidth
                            type="password"
                            InputProps={{ readOnly: !isEditing }}
                            onChange={(e) =>
                              setUser({ ...user, PassWord: e.target.value })
                            }
                            error={Boolean(errors.PassWord)}
                            helperText={errors.PassWord}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Enter password again"
                            value={user.confirmPassWord}
                            fullWidth
                            type="password"
                            InputProps={{ readOnly: !isEditing }}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPassWord: e.target.value,
                              })
                            }
                            error={Boolean(errors.confirmPassWord)}
                            helperText={errors.confirmPassWord}
                          />
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="center" sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit information
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <form onSubmit={handleUpdateClick}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Name"
                            value={user.Name}
                            fullWidth
                            onChange={(e) =>
                              setUser({ ...user, Name: e.target.value })
                            }
                            error={Boolean(errors.Name)}
                            helperText={errors.Name}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Phone"
                            value={user.Phone}
                            fullWidth
                            onChange={(e) =>
                              setUser({ ...user, Phone: e.target.value })
                            }
                            error={Boolean(errors.Phone)}
                            helperText={errors.Phone}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Email"
                            value={user.Email}
                            fullWidth
                            onChange={(e) =>
                              setUser({ ...user, Email: e.target.value })
                            }
                            error={Boolean(errors.Email)}
                            helperText={errors.Email}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Address"
                            value={user.Address}
                            fullWidth
                            onChange={(e) =>
                              setUser({ ...user, Address: e.target.value })
                            }
                            error={Boolean(errors.Address)}
                            helperText={errors.Address}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Mật khẩu mới"
                            value={user.PassWord}
                            fullWidth
                            type="password"
                            onChange={(e) =>
                              setUser({ ...user, PassWord: e.target.value })
                            }
                            error={Boolean(errors.PassWord)}
                            helperText={errors.PassWord}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Nhập lại mật khẩu mới"
                            value={user.confirmPassWord}
                            fullWidth
                            type="password"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPassWord: e.target.value,
                              })
                            }
                            error={Boolean(errors.confirmPassWord)}
                            helperText={errors.confirmPassWord}
                          />
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="center" sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setIsEditing(false);
                            setUser({
                              ...user,
                              confirmPassWord: user.PassWord,
                            });
                          }}
                          sx={{ ml: 2 }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </form>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogoutModalOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <DialogTitle>Confirm update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update user information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            I'm confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserInfo;
