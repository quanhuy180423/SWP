

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios';

Modal.setAppElement("#root");

const UserInfo = () => {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState("userInfo");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id"); // Assuming user ID is stored in localStorage
      console.log("User ID:", userId);
      if (userId) {
        
        try {
          const response = await axios.get(`https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }else{
        console.error("User ID not found in localStorage");
      }
    };
    
    fetchUserData();
  }, []);

  const handleUpdateUserInfo = (updatedUserInfo) => {
    setUser(updatedUserInfo);
  };

  const handleUpdateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("id");
    setIsLogoutModalOpen(false);
    window.location.href = "/";
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);
    try {
      await axios.put(`https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/User/${userId}`, user);
      setIsUpdateModalOpen(false);
      alert("Thông tin người dùng đã được cập nhật!");
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin người dùng.");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center items-start space-x-0 md:space-x-8">
          <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
            <div className="text-center mb-6">
              <img
                src="./img/diamond.png"
                alt="logo"
                className="mx-auto w-16 h-16"
              />
              <h3 className="text-xl font-serif text-gray-600">Sun Shine</h3>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Hồ sơ của {user.fullName}
            </h2>
            <ul className="space-y-4">
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeSection === "userInfo"
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                }`}
                onClick={() => setActiveSection("userInfo")}
              >
                Thông tin người dùng
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeSection === "orders"
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                }`}
                onClick={() => setActiveSection("orders")}
              >
                Đơn hàng
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeSection === "cart"
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                }`}
                onClick={() => setActiveSection("cart")}
              >
                Giỏ hàng
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeSection === "logout"
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                }`}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                Đăng xuất
              </li>
            </ul>
          </div>

          <div className="w-full md:w-3/4 mt-8 md:mt-0">
            {activeSection === "userInfo" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Thông tin người dùng
                </h3>
                <form className="space-y-4" onSubmit={handleUpdateClick}>
                  <label className="block">
                    <span className="text-gray-700">Họ và tên:</span>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        handleUpdateUserInfo({ ...user, name: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Số điện thoại:</span>
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) =>
                        handleUpdateUserInfo({ ...user, phone: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Email:</span>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        handleUpdateUserInfo({ ...user, email: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Địa chỉ:</span>
                    <input
                      type="text"
                      value={user.address}
                      onChange={(e) =>
                        handleUpdateUserInfo({
                          ...user,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Mật khẩu mới:</span>
                    <input
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        handleUpdateUserInfo({
                          ...user,
                          password: e.target.value,
                        })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-black"
                  >
                    Cập nhật thông tin
                  </button>
                </form>
              </div>
            )}

            {activeSection === "orders" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Đơn hàng
                </h3>
                <ul className="space-y-2">
                  {orders.map((order, index) => (
                    <li
                      key={index}
                      className="bg-blue-500 text-white p-2 rounded-md"
                    >
                      {order}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSection === "cart" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Giỏ hàng
                </h3>
                
                <ul className="space-y-2">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="bg-blue-500 text-white p-2 rounded-md"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={isLogoutModalOpen}
          onRequestClose={() => setIsLogoutModalOpen(false)}
          contentLabel="Logout Confirmation"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="p-5 bg-white">
            <h2 className="text-2xl font-semibold flex justify-center">Đăng xuất</h2>
            <p className="mt-2">Bạn có chắc chắn muốn đăng xuất không?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Có
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Không
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          contentLabel="Update Confirmation"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="p-5 bg-white">
            <h2 className="text-2xl font-semibold flex justify-center">Cập nhật thông tin</h2>
            <p className="mt-2">Bạn có chắc chắn muốn cập nhật thông tin không?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Có
              </button>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Không
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserInfo;
