import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, colors } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionButtons from "../Mana-Account/ActionButtons";
import { Link } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../../server/api";
import Search from "../Header/Search";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const getListOrders = async () => {
            try {
                const response = await getAllOrders();
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getListOrders();
    }, []);

    const handleEdit = (id) => {
        console.log("Edit order with ID:", id);
    };

    const handleDelete = (OrderId) => {
        setOrderToDelete(OrderId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteOrder(orderToDelete)
            .then(() => {
                setOrders(orders.filter(order => order.OrderId !== orderToDelete));
                setDeleteDialogOpen(false);
                alert('Order deleted successfully');
            })
            .catch(error => console.error('Error deleting order:', error));
    };

    const columns = [
        { field: 'OrderId', headerName: 'ID', width: 100 },
        { field: 'UserId', headerName: 'UserID', width: 100 },
        { field: 'Name', headerName: 'Full Name', width: 150 },
        { field: 'Phone', headerName: 'Phone', width: 100 },
        { field: 'Address', headerName: 'Address', width: 200 },
        { field: 'Description', headerName: 'Description', width: 250 },
        { field: 'Status', headerName: 'Status', width: 150 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ActionButtons
                    onEdit={() => handleEdit(params.row.OrderId)}
                    onDelete={() => handleDelete(params.row.OrderId)}
                />
            ),
        }
    ];

    const rows = orders;

    return (
        <Box>
            <Header title='MANAGE ORDERS' subtitle='Managing the orders list' />
            <Box display='flex' justifyContent='flex-end' m={2}>
                <Search />
                <Button component={Link} to={'/admin/manage-orders/addOrder'}
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
                    Add Order
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
                    getRowId={(row) => row.OrderId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this order?
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

export default ListOrder;
