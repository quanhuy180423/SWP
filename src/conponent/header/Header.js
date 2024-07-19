import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";
import AuthPopup from "../../page/AuthPopup";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const checkLoginStatus = () => {
      const loginTime = Cookies.get("loginTime");

      if (loginTime) {
        const currentTime = new Date().getTime();
        const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000; // 30 ngày tính bằng milliseconds

        if (currentTime - parseInt(loginTime, 10) > thirtyDaysInMillis) {
          // Thời gian đăng nhập đã quá 30 ngày, đăng xuất người dùng
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          Cookies.remove("loginTime");
          navigate("/");
          alert("Your session has expired. Please log in again.");
        }
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    Cookies.remove("loginTime");
    navigate("/");
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "white" }}>
      <Toolbar
        className="flex flex-col lg:flex-row justify-between items-center px-6 bg-white"
        style={{ height: "50px" }}
      >
        <Link to="/" className="flex items-center my-2 lg:my-0">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <Typography
            variant="h6"
            className="text-xl font-bold text-gray-500 pl-2"
          >
            Sun Shine
          </Typography>
        </Link>

        <div className="w-full lg:w-3/6 my-2 lg:my-2">
          <div className="flex space-x-4 justify-evenly mt-2 font-sans">
            <Link
              to="/"
              className="text-xl font-bold text-gray-500 font-sans hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/Jewelry"
              className="text-xl font-bold text-gray-500 font-sans hover:text-black"
            >
              Jewelry
            </Link>
            <Link
              to="/Diamonds"
              className="text-xl font-bold text-gray-500 font-sans hover:text-black"
            >
              Diamonds
            </Link>
            <Link
              to="/Blogs"
              className="text-xl font-bold text-gray-500 font-sans hover:text-black"
            >
              Blog-News
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Button
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                className="flex items-center space-x-1 text-gray-500"
              >
                <AccountCircleIcon />
                <span>{user.UserName}</span>
              </Button>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to={`/userinfo/${user.UserId}`}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to={`/order-of-user`}>My Order</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/order-form">Jewelry Production Order</Link>
                </MenuItem>
                {user.Role === 1 && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to="/admin"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                )}
                {user.Role === 3 && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to="/admin"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Staff dash board
                    </Link>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AccountCircleIcon className="text-gray-500" />
              <Button
                className="text-gray-500 hover:text-black"
                onClick={openPopup}
              >
                Login
              </Button>
            </div>
          )}
          <div className="mt-2 lg:mt-0">
            <Link to="/cart" className="flex items-center justify-center">
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingBagIcon className="text-gray-500" />
              </Badge>
            </Link>
          </div>
        </div>
      </Toolbar>
      {isPopupOpen && (
        <AuthPopup onClose={closePopup} onLoginSuccess={handleLoginSuccess} />
      )}
    </AppBar>
  );
};

export default Header;
