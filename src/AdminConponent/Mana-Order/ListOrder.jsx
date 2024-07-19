import React, { useEffect, useState } from 'react';
import { getAllOrders, getOrderDetailByOrderId, updateStatusOrdeById, updateStatusOrderDetailById } from '../../server/api';
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
import Divider from '@mui/material/Divider';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme, status }) => ({
    backgroundColor: theme.palette.grey,
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    height: '30px',
    alignSelf: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
}));

const generateStatus = (status) => {
    switch (status) {
        case 'RqOrder':
            return 'Request Order';
        case 'AptQuote':
            return 'Accept Quote';
        case 'ChkOut':
            return 'Check Out';
        case 'banked':
            return 'Processing';
        case 'ProComl':
            return 'Production Complete';
        case 'Ship':
            return 'Ship';
        case 'Done':
            return 'Done';
        case 'Cancel':
            return 'Cancelled';
        default:
            return status;
    }
};



const OrderListRequest = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('All');

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
            await updateStatusOrdeById({ OrderId: order.OrderId, Status: newOrderStatus });
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

    const handleCancelOrder = async (order) => {
        try {
            await handleUpdateStatus(order, 'Cancel', 'Cancel');
        } catch (error) {
            console.error('Error cancelling order:', error);
            setError('Error cancelling order');
        }
    };

    const filterOrders = () => {
        if (selectedStatus === 'All') {
            return orders.filter(order => order.Status === 'RqOrder' || order.Status === 'banked' || order.Status === 'Order_COD ');
        }
        return orders.filter(order => order.Status === selectedStatus);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredOrders = filterOrders();

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Order Requests
            </Typography>
            <Box mb={2} display="flex" alignItems="center">
                <Button
                    variant={selectedStatus === 'RqOrder' ? 'contained' : 'none'}
                    onClick={() => setSelectedStatus('RqOrder')}
                >
                    Request Order
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button
                    variant={selectedStatus === 'banked' ? 'contained' : 'none'}
                    onClick={() => setSelectedStatus('banked')}
                >
                    Banked
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button
                    variant={selectedStatus === 'Order_COD' ? 'contained' : 'none'}
                    onClick={() => setSelectedStatus('Order_COD')}
                >
                    Order using COD
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <StyledTableRow key={order.OrderId} status={order.Status}>
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.Name}</StyledTableCell>
                                    <StyledTableCell>{order.Phone}</StyledTableCell>
                                    <StyledTableCell>{order.Address}</StyledTableCell>
                                    <StyledTableCell>{generateStatus(order.Status)}</StyledTableCell>
                                    <StyledTableCell
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '400px',
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
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleUpdateStatus(order, 'RqQuote', 'RqQuote')}
                                                >
                                                    Send Manager
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleCancelOrder(order)}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        )}
                                        {order.Status === 'banked' && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleUpdateStatus(order, 'Design', 'Design')}
                                            >
                                                Send Design
                                            </Button>
                                        )}
                                        {order.Status === 'Order_COD' && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleUpdateStatus(order, 'Design', 'Design')}
                                            >
                                                Send Design
                                            </Button>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} align="center">
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
