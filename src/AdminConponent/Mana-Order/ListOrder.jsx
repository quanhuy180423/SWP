import React, { useEffect, useState } from 'react';
import { getAllOrders, getOrderDetailByOrderId, updateStatusOrderDetailById } from '../../server/api';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const OrderListRequest = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (order, newOrderStatus, newDetailStatus) => {
        try {
            await updateStatusOrderDetailById({ OrderId: order.OrderId, Status: newOrderStatus });
            const orderDetailsResponse = await getOrderDetailByOrderId(order.OrderId);
            const orderDetails = orderDetailsResponse.data;
            await Promise.all(orderDetails.map(detail =>
                updateStatusOrderDetailById({ OrderDetailId: detail.OrderDetailId, Status: newDetailStatus })
            ));
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o.OrderId === order.OrderId ? { ...o, Status: newOrderStatus } : o
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Error updating order status');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredOrders = orders.filter(order => order.Status === 'ChkOut' || order.Status === 'RqOrder');

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Order Requests
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell>Order Date</StyledTableCell>
                            <StyledTableCell>Product ID</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <StyledTableRow key={order.OrderId}>
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.OrderDate}</StyledTableCell>
                                    <StyledTableCell>{order.ProductId}</StyledTableCell>
                                    <StyledTableCell>{order.Status}</StyledTableCell>
                                    <StyledTableCell
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '300px',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={`/admin/manage-order/List-Request/OrderDetail/${order.OrderId}`}
                                        >
                                            View
                                        </Button>
                                        {order.Status === 'RqOrder' && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleUpdateStatus(order, 'AptQuote', 'AptQuote')}
                                            >
                                                Send Manager
                                            </Button>
                                        )}
                                        {order.Status === 'ChkOut' && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleUpdateStatus(order, 'Pro', 'Design')}
                                            >
                                                Send Design
                                            </Button>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">
                                    No orders found.
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderListRequest;
