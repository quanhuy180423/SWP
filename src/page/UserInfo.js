import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { validateUserInfo } from "../validation/validationUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

const UserInfo = () => {
  const [user, setUser] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    password: "",
    confirmPassword: "",
  });

  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("userInfo");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Thêm biến trạng thái cho chế độ chỉnh sửa
  const navigate = useNavigate();

  const API_URL = "http://localhost:8090/test/getUserById";
  const API_URL_UPDATE = "http://localhost:8090/test/updateUserById";

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Id) {
      const userId = storedUser.Id;
      console.log(userId);
      try {
        const response = await axios.get(`${API_URL}?userId=${userId}`);
        console.log(response.data);
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
    setOrders(updatedOrders);
  };

  const handleUpdateCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
      try {
        await axios.put(API_URL_UPDATE, { userId, ...user });
        setIsUpdateModalOpen(false);
        alert("Thông tin người dùng đã được cập nhật!");
        fetchUserData();
        setIsEditing(false); // Đặt lại chế độ chỉnh sửa về mặc định sau khi cập nhật thành công
      } catch (error) {
        console.error("Error updating user info:", error);
        alert("Có lỗi xảy ra khi cập nhật thông tin người dùng.");
      }
    } else {
      console.error("User ID not found in localStorage");
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
              <h3 className="text-4xl font-serif text-black">Sun Shine</h3>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex justify-center">
              Hồ sơ
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
                // onClick={}
              >
                Đơn hàng
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeSection === "orders"
                    ? "bg-black text-white"
                    : "bg-gray-400 text-white"
                }`}
                onClick={() => handleUpdateCart()} // Sửa lại đoạn này
              >
                Đơn hàng
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
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Thông tin người dùng
                </h3>
                {!isEditing ? ( // Kiểm tra chế độ chỉnh sửa
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Họ và tên:</span>
                          <input
                            type="text"
                            value={user.Name}
                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa trường này khi không ở chế độ chỉnh sửa
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                      </div>

                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Số điện thoại:</span>
                          <input
                            type="text"
                            value={user.Phone}
                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa trường này khi không ở chế độ chỉnh sửa
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-gray-700">Email:</span>
                          <input
                            type="Email"
                            value={user.Email}
                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa trường này khi không ở chế độ chỉnh sửa
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-gray-700">Địa chỉ:</span>
                          <input
                            type="text"
                            value={user.Address}
                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa trường này khi không ở chế độ chỉnh sửa
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Đổi password
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Mật khẩu mới:</span>
                          <input
                            type="password"
                            value={user.password}
                            readOnly={!isEditing} // Đặt readOnly dựa vào biến isEditing để chỉ cho phép chỉnh sửa khi đang ở chế độ chỉnh sửa
                            onChange={(e) =>
                              setUser({ ...user, password: e.target.value })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                        {errors.password && (
                          <span className="text-red-500">
                            {errors.password}
                          </span>
                        )}
                      </div>

                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">
                            Nhập lại mật khẩu mới:
                          </span>
                          <input
                            type="password"
                            value={user.confirmPassword}
                            readOnly={!isEditing} // Đặt readOnly dựa vào biến isEditing để chỉ cho phép chỉnh sửa khi đang ở chế độ chỉnh sửa
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                        </label>
                        {errors.confirmPassword && (
                          <span className="text-red-500">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="button" // Sử dụng type "button" để ngăn form submit mặc định của button
                        onClick={() => setIsEditing(true)} // Khi click vào nút chỉnh sửa, setIsEditing(true) để chuyển sang chế độ chỉnh sửa
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-black"
                      >
                        Chỉnh sửa thông tin
                      </button>
                    </div>
                  </>
                ) : (
                  // Chế độ chỉnh sửa
                  <form className="space-y-4" onSubmit={handleUpdateClick}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Họ và tên:</span>
                          <input
                            type="text"
                            value={user.Name}
                            onChange={(e) =>
                              setUser({ ...user, Name: e.target.value })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.Name && (
                            <span className="text-red-500">{errors.Name}</span>
                          )}
                        </label>
                      </div>

                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Số điện thoại:</span>
                          <input
                            type="text"
                            value={user.Phone}
                            onChange={(e) =>
                              setUser({ ...user, Phone: e.target.value })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.Phone && (
                            <span className="text-red-500">{errors.Phone}</span>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-gray-700">Email:</span>
                          <input
                            type="Email"
                            value={user.Email}
                            onChange={(e) =>
                              setUser({ ...user, Email: e.target.value })
                            }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.Email && (
                            <span className="text-red-500">{errors.Email}</span>
                          )}
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-gray-700">Địa chỉ:</span>
                          <input
                            type="text"
                            value={user.Address}
                            onChange={(e) =>
                              setUser({ ...user, Address: e.target.value })
                            }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.Address && (
                            <span className="text-red-500">
                              {errors.Address}
                            </span>
                          )}
                        </label>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Đổi password
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">Mật khẩu mới:</span>
                          <input
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                              setUser({ ...user, password: e.target.value })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.password && (
                            <span className="text-red-500">
                              {errors.password}
                            </span>
                          )}
                        </label>
                      </div>

                      <div className="">
                        <label className="block">
                          <span className="text-gray-700">
                            Nhập lại mật khẩu mới:
                          </span>
                          <input
                            type="password"
                            value={user.confirmPassword}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                          />
                          {errors.confirmPassword && (
                            <span className="text-red-500">
                              {errors.confirmPassword}
                            </span>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-black"
                      >
                        Cập nhật thông tin
                      </button>
                      <button
                        type="button"
                        className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={() => setIsEditing(false)} // Khi click vào nút hủy, setIsEditing(false) để thoát khỏi chế độ chỉnh sửa
                        //và hiển thị lại thông tin người dùng
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeSection === "orders" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-4xl font-semibold text-gray-800 mb-4 flex justify-center">
                  Đơn hàng
                </h3>
                {/* Display orders here */}
              </div>
            )}

            {activeSection === "cart" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-4xl font-semibold text-gray-800 mb-4 flex justify-center">
                  Giỏ hàng
                </h3>
                {/* Display cart here */}
              </div>
            )}

            <Modal
              isOpen={isLogoutModalOpen}
              onRequestClose={() => setIsLogoutModalOpen(false)}
              contentLabel="Logout Modal"
              className="Modal"
              overlayClassName="Overlay"
            >
              <div className="p-5 bg-white">
                <h2 className="text-2xl font-semibold flex justify-center">
                  Đăng xuất
                </h2>
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
              contentLabel="Update Modal"
              className="Modal"
              overlayClassName="Overlay"
            >
              <div className="p-5 bg-white">
                <h2 className="text-2xl font-semibold flex justify-center">
                  Cập nhật thông tin
                </h2>
                <p className="mt-2">
                  Bạn có chắc chắn muốn cập nhật thông tin không?
                </p>
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
        </div>
      </div>
    </>
  );
};

export default UserInfo;
