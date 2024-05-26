// src/App.js
import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Notification from "../AdminConponent/Notification";
import "../css/Admin.css";
// import Header from "../conponent/Header";
// import Footer from "../conponent/Footer";

const Admin = () => {
  return (
    <>

      <div className="admin-container">
        <Notification />
        <nav className="sidebar">
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/users">User Management</a>
            </li>
            <li>
              <a href="/orders">Order Management</a>
            </li>
            <li>
              <a href="/products">Product Management</a>
            </li>
          </ul>
        </nav>
        <div className="content"></div>
      </div>

    </>
  );
};

export default Admin;
