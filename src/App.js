import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginForm from "./page/LoginPage";
import OrderForm from "./page/OrderForm";
import Blogs from "./page/Blogs";
import Product from "./page/Product";
// import News from "./component/News";
import UserInfo from "./page/UserInfo";
import DiamondPage from "./page/Diamond";
import Layout from "./Layout";
import AdminRoutes from "./AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="order-form" element={<OrderForm />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="product" element={<Product />} />
          {/* <Route path="news" element={<News />} /> */}
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="diamondpage" element={<DiamondPage />} />
        </Route>
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
