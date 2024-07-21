import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetailByOrderId, getProductById, updateProductById } from '../../server/api';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Grid } from '@mui/material';
import Header from '../Header/Header';
import handleUploadImages from '../../firebase/HandleUploadToFirebase';
import ImageUpload from '../Upload-Image/UploadImage';

const OrderDetailPage = () => {
    const { OrderId } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUpdatePriceOpen, setIsUpdatePriceOpen] = useState(false);
    const [isUpdateImageOpen, setIsUpdateImageOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [calculatedProductCost, setCalculatedProductCost] = useState(0);
    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});

    const formatNumber = (number) => {
        return new Intl.NumberFormat('vi-VN').format(number);
    };

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
            const cost = response.data.MaterialCost * response.data.QuantityMaterial + response.data.GemCost;
            setCalculatedProductCost(cost);
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
        setNewPrice(productDetail.ProductCost); // Set default value to current product cost
    };

    const handlePriceChange = (event) => {
        const value = event.target.value.replace(/\./g, ''); // Remove existing dots
        setNewPrice(value);
    };

    const handleSavePrice = async () => {
        if (newPrice && productDetail) {
            const numericPrice = parseFloat(newPrice.replace(/\./g, '')); // Convert formatted string back to number
            if (numericPrice > calculatedProductCost) {
                try {
                    const updatedProduct = { ...productDetail, ProductCost: numericPrice };
                    await updateProductById(updatedProduct);
                    setProductDetail(updatedProduct);
                    setIsUpdatePriceOpen(false);
                } catch (error) {
                    console.error('Error updating product price:', error);
                }
            } else {
                setErrors({ price: 'The new price must be greater than the calculated product cost.' });
            }
        }
    };

    const handleUpdateImage = () => {
        setIsUpdateImageOpen(true);
    };

    const handleImagesUpload = (files) => {
        setImageFiles(files);
    };

    const handleSaveImage = async () => {
        if (imageFiles.length > 0 && productDetail) {
            try {
                const imageUrls = await handleUploadImages(imageFiles);
                const updatedProduct = { ...productDetail, Image: imageUrls };
                await updateProductById(updatedProduct);
                setProductDetail(updatedProduct);
                setIsUpdateImageOpen(false);
            } catch (error) {
                console.error('Error updating product image:', error);
            }
        } else {
            setErrors({ Image: 'Please select images to upload' });
        }
    };

    return (
        <Box p={3}>
            <Header title='Order Details' subtitle='' />
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
                                                        {Array.isArray(value) ? value.map((url, index) => (
                                                            <Grid item xs={3} key={index}>
                                                                <img src={url} alt={productDetail.Name} width='150' height='150' />
                                                            </Grid>
                                                        )) : (
                                                            <img src={value} alt={productDetail.Name} width='150' height='150' />
                                                        )}
                                                    </Grid>
                                                ) : key === 'Description' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: value }} />
                                                ) : key === 'ProductCost' ? (
                                                    <strong>{formatNumber(value)} đ</strong>
                                                ) : key === 'MaterialCost' ? (
                                                    <strong>{formatNumber(value)} đ</strong>
                                                ) : key === 'GemCost' ? (
                                                    <strong>{formatNumber(value)} đ</strong>
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell variant="head"><strong>Calculated Product Cost</strong></TableCell>
                                        <TableCell>{formatNumber(calculatedProductCost)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    {productDetail && orderDetail.some(detail => detail.Status === 'RqOrder') && (
                        <Button onClick={handleUpdatePrice} color="primary">Update Price</Button>
                    )}
                    {productDetail && orderDetail.some(detail => ['Design', 'Production', 'D_Again'].includes(detail.Status)) && (
                        <Button onClick={handleUpdateImage} color="primary">Update Image</Button>
                    )}
                    <Button onClick={handleClosePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isUpdatePriceOpen} onClose={() => setIsUpdatePriceOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Update Price</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Calculated Product Cost: {formatNumber(calculatedProductCost)}</Typography>
                    <TextField
                        label="New Price"
                        value={formatNumber(newPrice)}
                        onChange={handlePriceChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    {errors.price && <Typography color="error">{errors.price}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSavePrice} color="primary">Save</Button>
                    <Button onClick={() => setIsUpdatePriceOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isUpdateImageOpen} onClose={() => setIsUpdateImageOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Update Image</DialogTitle>
                <DialogContent>
                    <ImageUpload orderId={OrderId} visible={true} onImagesUpload={handleImagesUpload} />
                    {errors.Image && <Typography color="error">{errors.Image}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveImage} color="primary">Save</Button>
                    <Button onClick={() => setIsUpdateImageOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetailPage;
