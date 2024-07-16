import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(null);
  const API_URL = "http://localhost:8090/test/getUserById";

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Id) {
      const userId = storedUser.Id;
      try {
        const response = await axios.get(`${API_URL}?UserId=${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("User ID not found in localStorage");
    }
  };

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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchUserData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
