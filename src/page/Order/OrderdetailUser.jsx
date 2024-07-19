import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetailByOrderId, getProductById, updateStatusOrdeById, updateStatusOrderDetailById } from '../../server/api';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, colors } from '@mui/material';
import { CartContext } from '../../cart/CartContext';

const OrderDetailUser = () => {
    const { OrderId } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { addToCart, clearCart } = useContext(CartContext);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await getOrderDetailByOrderId(OrderId);
                setOrderDetail(response.data);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        fetchOrderDetail();
    }, [OrderId]);

    const handleProductDetail = async (ProductId) => {
        try {
            const response = await getProductById(ProductId);
            setProductDetail(response.data);
            setIsPopupOpen(true);
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };

    const handleAcceptAndPayment = async () => {
        try {
            const response = await getProductById(orderDetail[0].ProductId); // Access the first order detail to get ProductId
            const product = response.data;
            clearCart();
            addToCart(product, 1);
            navigate('/checkout');
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };

    const handleUpdateStatus = async (order, newOrderStatus, newDetailStatus) => {
        try {
            await updateStatusOrdeById({ OrderId: order.OrderId, Status: newOrderStatus });
            const orderDetailsResponse = await getOrderDetailByOrderId(order.OrderId);
            const orderDetails = orderDetailsResponse.data;
            await Promise.all(orderDetails.map(detail =>
                updateStatusOrderDetailById({ OrderDetailId: detail.OrderDetailId, Status: newDetailStatus })
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom width='100%' display='flex' justifyContent='center' fontWeight='bold'>Order Details</Typography>
            <Button variant="contained" color="warning" onClick={() => navigate(-1)}>
                Back
            </Button>
            {orderDetail.length > 0 ? (
                orderDetail.map((orderdetail) => (
                    <Box mb={3} key={orderdetail.OrderDetailId}>

                        <Box mt={2} sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>

                            <Button variant="contained" color="primary" onClick={() => handleProductDetail(orderdetail.ProductId)}>
                                View Product Details
                            </Button>
                            {orderdetail.Status === 'ChkOut' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: '5px', backgroundColor: colors.red[200], marginLeft: '30px' }}
                                    onClick={handleAcceptAndPayment}
                                >
                                    Accept and Payment order
                                </Button>
                            )}
                            {(orderdetail.Status === 'Design' || orderdetail.Status === 'D_Again') && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: '5px', backgroundColor: colors.red[300], marginLeft: '30px' }}
                                        onClick={() => handleUpdateStatus(orderdetail, 'Production', 'Production')}
                                    >
                                        Accept and Production
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: '5px', backgroundColor: colors.red[300], marginLeft: '30px' }}
                                        onClick={() => handleUpdateStatus(orderdetail, 'D_Again', 'D_Again')}
                                    >
                                        Design Again
                                    </Button>
                                </>
                            )}
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(orderdetail).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell variant="head"><strong>{key}</strong></TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))
            ) : (
                <Typography variant="h6">No order details available.</Typography>
            )}

            <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="md" fullWidth>
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent dividers>
                    {productDetail && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(productDetail).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell variant="head"><strong>{key}</strong></TableCell>
                                            <TableCell>
                                                {key === 'Image' ? (
                                                    <Grid container spacing={1}>
                                                        {value.map((url, index) => (
                                                            <Grid item xs={3} key={index}>
                                                                <img src={url} alt={productDetail.Name} width='150' height='150' />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                ) : key === 'Description' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: value }} />
                                                ) : key === 'ProductCost' ? (
                                                    <strong className='text-red-600'>{value}</strong>
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetailUser;
