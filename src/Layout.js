import React from "react";
import Header from "./conponent/header/Header";
import Footer from "./conponent/Footer";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./conponent/Breadcrumb";
const Layout = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
