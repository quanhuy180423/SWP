import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../server/api";
import { Box, Button, colors, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, IconButton } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const getListProduct = async () => {
            try {
                const response = await getAllProducts();
                const productsWithIndex = response.data.map((product, index) => ({
                    ...product,
                    index: index + 1
                }));
                setProducts(productsWithIndex);
                console.log(productsWithIndex);
            } catch (error) {
                console.error(error);
            }
        };
        getListProduct();
    }, []);

    const handleEdit = (ProductId) => {
        console.log(ProductId)
        navigate(`manage-product/Edit-Product/${ProductId}`)
    };

    const handleDelete = (ProductId) => {
        setProductToDelete(ProductId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        console.log(productToDelete)
        try {
            await deleteProduct(productToDelete);
            setProducts(products.filter(product => product.ProductId !== productToDelete));
            setDeleteDialogOpen(false);
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(`Error deleting product: ${error.response.data}`);
        }
    };

    const columns = [
        {
            field: 'index',
            headerName: 'No',
            width: 70,
        },
        { field: 'Name', headerName: 'Name', width: 250 },
        { field: 'MaterialName', headerName: 'Material Name', width: 150 },
        { field: 'CategoryName', headerName: 'Category Name', width: 150 },
        { field: 'GemName', headerName: 'Gem Name', width: 150 },
        { field: 'ProductCost', headerName: 'Price', width: 100 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Box display='flex' justifyContent='space-around'>
                        <IconButton component={Link} to={`/admin/manage-product/Edit-Product/${params.row.ProductId}`}>
                            <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(params.row.ProductId)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </Box>
                </>
            ),
        }
    ];

    const rows = products;

    return (
        <>
            <Box>
                <Header title='MANAGE PRODUCT' subtitle='Managing the product inventory' />
                <Box display='flex' justifyContent='flex-end' m={2}>
                    <Button component={Link} to={'/admin/manage-product/addProduct'}
                        sty sx={{
                            backgroundColor: colors.blue[300],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'green',
                                color: 'white',
                            },
                            margin: '0 60px'
                        }}
                        variant="contained"
                    >
                        Add Product
                    </Button>
                </Box>
                <Box m='40px 0 0 0'
                    height='75vh'
                    width='100%'
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: '1px solid gray', // Add border here
                            borderRadius: '10px', // Add border radius here
                            overflow: 'hidden', // Ensure rounded corners by clipping the overflow
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: 'none',
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.blue[50],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: 'none',
                            backgroundColor: theme.palette.grey[300],
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: theme.palette.grey[200],
                        },
                    }}
                >
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        getRowId={(row) => row.ProductId}
                    />
                </Box>
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default ListProduct;
