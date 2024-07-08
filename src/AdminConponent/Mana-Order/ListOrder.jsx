import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllOrders } from '../../server/api';
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const requestOrders = orders.filter((order) => order.Status === 'Request');

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
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestOrders.length > 0 ? (
                            requestOrders.map((order) => (
                                <StyledTableRow key={order.OrderId}>
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.Name}</StyledTableCell>
                                    <StyledTableCell>{order.Description}</StyledTableCell>
                                    <StyledTableCell>{order.Address}</StyledTableCell>
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
                                        <Button variant="contained" color="secondary">
                                            Accept
                                        </Button>
                                        <Button variant="contained" color="error">
                                            Decline
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">
                                    No order requests found.
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
