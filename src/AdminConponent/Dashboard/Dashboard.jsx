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
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    colors
} from '@mui/material';
import Header from '../Header/Header';

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
        fetchOrderData();
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
            const totalUser = response.data[0]?.TotalUser || 0;
            setNewCustomers(totalUser);
        } catch (error) {
            console.error('Error fetching new customers data:', error);
            setNewCustomers(0);
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
            const totalOrder = response.data[0]?.OrderCount || 0;
            setOrdeTotal(totalOrder);
        } catch (error) {
            console.error('Error fetching total orders data:', error);
            setOrdeTotal(0);
        }
    };

    const fetchTotalOrderDetai = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalOrderDetail');
            const totalOrderDetail = response.data[0]?.OrderDetailCount || 0;
            setTotalOrderDetail(totalOrderDetail);
        } catch (error) {
            console.error('Error fetching total order details data:', error);
            setTotalOrderDetail(0);
        }
    };

    const fetchTotalAmountOrderDetai = async () => {
        try {
            const response = await axios.get('http://localhost:8090/test/getTotalAmountOrderDetail');
            const totalProductCost = response.data[0]?.TotalProductCost || 0;
            setTotalAmountOrderDetail(totalProductCost);
        } catch (error) {
            console.error('Error fetching total order amount data:', error);
            setTotalAmountOrderDetail(0);
        }
    };

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

    const lineChartData = {
        labels: OrderDetail.map((data) => data.MonthName),
        datasets: [
            {
                label: 'Monthly product sales',
                data: OrderDetail.map((data) => data.TotalProductCost),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }
        ],
    };

    return (
        <Container>
            <Header title='Dashboard' />
            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={6}>
                    <Card
                        sx={{
                            backgroundColor: colors.lightBlue[100]
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="h2" display='flex' justifyContent='center'>Total number of users</Typography>
                            <Typography variant="h3" display='flex' justifyContent='center'>{newCustomers.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card
                        sx={{
                            backgroundColor: colors.red[100]
                        }}
                    >
                        <CardContent>
                            <Typography variant="h3" component="h2" fontWeight='bold' display='flex' justifyContent='center'>Sales Data</Typography>
                            <Typography variant="body1" fontWeight='bold' display='flex' justifyContent='center'>Total order: {OrderTotal.toLocaleString()}</Typography>
                            <Typography variant="body1" fontWeight='bold' display='flex' justifyContent='center'>Total Product: {TotalOrderDetail.toLocaleString()}</Typography>
                            <Typography variant="body1" fontWeight='bold' display='flex' justifyContent='center'>Total revenue: {TotalAmountOrderDetail.toLocaleString()} VND</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Card mb={4}>
                <CardContent>
                    <Typography variant="h6">Monthly Orders</Typography>
                    <Bar data={data} />
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h6">Line Chart</Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select Year</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            label="Select Year"
                        >
                            <MenuItem value={2020}>2020</MenuItem>
                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                    </FormControl>
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
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;
