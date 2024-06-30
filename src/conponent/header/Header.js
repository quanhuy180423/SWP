import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";
import AuthPopup from "../../page/AuthPopup";
import SearchComponent from "./Search";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    console.log(savedUser);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <AppBar position="absolute" className="bg-white shadow-md z-50">
      <Toolbar className="flex flex-col lg:flex-row justify-between items-center px-6 bg-white">
        <Link to="/" className="flex items-center my-2 lg:my-0">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <Typography variant="h6" className="text-xl text-gray-500 pl-2">
            Sun Shine
          </Typography>
        </Link>

        <div className="w-full lg:w-3/6 my-2 lg:my-2">
          <div className="flex justify-center">
            <div className="flex-1 w-full lg:w-3/5">
              <SearchComponent />
            </div>
          </div>

          <div className="flex space-x-4 justify-evenly mt-2 font-sans">
            <Link
              to="/"
              className="text-xl text-gray-500 font-sans hover:text-black"
            >
              Trang chủ
            </Link>
            <Link
              to="/jewelry"
              className="text-xl text-gray-500 font-sans hover:text-black"
            >
              Trang sức
            </Link>
            <Link
              to="/diamondpage"
              className="text-xl text-gray-500 font-sans hover:text-black"
            >
              Kim cương viên
            </Link>
            <Link
              to="/blog"
              className="text-xl text-gray-500 font-sans hover:text-black"
            >
              Blog-tin tức
            </Link>
            <Link
              to="/order-form"
              className="text-xl text-gray-500 font-sans hover:text-black"
            >
              Đặt hàng
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                to={`/userinfo/${user.Id}`}
                className="flex items-center space-x-1"
              >
                <AccountCircleIcon className="text-gray-500 " />
                <span className="text-gray-500">{user.UserName}</span>
              </Link>
              <Button
                onClick={handleLogout}
                className="text-gray-500 hover:text-black"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AccountCircleIcon className="text-gray-500" />
              <Button
                className="text-gray-500 hover:text-black"
                onClick={openPopup}
              >
                Tài khoản
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
