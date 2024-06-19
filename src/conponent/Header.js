import React, { useState, useEffect, useContext } from "react";
import AuthPopup from "../page/AuthPopup";
import "../css/header.css";
import { Link } from "react-router-dom";
import { CartContext } from "../cart/CartContext"; // Corrected import

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext); // Corrected useContext usage

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
    <div className="sticky top-0 bg-white z-1000 shadow-md pb-2 header">
      <div className="flex justify-between items-center px-6">
        <Link to="/">
          <div className="flex items-center">
            <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
            <h3 className="text-xl font-serif text-gray-500 pl-2">Sun Shine</h3>
          </div>
        </Link>

        <div className="w-3/6">
          <div className="flex justify-center">
            <div className="flex-1 m-2 w-3/5">
              <div className="flex items-center border-2 border-blue-800 rounded-full px-2 bg-white">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="border-none outline-none flex-1 py-1 px-2 text-lg rounded-full"
                />
                <button className="bg-none border-none cursor-pointer outline-none p-0 ml-2">
                  <img
                    src="./img/glass.png"
                    alt="search-icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 justify-evenly">
            <Link
              to="/"
              className="text-xl text-gray-500 font-serif hover:text-black"
            >
              Trang chủ
            </Link>
            <Link
              to="/jewelry"
              className="text-xl text-gray-500 font-serif hover:text-black"
            >
              Trang sức
            </Link>
            <Link
              to="/diamondpage"
              className="text-xl text-gray-500 font-serif hover:text-black"
            >
              Kim cương viên
            </Link>
            <Link
              to="/blog"
              className="text-xl text-gray-500 font-serif hover:text-black"
            >
              Blog-tin tức
            </Link>
            <Link
              to="/order-form"
              className="text-xl text-gray-500 font-serif hover:text-black"
            >
              Đặt hàng
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                to={`/userinfo/${user.Id}`}
                className="flex items-center space-x-1"
              >
                <img
                  src="./img/profile-user.png"
                  alt="profile"
                  className="w-5 h-5"
                />
                <span>{user.UserName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-black "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between space-x-2">
              <img
                src="./img/profile-user.png"
                alt="profile"
                className="w-5 h-5"
              />
              <button
                className="text-gray-500 hover:text-black"
                onClick={openPopup}
              >
                Tài khoản
              </button>
            </div>
          )}
          <div>
            <Link to="/cart" className="flex items-center justify-center ">
              <img
                src="./img/shopping-bag.png"
                alt="cart"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-500">
                {totalQuantity === 0 ? "0" : `${totalQuantity}`}
                {/* <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span> */}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <AuthPopup onClose={closePopup} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Header;
