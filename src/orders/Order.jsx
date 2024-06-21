import React, { useContext } from 'react';
import { OrderContext } from '../orders/OrderContext';

const Order = () => {
    const { orders } = useContext(OrderContext);

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="min-w-full bg-white border-spacing-1">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Name</th>
                        <th className="py-2 px-4 border-b border-gray-200">Date</th>
                        <th className="py-2 px-4 border-b border-gray-200">Image</th>
                        <th className="py-2 px-4 border-b border-gray-200">Price</th>
                        <th className="py-2 px-4 border-b border-gray-200">Status</th>
                        <th className="py-2 px-4 border-b border-gray-200">Description</th>
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
                            <td className="py-2 px-4 border-b border-gray-200">{order.status}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{order.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Order;
