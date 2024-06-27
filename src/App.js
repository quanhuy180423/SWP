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
import { CartProvider } from "./cart/CartContext"; // Import CartProvider from CartContext
import Cart from "./page/CartPage";
import Checkout from "./page/Checkout";
import DiamondDetail from "./conponent/Diamond/DiamondDetail";
import BlogDetail from "./page/Blog/BlogDetail";

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* CartProvider wraps the components that need CartContext */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="order-form" element={<OrderForm />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            <Route path="/product/:ProductID" element={<Product />} />

            <Route path="/userinfo/:Id" element={<UserInfo />} />
            <Route path="diamondpage" element={<DiamondPage />} />
            <Route path="/diamond-detail/:gemId" element={<DiamondDetail />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            {/* ======================================== */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
