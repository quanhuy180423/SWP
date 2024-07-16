import React, { useEffect, useState } from 'react';
import { getOrderByUserId, getOrderDetailByOrderId, updateStatusOrdeById, updateStatusOrderDetailById } from '../../server/api';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, colors, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

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
        default:
            return status;
    }
};

const getRowBackgroundColor = (status) => {
    switch (status) {
        case 'RqOrder':
            return colors.red[100];
        case 'AptQuote':
            return colors.blue[100];
        case 'ChkOut':
            return colors.yellow[100];
        case 'banked':
            return colors.purple[100];
        case 'ProComl':
            return colors.green[100];
        case 'Ship':
            return colors.teal[100];
        case 'Done':
            return colors.green[200];
        default:
            return 'inherit';
    }
};

const OrderListOfUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');

    const fetchOrders = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.Id) {
            const userId = storedUser.Id;
            console.log(userId);
            try {
                const response = await getOrderByUserId(userId);
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

    const handleOpenDialog = (order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedOrder(null);
    };

    const handleSelectReceivingMethod = (method) => {
        console.log(`Selected method: ${method} for order ID: ${selectedOrder.OrderId}`);
        if (method === 'Home') {
            handleUpdateStatus(selectedOrder, 'Ship', 'Ship');
        }
        handleCloseDialog();
    };

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

    const filterOrders = () => {
        if (selectedStatus === 'All') {
            return orders;
        }
        return orders.filter(order => order.Status === selectedStatus);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            <Box mb={2}>
                <Button variant={selectedStatus === 'All' ? 'contained' : 'none'} onClick={() => setSelectedStatus('All')}
                    style={{

                    }}
                >
                    All
                </Button>
                <Button variant={selectedStatus === 'RqOrder' ? 'contained' : 'none'} onClick={() => setSelectedStatus('RqOrder')}>
                    Request Order
                </Button>
                <Button variant={selectedStatus === 'AptQuote' ? 'contained' : 'none'} onClick={() => setSelectedStatus('AptQuote')}>
                    Accept Quote
                </Button>
                <Button variant={selectedStatus === 'ChkOut' ? 'contained' : 'none'} onClick={() => setSelectedStatus('ChkOut')}>
                    Check Out
                </Button>
                <Button variant={selectedStatus === 'ProComl' ? 'contained' : 'none'} onClick={() => setSelectedStatus('ProComl')}>
                    Production Complete
                </Button>
                <Button variant={selectedStatus === 'Ship' ? 'contained' : 'none'} onClick={() => setSelectedStatus('Ship')}>
                    Ship
                </Button>
                <Button variant={selectedStatus === 'Done' ? 'contained' : 'none'} onClick={() => setSelectedStatus('Done')}>
                    Done
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell>Name Customer</StyledTableCell>
                            <StyledTableCell>Description Order</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterOrders().length > 0 ? (
                            filterOrders().map((order) => (
                                <StyledTableRow
                                    key={order.OrderId}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.Name}</StyledTableCell>
                                    <StyledTableCell>{order.Description}</StyledTableCell>
                                    <StyledTableCell>{order.Address}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton>
                                            <StyledTableCell
                                                style={{ backgroundColor: getRowBackgroundColor(order.Status), fontWeight: 'bold', borderRadius: '15px', width: '180px', display: 'flex', justifyContent: 'center' }}
                                            >
                                                {generateStatus(order.Status)}
                                            </StyledTableCell>
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton>
                                            <Button
                                                style={{ borderRadius: '15px', backgroundColor: colors.grey[300], color: 'black' }}
                                                component={Link}
                                                to={`/order-of-user/order-detail-user/${order.OrderId}`}
                                            >
                                                View your order
                                            </Button>
                                        </IconButton>
                                        {order.Status === 'ProComl' && (
                                            <IconButton>
                                                <Button
                                                    style={{ borderRadius: '15px', backgroundColor: colors.orange[300], color: 'black' }}
                                                    onClick={() => handleOpenDialog(order)}
                                                >
                                                    Method of receiving goods
                                                </Button>
                                            </IconButton>
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

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Select Receiving Method</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select how you would like to receive your goods for order ID: {selectedOrder?.OrderId}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSelectReceivingMethod('Store')} color="primary">
                        Receive goods at the store
                    </Button>
                    <Button onClick={() => handleSelectReceivingMethod('Home')} color="primary">
                        Receive goods at home (Ship)
                    </Button>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderListOfUser;
