import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetailByOrderId, getProductById, updateProductById } from '../../server/api';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Alert, Grid } from '@mui/material';
import Header from '../Header/Header';
import handleUploadImages from '../../firebase/HandleUploadToFirebase';
import ImageUpload from '../Upload-Image/UploadImage';  // Adjust the import path as necessary

const OrderDetailPage = () => {
    const { OrderId } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUpdatePriceOpen, setIsUpdatePriceOpen] = useState(false);
    const [isUpdateImageOpen, setIsUpdateImageOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});

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
                const updatedProduct = { ...productDetail, ProductCost: newPrice };
                await updateProductById(updatedProduct);
                setProductDetail(updatedProduct);
                setIsUpdatePriceOpen(false);
            } catch (error) {
                console.error('Error updating product price:', error);
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
                const updatedProduct = { ...productDetail, Image: imageUrls }; // Assuming product has Images field to store multiple URLs
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
            {orderDetail && (
                <Box mb={3}>
                    <Header title='Order Details' subtitle='' />

                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Button variant="contained" color="warning" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleProductDetail(orderDetail.ProductId)}>
                            View Product Details
                        </Button>

                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {Object.entries(orderDetail).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell variant="head"><strong>{key}</strong></TableCell>
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
                                            <TableCell variant="head"><strong>{key}</strong></TableCell>
                                            <TableCell>
                                                {key === 'Image' ? (
                                                    <Grid container spacing={1}>
                                                        {value.map((url, index) => (
                                                            <Grid item xs={3} key={index} width='150' height='150'>
                                                                <img src={url} alt={productDetail.Name} />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                ) : key === 'Description' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: value }} />
                                                ) : key === 'ProductCost' ? (
                                                    <strong>{value}</strong>
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

                    {orderDetail && (orderDetail.Status === 'RqOrder') && (
                        <Button onClick={handleUpdatePrice} color="primary">Update Price</Button>
                    )}
                    {orderDetail && (orderDetail.Status === 'Design' || orderDetail.Status === 'Production') && (
                        <Button onClick={handleUpdateImage} color="primary">Update Image</Button>
                    )}
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

            <Dialog open={isUpdateImageOpen} onClose={() => setIsUpdateImageOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Update Image</DialogTitle>
                <DialogContent>
                    <ImageUpload orderId={OrderId} visible={true} onImagesUpload={handleImagesUpload} />
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
