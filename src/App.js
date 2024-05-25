import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./conponent/Header";
import HomePage from "./page/HomePage";
import LoginForm from "./page/LoginPage";
import OrderForm from "./page/OrderForm";
import Blogs from "./page/Blogs";
import Product from "./page/Product";
// import RegistrationForm from "./page/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
