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
    const [OrderDetail, setOrderDetail] = useState([]);
    const [OrderTotal, setOrdeTotal] = useState(0);
    const [TotalOrderDetail, setTotalOrderDetail] = useState(0);
    const [TotalAmountOrderDetail, setTotalAmountOrderDetail] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    useEffect(() => {
        fetchOrderData();//số đơn hàng đã bán trong các tháng
        fetchNewCustomers();
        fetchTotalOrder();
        fetchTotalOrderDetai();
        fetchTotalAmountOrderDetai();
        fetchOrderDetailData();
    }, [selectedYear]);

    const fetchOrderData = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalOrderDetailAllMonth?Year=2024');
            setOrderData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching order data:', error);
            setOrderData([]);
        }
    };

    const fetchNewCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalUser');
            const totalUser = response.data[0]?.TotalUser || 0; // Lấy giá trị TotalUser từ response
            setNewCustomers(totalUser); // Cập nhật state newCustomers
        } catch (error) {
            console.error('Error fetching new customers data:', error);
            setNewCustomers(0); // Xử lý lỗi và đặt lại giá trị newCustomers thành 0
        }
    };

    const fetchOrderDetailData = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/test/getTotalAmountOrderDetailAllMonth?Year=${selectedYear}`);
            setOrderDetail(response.data);
        } catch (error) {
            console.error('Error fetching monthly orders data:', error);
            setOrderDetail([]);
        }
    };

    const fetchTotalOrder = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalOrder');
            const totalOrder = response.data[0]?.OrderCount || 0; // Lấy giá trị TotalUser từ response
            setOrdeTotal(totalOrder); // Cập nhật state newCustomers
        } catch (error) {
            console.error('Error fetching new customers data:', error);
            setOrdeTotal(0); // Xử lý lỗi và đặt lại giá trị newCustomers thành 0
        }
    };

    const fetchTotalOrderDetai = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalOrderDetail');
            const totalOrderDetail = response.data[0]?.OrderDetailCount || 0; // Lấy giá trị TotalUser từ response
            setTotalOrderDetail(totalOrderDetail); // Cập nhật state newCustomers
        } catch (error) {
            console.error('Error fetching new customers data:', error);
            setTotalOrderDetail(0); // Xử lý lỗi và đặt lại giá trị newCustomers thành 0
        }
    };
    const fetchTotalAmountOrderDetai = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalAmountOrderDetail');
            const totalProductCost = response.data[0]?.TotalProductCost || 0; // Lấy giá trị TotalUser từ response
            setTotalAmountOrderDetail(totalProductCost); // Cập nhật state newCustomers
        } catch (error) {
            console.error('Error fetching new customers data:', error);
            setTotalAmountOrderDetail(0); // Xử lý lỗi và đặt lại giá trị newCustomers thành 0
        }
    };


    // const ordersPerMonth = orderData.reduce((acc, order) => {
    //     const month = new Date(order.date).getMonth();
    //     acc[month] = (acc[month] || 0) + 1;
    //     return acc;
    // }, {});

    const data = {
        labels: orderData.map(data => data.MonthName),
        datasets: [
            {
                label: 'Product Per Month',
                data: orderData.map(data => data.OrderDetailCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    //biểu đồ đường mô tả doanh thu trong tuần, tháng, quý, năm
    const lineChartData = {
        labels: OrderDetail.map((data) => data.MonthName), // Tên viết tắt của tháng
        datasets: [
            {
                label: 'Monthly product sales',
                data: OrderDetail.map((data) => data.TotalProductCost), // Số order trong từng tháng
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }
        ],
    };

    return (
        <div className="container mx-auto">
            <div className='flex mb-20'>
                <div className="px-4 py-2 bg-blue-300 text-white rounded w-1/2 mr-10">
                    <h2 className="text-2xl font-bold">Total number of users</h2>
                    <p>{newCustomers}</p>
                </div>
                <div className="px-4 py-2 bg-red-300 text-white rounded w-1/2 mr-10">
                    <h2 className="text-2xl font-bold">Sales Data</h2>
                    <p>Total order:{OrderTotal}</p>
                    <p>Total Product:{TotalOrderDetail}</p>
                    <p>Total revenue:{TotalAmountOrderDetail} VND</p>
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
                <div className="dataCard">
                    <div>
                        <label>Select Year: </label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value={2020}>2020</option>
                            <option value={2021}>2021</option>
                            <option value={2022}>2022</option>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                            {/* Add more years as needed */}
                        </select>
                    </div>
                    <Line
                        data={lineChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Monthly product sales',
                                    font: {
                                        size: 20,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;