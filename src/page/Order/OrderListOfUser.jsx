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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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

const OrderListOfUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const navigate = useNavigate();
    const fetchOrders = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.Id) {
            const userId = storedUser.Id;
            console.log(userId);
            try {
                const response = await getOrderByUserId(userId);
                const sortOrder = response.data.sort((a, b) => b.OrderId - a.OrderId)
                setOrders(sortOrder);
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
            <Typography variant="h4" gutterBottom style={{ width: '100%', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                Orders
            </Typography>
            <Box width='100%' display='flex' justifyContent='end'>
                <Button style={{ color: 'black', textDecoration: 'underline', fontSize: '20px' }} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
            <Box mb={2} display="flex" alignItems="center">
                <Button variant={selectedStatus === 'All' ? 'contained' : 'none'} onClick={() => setSelectedStatus('All')}>
                    All
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button variant={selectedStatus === 'RqOrder' ? 'contained' : 'none'} onClick={() => setSelectedStatus('RqOrder' || 'Rq_Again')}>
                    Request Order
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button variant={selectedStatus === 'ChkOut' ? 'contained' : 'none'} onClick={() => setSelectedStatus('ChkOut')}>
                    Check Out
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button variant={(selectedStatus === 'Design' || selectedStatus === 'D_Again' || selectedStatus === 'banked' || selectedStatus === 'Production') ? 'contained' : 'none'}
                    onClick={() => setSelectedStatus('Design' || 'banked' || 'Production' || 'D_Again')}
                >
                    Processing
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button variant={selectedStatus === 'ProComl' ? 'contained' : 'none'} onClick={() => setSelectedStatus('ProComl')}>
                    Production Complete
                </Button>
                <DividerStyled orientation="vertical" flexItem />
                <Button variant={selectedStatus === 'Ship' ? 'contained' : 'none'} onClick={() => setSelectedStatus('Ship')}>
                    Ship
                </Button>
                <DividerStyled orientation="vertical" flexItem />
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
                            <StyledTableCell
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterOrders().length > 0 ? (
                            filterOrders().map((order) => (
                                <StyledTableRow key={order.OrderId}>
                                    <StyledTableCell component="th" scope="row">
                                        {order.OrderId}
                                    </StyledTableCell>
                                    <StyledTableCell>{order.Name}</StyledTableCell>
                                    <StyledTableCell>{order.Description}</StyledTableCell>
                                    <StyledTableCell>{order.Address}</StyledTableCell>
                                    <StyledTableCell>{generateStatus(order.Status)}</StyledTableCell>
                                    <StyledTableCell
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        <Button
                                            component={Link}
                                            to={`/order-of-user/order-detail-user/${order.OrderId}`}
                                            variant="contained"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            View Details
                                        </Button>
                                        {(order.Status === 'RqOrder' || order.Status === 'Order_COD') && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleCancelOrder(order)}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        {order.Status === 'ProComl' && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleOpenDialog(order)}
                                            >
                                                Choose method
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

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Select Receiving Method</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to have the order delivered to your home?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSelectReceivingMethod('Store')} color="primary">
                        No
                    </Button>
                    <Button onClick={() => handleSelectReceivingMethod('Home')} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderListOfUser;
