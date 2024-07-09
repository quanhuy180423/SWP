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

import OrderDetailPage from "./AdminConponent/Mana-Order/OrderDetail";
import OrderListRequest from "./AdminConponent/Mana-Order/ListOrder";
import OrderListOfUser from "./page/Order/OrderListOfUser";
import OrderDetailUser from "./page/Order/OrderdetailUser";
import OrderManger from "./AdminConponent/Mana-Order/OrderManager";
import OrderDesign from "./AdminConponent/Mana-Order/OrderDeign";

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
            <Route path="/order-of-user" element={<OrderListOfUser />} />
            <Route
              path="/order-of-user/order-detail-user/:OrderId"
              element={<OrderDetailUser />}
            />
          </Route>

          {(user.Role === 1 || user.Role === 2) && (
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Dashboard />} />
              {user.Role === 1 && (
                <>
                  <Route
                    path="manage-account/customer"
                    element={<ListAccount role="customer" />}
                  />
                  <Route
                    path="manage-account/staff"
                    element={<ListAccount role="staff" />}
                  />
                  <Route
                    path="manage-account/addUser"
                    element={<AddUserButton />}
                  />
                  <Route
                    path="manage-account/edit/:UserId"
                    element={<EditAccount />}
                  />
                </>
              )}
              <Route path="manage-blogs" element={<ListBlogs />} />

              {/* Material */}
              <Route path="manage-material" element={<ListMaterial />} />
              <Route
                path="manage-material/addMaterial"
                element={<AddMaterial />}
              />
              <Route
                path="manage-material/addCostMaterial"
                element={<AddCostMaterial />}
              />
              <Route
                path="manage-material/editMaterial"
                element={<EditMaterial />}
              />

              <Route path="manage-blogs/addBlog" element={<AddBlogs />} />
              <Route path="manage-diamond" element={<ListDiamond />} />
              <Route
                path="manage-diamond/addDiamond"
                element={<AddDiamond />}
              />
              <Route path="manage-order" element={<ListOrder />} />
              {/* Product */}
              <Route path="manage-product" element={<ListProduct />} />
              <Route
                path="manage-product/addProduct"
                element={<AddProduct />}
              />
              <Route path="manage-order-detail" element={<ListOrderDetail />} />
              <Route
                path="manage-order/List-Request"
                element={<OrderListRequest />}
              />
              <Route
                path="manage-order/List-Request/OrderDetail/:OrderId"
                element={<OrderDetailPage />}
              />
              <Route
                path="manage-order/List-Request/Order-Manager"
                element={<OrderManger />}
              />
              <Route
                path="manage-order/List-Request/Order-Design"
                element={<OrderDesign />}
              />
            </Route>
          )}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
