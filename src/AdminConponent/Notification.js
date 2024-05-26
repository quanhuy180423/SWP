// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import { getOrders } from '../server/api';

const Notification = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      getOrders().then(response => {
        const newOrders = response.data.filter(order => order.status === 'pending');
        setPendingOrders(newOrders);
      });
    };

    const interval = setInterval(fetchOrders, 30000); // Kiểm tra mỗi 30 giây
    fetchOrders(); // Kiểm tra ngay khi component được mount

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, []);

  return (
    <div className="notification">
      {pendingOrders.length > 0 && (
        <div className="notification-alert">
          <span role="img" aria-label="bell">🔔</span> You have {pendingOrders.length} pending orders!
        </div>
      )}
    </div>
  );
};

export default Notification;
