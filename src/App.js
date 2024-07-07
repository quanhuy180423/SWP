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
import JewelryPage from "./JewelyPage/JewelyPage";
import { CartProvider } from "./cart/CartContext";
import Cart from "./page/CartPage";
import Checkout from "./page/Checkout";
import DiamondDetail from "./conponent/Diamond/DiamondDetail";
import BlogDetail from "./page/Blog/BlogDetail";
import LayoutAdmin from "./AdminConponent/LayoutAdmin";
import Dashboard from "./AdminConponent/Dashboard/Dashboard";
import ListAccount from "./AdminConponent/Mana-Account/ListAccount";
import AddUserButton from "./AdminConponent/Mana-Account/AddAccount";
import ListBlogs from "./AdminConponent/Mana-Blogs/ListBlogs";
import ListMaterial from "./AdminConponent/Mana-Material/ListMaterial";
import AddMaterial from "./AdminConponent/Mana-Material/AddMaterial";
import AddBlogs from "./AdminConponent/Mana-Blogs/AddBlogs";
import ListDiamond from "./AdminConponent/Mana-Diamond/ListDiamond";
import AddDiamond from "./AdminConponent/Mana-Diamond/AddDiamond";
import ListOrder from "./AdminConponent/Mana-Order/ListOrder";
import ListProduct from "./AdminConponent/Mana-Product/ListProduct";
import EditMaterial from "./AdminConponent/Mana-Material/EditMaterial";
import AddCostMaterial from "./AdminConponent/Mana-Material/AddCostMaterial";
import ListOrderDetail from "./AdminConponent/Mana-Order-Detail/ListOrderDetail";
import AddProduct from "./AdminConponent/Mana-Product/AddProduct";
import EditAccount from "./AdminConponent/Mana-Account/EditAccount";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="order-form" element={<OrderForm />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            <Route path="/product/:ProductId" element={<Product />} />
            <Route path="/userinfo/:Id" element={<UserInfo />} />
            <Route path="diamondpage" element={<DiamondPage />} />
            <Route path="/diamond-detail/:gemId" element={<DiamondDetail />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {(user.Role === 1 || user.Role === 2) && (
            <Route path="/admin" element={<LayoutAdmin />}>
              {user.Role === 1 && <Route index element={<Dashboard />} />}

              {user.Role === 1 && (
                <Route path="/admin/manage-account" element={<ListAccount />} />
              )}
              {user.Role === 1 && (
                <Route
                  path="/admin/manage-account/addUser"
                  element={<AddUserButton />}
                />
              )}
              {user.Role === 1 && (
                <Route
                  path="/admin/manage-account/edit/:UserId"
                  element={<EditAccount />}
                />
              )}

              <Route path="/admin/manage-blogs" element={<ListBlogs />} />

              {/* Material */}
              <Route path="/admin/manage-material" element={<ListMaterial />} />
              <Route
                path="/admin/manage-material/addMaterial"
                element={<AddMaterial />}
              />
              <Route
                path="/admin/manage-material/addCostMaterial"
                element={<AddCostMaterial />}
              />
              <Route
                path="/admin/manage-material/editMaterial"
                element={<EditMaterial />}
              />

              <Route
                path="/admin/manage-blogs/addBlog"
                element={<AddBlogs />}
              />
              <Route path="/admin/manage-diamond" element={<ListDiamond />} />
              <Route
                path="/admin/manage-diamond/addDiamond"
                element={<AddDiamond />}
              />
              <Route path="/admin/manage-order" element={<ListOrder />} />
              {/* Product */}
              <Route path="/admin/manage-product" element={<ListProduct />} />
              <Route
                path="/admin/manage-product/addProduct"
                element={<AddProduct />}
              />
              <Route
                path="/admin/manage-order-detail"
                element={<ListOrderDetail />}
              />
            </Route>
          )}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
