import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, colors } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionButtons from "../Mana-Account/ActionButtons";
import { Link } from "react-router-dom";
import { deleteOrderDetail, getAllOrderDetail } from "../../server/api";
import Search from "../Header/Search";

const ListOrderDetail = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [orderDetailToDelete, setOrderDetailToDelete] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const getListOrderDetails = async () => {
            try {
                const response = await getAllOrderDetail();
                setOrderDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getListOrderDetails();
    }, []);

    const handleEdit = (id) => {
        console.log("Edit order detail with ID:", id);
    };

    const handleDelete = (orderDetailId) => {
        setOrderDetailToDelete(orderDetailId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteOrderDetail(orderDetailToDelete)
            .then(() => {
                setOrderDetails(orderDetails.filter(orderDetail => orderDetail.OrderDetailID !== orderDetailToDelete));
                setDeleteDialogOpen(false);
                alert('Order detail deleted successfully');
            })
            .catch(error => console.error('Error deleting order detail:', error));
    };

    const columns = [
        { field: 'OrderDetailID', headerName: 'Order Detail ID', width: 150 },
        { field: 'Description', headerName: 'Description', width: 250 },
        { field: 'ProductID', headerName: 'Product ID', width: 150 },
        { field: 'Status', headerName: 'Status', width: 150 },
        { field: 'ProductName', headerName: 'Product Name', width: 200 },
        { field: 'CategoryID', headerName: 'Category ID', width: 150 },
        { field: 'CategoryName', headerName: 'Category Name', width: 200 },
        { field: 'MaterialID', headerName: 'Material ID', width: 150 },
        { field: 'MaterialName', headerName: 'Material Name', width: 200 },
        { field: 'GemID', headerName: 'Gem ID', width: 150 },
        { field: 'GemName', headerName: 'Gem Name', width: 200 },
        { field: 'QuantityGem', headerName: 'Quantity Gem', width: 150 },
        { field: 'QuantityMaterial', headerName: 'Quantity Material', width: 150 },
        { field: 'OrderDate', headerName: 'Order Date', width: 200 },
        { field: 'OrderID', headerName: 'Order ID', width: 150 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ActionButtons
                    onEdit={() => handleEdit(params.row.OrderDetailID)}
                    onDelete={() => handleDelete(params.row.OrderDetailID)}
                />
            ),
        }
    ];

    const rows = orderDetails;

    return (
        <Box>
            <Header title='MANAGE ORDER DETAILS' subtitle='Managing the order details list' />
            <Box display='flex' justifyContent='flex-end' m={2}>
                <Search />
                <Button component={Link} to={'/admin/manage-order-details/addOrderDetail'}
                    sx={{
                        backgroundColor: colors.blueGrey[300],
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'green',
                            color: 'white',
                        },
                    }}
                    variant="contained"
                >
                    Add Order Detail
                </Button>
            </Box>
            <Box
                m='40px 0 0 0'
                height='75vh'
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
                    getRowId={(row) => row.OrderDetailID}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this order detail?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ListOrderDetail;
