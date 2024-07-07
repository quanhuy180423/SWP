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
        (item) => item.ProductId === product.ProductId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.ProductId === product.ProductId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (ProductId, newQuantity) => {
    if (newQuantity < 0) return alert("Quantity cannot be less than 0");
    if (newQuantity === 0) return removeFromCart(ProductId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ProductId === ProductId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (ProductId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.ProductId !== ProductId)
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
