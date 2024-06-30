import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState("null");

  const API_URL = "http://localhost:8090/test/getUserById";

  const getUser = async () => {
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
    if (user === "null") {
      getUser();
    }
  }, []);
  // Tính tổng giá tiền với hai số sau dấu phẩy
  const totalCost = cart.reduce(
    (total, item) => total + item.ProductCost * item.quantity,
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2)); // Làm tròn và định dạng giá tiền

  // Tính phí vận chuyển và thuế
  const shipping = formattedTotalCost * 0.05;
  const formattedShipping = parseFloat(shipping.toFixed(2)); // Làm tròn và định dạng phí vận chuyển

  const tax = formattedTotalCost * 0.1;
  const formattedTax = parseFloat(tax.toFixed(2)); // Làm tròn và định dạng thuế

  // Tính tổng cộng
  const totalAmount = formattedTotalCost + formattedShipping + formattedTax;

  const handleCheckout = () => {
    // Xu ly thanh toan
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-7">
        Thông tin thanh toán
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Form thông tin */}
        <div className="col-span-1 bg-white p-8 ">
          {/* rounded-lg shadow-md */}
          <form>
            <div>
              <h2 className="text-2xl font-bold mb-4">Đại chỉ giao hàng</h2>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                value={user.Name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                value={user.Phone}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                value={user.Address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.Email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="payment-method"
                className="block text-sm font-medium text-gray-700"
              >
                Phương thức thanh toán
              </label>
              <select
                id="payment-method"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>COD (nhận hàng rồi thanh toán)</option>
                <option>QR Code</option>
                {/* <option>Cash on Delivery</option> */}
              </select>
            </div>
          </form>
        </div>

        {/* Summary giỏ hàng */}
        <div className="col-span-1 bg-green-50 p-8 rounded-md h-80">
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng giá:</span>
              <span>{formattedTotalCost.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Phí vận chuyển:</span>
              <span>{formattedShipping.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Thuế:</span>
              <span>{formattedTax.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Thành tiền:</span>
              <span>{totalAmount.toLocaleString()}₫</span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-5"
              onClick={handleCheckout}
            >
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
        <ul>
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-8 p-4 rounded-lg shadow-md"
            >
              <img
                // src={item.Image}
                src="https://th.bing.com/th/id/OIF.72OUna9vZtxLRpFvVGE5Wg?rs=1&pid=ImgDetMain"
                alt={item.Name}
                width="250"
                className="rounded-lg"
              />
              <div className="flex-1 ml-4">
                <div className="text-xl font-bold mb-2">
                  Tên sản phẩm: {item.Name}
                </div>
                {/* <div className="mb-2">Loại sản phẩm: {item.CategoryName}</div>
                <div className="mb-2">Kim cương: {item.GemName}</div>
                <div className="mb-2">Kích thước: {item.Size}</div> */}
                <div className="mb-2">
                  Giá thành phẩm: {item.ProductCost.toLocaleString()}₫
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor={`quantity_${index}`}>
                  Số lượng
                  <div className="flex justify-center"> {item.quantity}</div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
