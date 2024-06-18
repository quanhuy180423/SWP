// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginForm from "./page/LoginPage";
import OrderForm from "./page/OrderForm";
import Blogs from "./page/Blogs";
import Product from "./page/Product";
import UserInfo from "./page/UserInfo";
import DiamondPage from "./page/Diamond";
import Layout from "./Layout";
import AdminRoutes from "./AdminRoutes";
import JewelryPage from "./JewelyPage/JewelyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="order-form" element={<OrderForm />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="/userinfo/:Id" element={<UserInfo />} />
          <Route path="diamondpage" element={<DiamondPage />} />
          <Route path="jewelry" element={<JewelryPage />} />
        </Route>
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
