import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailByOrderId, getProductById, updateProduct } from '../../server/api';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField } from '@mui/material';
import Header from '../Header/Header';

const OrderDetailPage = () => {
    const { OrderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUpdatePriceOpen, setIsUpdatePriceOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('');

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

    const handleUpdatePrice = () => {
        setIsUpdatePriceOpen(true);
    };

    const handlePriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const handleSavePrice = async () => {
        if (newPrice && productDetail) {
            try {
                const updatedProduct = { ...productDetail, MaterialCost: newPrice }; // Assuming MaterialCost is the field to update
                await updateProduct(productDetail.ProductId, updatedProduct);
                setProductDetail(updatedProduct); // Update local state with the new price
                setIsUpdatePriceOpen(false);
            } catch (error) {
                console.error('Error updating product price:', error);
            }
        }
    };

    return (
        <Box p={3}>
            {orderDetail && (
                <Box mb={3}>
                    <Typography variant="h4" gutterBottom></Typography>
                    <Header title='Order Details' subtitle='' />
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
                        <Button variant="contained" color="primary" onClick={() => handleProductDetail(orderDetail.ProductId)}>
                            View Product Details
                        </Button>
                    </Box>
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
                    <Button onClick={handleUpdatePrice} color="primary">Update Price</Button>
                    <Button onClick={handleClosePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isUpdatePriceOpen} onClose={() => setIsUpdatePriceOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Update Price</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Price"
                        value={newPrice}
                        onChange={handlePriceChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSavePrice} color="primary">Save</Button>
                    <Button onClick={() => setIsUpdatePriceOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetailPage;
