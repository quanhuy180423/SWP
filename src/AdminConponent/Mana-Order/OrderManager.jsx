import React, { useEffect, useState } from 'react';
import { getAllOrders, updateStatusOrdeById } from '../../server/api';
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
import { colors, IconButton } from '@mui/material';

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

const getRowBackgroundColor = (status) => {
    switch (status) {
        case 'Request':
            return colors.red[100];
        case 'Payment':
            return colors.blue[100];
        case 'Processing':
            return colors.purple[100];
        case 'Complete':
            return colors.green[100];
        case 'Shipped':
            return colors.green[100];
        default:
            return 'inherit';
    }
};


const OrderManger = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.Id) {
            const userId = storedUser.Id;
            console.log(userId);
            try {
                const response = await getAllOrders(userId);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        } else {
            console.error('User ID not found in localStorage');
            setError('User ID not found in localStorage');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSendManager = async (order) => {
        const OrderId = order.OrderId;
        const Status = order.Status = "AptQuote";
        console.log(order);
        try {
            await updateStatusOrdeById(OrderId, Status);
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o.OrderId === order.OrderId ? { ...o, Status: 'AptQuote' } : o
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

    // Sort orders to prioritize those with status "Request"
    const sortedOrders = [...orders].sort((a, b) => (a.Status === 'Request' ? -1 : 1));

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
                            <StyledTableCell>Name Customer</StyledTableCell>
                            <StyledTableCell>Description Order</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell style={{ display: 'flex', justifyContent: 'center' }}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedOrders.length > 0 ? (
                            sortedOrders.map((order) => (
                                <StyledTableRow key={order.OrderId}>
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.Name}</StyledTableCell>
                                    <StyledTableCell>{order.Description}</StyledTableCell>
                                    <StyledTableCell>{order.Address}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton style={{ backgroundColor: getRowBackgroundColor(order.Status), fontWeight: 'bold', borderRadius: '15px', fontSize: '15px' }}>
                                            {order.Status}
                                        </IconButton>
                                    </StyledTableCell>
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
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleSendManager(order)}
                                        >
                                            Accept Quote
                                        </Button>
                                        {/* <Button variant="contained" color="error">
                                            Decline
                                        </Button> */}
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

export default OrderManger;
