import React, { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import { Input } from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

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

  const handleDelete = (productId) => {
    // Implement your delete logic here using context function
    removeFromCart(productId);
    console.log("Deleting product with id:", productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-7">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Product List */}
        <div className="col-span-2">
          <ul>
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-8 p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.Image}
                  alt={item.Name}
                  width="250"
                  className="rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <div className="text-xl font-bold mb-2">
                    Tên sản phẩm: {item.Name}
                  </div>
                  <div className="mb-2">Loại sản phẩm: {item.CategoryName}</div>
                  <div className="mb-2">Kim cương: {item.GemName}</div>
                  <div className="mb-2">Kích thước: {item.Size}</div>
                  <div className="mb-2">
                    Giá thành phẩm: {item.ProductCost.toLocaleString()}₫
                  </div>
                </div>
                <div className="flex items-center">
                  <label htmlFor={`quantity_${index}`}>Số lượng: </label>
                  <Input
                    id={`quantity_${index}`}
                    type="number"
                    defaultValue={item.quantity}
                    className="w-12 border-2 border-gray-300 rounded-xl ml-2"
                  />
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Cost */}
        <div className="col-span-1 grid place-items-center h-fit p-4  bg-slate-200 rounded-lg">
          <div className="mb-2 text-4xl font-bold">Hóa đơn</div>
          <div className="text-lg font-sans">
            Phí vận chuyển : {formattedShipping.toLocaleString()}₫
          </div>
          <div className="text-lg font-sans">
            Thuế : {formattedTax.toLocaleString()}₫
          </div>
          <div className="text-xl font-bold">
            Thành cộng: {totalAmount.toLocaleString()}₫
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
