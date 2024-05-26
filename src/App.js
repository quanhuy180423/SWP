<<<<<<< HEAD
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./conponent/Header";
import HomePage from "./page/HomePage";
import LoginForm from "./page/LoginPage";
import OrderForm from "./page/OrderForm";
import Blogs from "./page/Blogs";
import Product from "./page/Product";
import Admin from "./page/Admin";
import Dashboard from "./AdminConponent/Dashboard";
import UserManagement from "./AdminConponent/UserManagement";
import OrderManagement from "./AdminConponent/OrderManagement";
import ProductManagement from "./AdminConponent/ProductManagement";
import News from "./conponent/News";
import UserInfo from "./page/UserInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/news" element={<News />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
=======
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationFormv2 from './components/RegistrationFormv2';
import LoginFormv2 from './components/LoginFormv2';
//add demo
// import { GoogleOAuthProvider } from '@react-oauth/google';

import BookingForm from './components/BookingForm';
import Banner from './components/Banner';
import Header from './pages/Header';
import HomePage from './components/HomePage';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginFormv2 />} />
          <Route path="/register" element={<RegistrationFormv2 />} />
          <Route path="/header" element={<Header />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route path='/banner' element={<Banner />} />
        </Routes>
      </div>
    </Router>
  );
};
>>>>>>> f806e71f65fa7d42cda1107fa42dbcbfaf29ab9e

export default App;
