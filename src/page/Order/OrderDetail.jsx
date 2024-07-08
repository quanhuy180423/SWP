import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailByOrderId, getProductById } from '../../server/api';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const OrderDetailPage = () => {
    const { OrderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await getOrderDetailByOrderId(OrderId);
                setOrderDetail(response.data[0]);
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

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <Box p={3}>
            {orderDetail && (
                <Box mb={3}>
                    <Typography variant="h4" gutterBottom>Order Details</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {Object.entries(orderDetail).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell variant="head">{key}</TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => handleProductDetail(orderDetail.ProductId)}>
                            View Product Details
                        </Button>
                    </Box>
                </Box>
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
                                            <TableCell variant="head">{key}</TableCell>
                                            <TableCell>
                                                {key === 'Image' ? (
                                                    <img src={value} alt={productDetail.Name} width="100" />
                                                ) : key === 'Description' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: value }} />
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

export default OrderDetailPage;
