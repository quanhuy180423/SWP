import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage nếu có, nếu không thì trống
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(initialCart);

  // Cập nhật localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.ProductID === product.ProductID
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.ProductID === product.ProductID
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (ProductID, newQuantity) => {
    if (newQuantity < 0) return alert("Quantity cannot be less than 0");
    if (newQuantity === 0) return removeFromCart(ProductID);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ProductID === ProductID ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (ProductID) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.ProductID !== ProductID)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
