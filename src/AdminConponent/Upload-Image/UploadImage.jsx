import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUpload = ({ orderId, visible, onImagesUpload }) => {
    const [images, setImages] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...files.map(file => URL.createObjectURL(file))]);
        onImagesUpload(files);  // Pass the files back to the parent component
    };

    const handleDeleteAllImages = () => {
        setImages([]);
        setIsDeleteDialogOpen(false);
    };

    const openDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    if (!visible) return null;

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Upload Images for Order {orderId}</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button"
                multiple
                type="file"
                onChange={handleImageUpload}
            />
            <label htmlFor="upload-button">
                <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
                    Upload Images
                </Button>
            </label>
            {images.length > 0 && (
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {images.map((image, index) => (
                            <Grid item xs={3} key={index}>
                                <img src={image} alt={`uploaded ${index}`} width="100%" />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={openDeleteDialog}
                        style={{ marginTop: '20px' }}
                    >
                        Delete All Images
                    </Button>
                </Box>
            )}

            <Dialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
            >
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete all images?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAllImages} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ImageUpload;
