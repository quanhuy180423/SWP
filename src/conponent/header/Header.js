import React, { useState, useEffect, useContext } from "react";
import AuthPopup from "../../page/AuthPopup";
import { Link } from "react-router-dom";
import { CartContext } from "../../cart/CartContext"; // Corrected import
import SearchComponent from "./Search";

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
    <div className="sticky top-0 bg-white z-50 shadow-md pb-2 header mt-3">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6">
        <Link to="/" className="flex items-center my-2 lg:my-0">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <h3 className="text-xl font-serif text-gray-500 pl-2">Sun Shine</h3>
        </Link>

        <div className="w-full lg:w-3/6 my-2 lg:my-0">
          <div className="flex justify-center">
            <div className="flex-1 w-full lg:w-3/5">
              <SearchComponent />
            </div>
          </div>

          <div className="hidden lg:flex space-x-4 justify-evenly mt-2 lg:mt-0">
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

        <div className="flex flex-col lg:flex-row items-center space-x-4">
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
                className="text-gray-500 hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
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
          <div className="mt-2 lg:mt-0">
            <Link to="/cart" className="flex items-center justify-center">
              <img
                src="./img/shopping-bag.png"
                alt="cart"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-500 ml-1">
                {totalQuantity === 0 ? "0" : `${totalQuantity}`}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="block lg:hidden mt-2">
        <div className="flex flex-col space-y-2">
          <Link
            to="/"
            className="text-lg text-gray-500 font-serif hover:text-black"
          >
            Trang chủ
          </Link>
          <Link
            to="/jewelry"
            className="text-lg text-gray-500 font-serif hover:text-black"
          >
            Trang sức
          </Link>
          <Link
            to="/diamondpage"
            className="text-lg text-gray-500 font-serif hover:text-black"
          >
            Kim cương viên
          </Link>
          <Link
            to="/blog"
            className="text-lg text-gray-500 font-serif hover:text-black"
          >
            Blog-tin tức
          </Link>
          <Link
            to="/order-form"
            className="text-lg text-gray-500 font-serif hover:text-black"
          >
            Đặt hàng
          </Link>
        </div>
      </div>
      {isPopupOpen && (
        <AuthPopup onClose={closePopup} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Header;
