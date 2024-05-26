// src/components/OrderManagement.js
import React, { useState, useEffect } from 'react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../server/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState('');

  useEffect(() => {
    getOrders().then(response => setOrders(response.data));
  }, []);

  const handleAddOrder = () => {
    addOrder({ description: newOrder }).then(() => {
      setOrders([...orders, { description: newOrder }]);
      setNewOrder('');
    });
  };

  const handleDeleteOrder = (id) => {
    deleteOrder(id).then(() => {
      setOrders(orders.filter(order => order.id !== id));
    });
  };

  return (
    <div>
      <h2>Order Management</h2>
      <input
        type="text"
        value={newOrder}
        onChange={(e) => setNewOrder(e.target.value)}
        placeholder="New Order"
      />
      <button onClick={handleAddOrder}>Add Order</button>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.description}
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
