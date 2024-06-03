import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './page/Admin';
// import Dashboard from './AdminComponent/Dashboard';
// import UserManagement from './AdminComponent/UserManagement';
// import OrderManagement from './AdminComponent/OrderManagement';
// import ProductManagement from './AdminComponent/ProductManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin" element={<Admin />}>
        {/* <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
