import { useState, useEffect } from 'react';
import axios from 'axios';

const RequestOrder = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/Order')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setStatus(order.status);
    setDescription(order.description || '');
  };

  const handleSaveClick = (id) => {
    // Replace with your actual API endpoint
    axios.put(`https://6658c2355c3617052649bea2.mockapi.io/JewelyAPI/Order/${id}`, { status, description })
      .then(() => {
        // Update order in the state
        setOrders(orders.map(order =>
          order.id === id ? { ...order, status, description } : order
        ));
        setEditingOrder(null);
      })
      .catch(error => {
        console.error('There was an error updating the order!', error);
      });
  };

  const handleCancelClick = () => {
    setEditingOrder(null);
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
      <table className="min-w-full bg-white border-spacing-1">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Image</th>
            <th className="py-2 px-4 border-b border-gray-200">Price</th>
            <th className="py-2 px-4 border-b border-gray-200">Status</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{order.Name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{order.Date}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <img src={order.Img} alt={order.name} className="w-20 h-20 object-cover" />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{order.Price}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {editingOrder?.id === order.id ? (
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                ) : (
                  order.status
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {editingOrder?.id === order.id ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(order.id)}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 text-white p-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(order)}
                    className="bg-yellow-500 text-black p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingOrder && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default RequestOrder;
