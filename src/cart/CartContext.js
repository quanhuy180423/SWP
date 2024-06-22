import React, { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
