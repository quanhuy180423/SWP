import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [newCustomers, setNewCustomers] = useState(0);
  const [salesData, setSalesData] = useState({ weekly: [], monthly: [], quarterly: [], yearly: [] });

  useEffect(() => {
    fetchOrderData();
    fetchNewCustomers();
    fetchSalesData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      setOrderData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching order data:', error);
      setOrderData([]);
    }
  };

  const fetchNewCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customers/new');
      setNewCustomers(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching new customers data:', error);
      setNewCustomers(0);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sales');
      setSalesData(response.data || { weekly: [], monthly: [], quarterly: [], yearly: [] });
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setSalesData({ weekly: [], monthly: [], quarterly: [], yearly: [] });
    }
  };

  const ordersPerMonth = orderData.reduce((acc, order) => {
    const month = new Date(order.date).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Orders Per Month',
        data: Array.from({ length: 12 }, (_, i) => ordersPerMonth[i] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: salesData.weekly.length ? salesData.weekly.map((_, index) => `Week ${index + 1}`) : [],
    datasets: [
      {
        label: 'Weekly Sales',
        data: salesData.weekly.length ? salesData.weekly : [],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Monthly Sales',
        data: salesData.monthly.length ? salesData.monthly : [],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Quarterly Sales',
        data: salesData.quarterly.length ? salesData.quarterly : [],
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Yearly Sales',
        data: salesData.yearly.length ? salesData.yearly : [],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ],
  };

  return (
    <div className="container mx-auto">
      <div className='flex mb-20'>
        <div className="px-4 py-2 bg-blue-300 text-white rounded w-1/2 mr-10">
          <h2 className="text-2xl font-bold">New Customers</h2>
          <p>{newCustomers}</p>
        </div>
        <div className="px-4 py-2 bg-red-300 text-white rounded w-1/2 mr-10">
          <h2 className="text-2xl font-bold">Sales Data</h2>
          <p>Weekly Sales: {salesData.weekly.reduce((a, b) => a + b, 0)}</p>
          <p>Monthly Sales: {salesData.monthly.reduce((a, b) => a + b, 0)}</p>
          <p>Yearly Sales: {salesData.yearly.reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-chart-bar me-1"></i>
        </div>
        <div className="card-body">
          <Bar data={data} />
        </div>
      </div>
      <div className="card mb-4 mt-10">
        <div className="card-header">
          <i className="fas fa-chart-line me-1"></i>
          Line Chart
        </div>
        <div className="card-body">
          <Line data={lineChartData} />
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
