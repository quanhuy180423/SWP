import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState("");

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

      // Find the order detail that matches the ProductId in the cart
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

  // Calculate total cost with two decimal places
  const totalCost = cart.reduce(
    (total, item) => total + item.ProductCost * item.quantity,
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2));

  // Calculate shipping and tax
  const shipping = formattedTotalCost * 0.05;
  const formattedShipping = parseFloat(shipping.toFixed(2));

  const tax = formattedTotalCost * 0.1;
  const formattedTax = parseFloat(tax.toFixed(2));

  // Calculate total amount
  const totalAmount = formattedTotalCost + formattedShipping + formattedTax;

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        orderId: orderId,
        amount: totalAmount,
        bankCode: "NCB",
      };
      const response = await axios.post(ORDER_API_URL, orderDetails);
      console.log("Payment URL:", response.data);
      // Redirect to the payment URL
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-7">
        Thông tin thanh toán
      </h1>
      <label className="pl-6 rounded-2xl text-center bg-rose-100 pr-6 text-xl mb-7">
        Do Chính sách công ty, khách hàng sau khi nhận được giá từ cửa hàng báo
        trong 24 giờ sẽ phải thanh toán 100% giá trị sản phẩm.
      </label>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Form thông tin */}
        <div className="col-span-1 bg-white p-8 ">
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
                value={user ? user.Name : ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
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
                value={user ? user.Phone : ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
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
                value={user ? user.Address : ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
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
                value={user ? user.Email : ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="order-id"
                className="block text-sm font-medium text-gray-700"
              >
                Mã đơn hàng
              </label>
              <input
                type="text"
                id="order-id"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
                src={item.Image[0]}
                alt={item.Name}
                width="150"
                className="rounded-lg"
              />
              <div className="flex-1 ml-4">
                <div className="text-3xl font-bold mb-2">
                  Tên sản phẩm: {item.Name}
                </div>
                <div className="mb-2 text-2xl">
                  Giá thành phẩm: {item.ProductCost.toLocaleString()}₫
                </div>
              </div>
              <div className="flex items-center font-bold text-2xl">
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
