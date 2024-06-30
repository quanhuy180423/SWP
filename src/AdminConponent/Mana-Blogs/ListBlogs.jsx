import { useState, useEffect } from "react";
import { deleteUser, getAllUsers } from "../../server/api";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionButtons from "../Mana-Account/ActionButtons";
import { Link } from "react-router-dom";
import { DemoDataBlogs } from "../../server/data/DemoData";

const ListBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        // Fetch the list of blogs from the server
        getAllUsers()
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const handleEdit = (id) => {
        console.log("Edit user with ID:", id);
    };

    const handleDelete = (id) => {
        setStaffToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteUser(staffToDelete)
            .then(() => {
                setBlogs(blogs.filter(account => account.UserID !== staffToDelete));
                setDeleteDialogOpen(false);
                alert('User deleted successfully');
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const columns = [
        { field: 'BlogID', headerName: 'ID' },
        { field: 'UserID', headerName: 'UserID', width: 150 },
        { field: 'Title', headerName: 'Title', width: 150 },
        { field: 'DateCreated', headerName: 'Date Created', width: 150 },
        { field: 'Content', headerName: 'Content', width: 450 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ActionButtons
                    onEdit={() => handleEdit(params.row.UserID)}
                    onDelete={() => handleDelete(params.row.UserID)}
                />
            ),
        }
    ];

    const rows = DemoDataBlogs;

    return (
        <Box>
            <Header title='MANAGE BLOGS' subtitle='Managing the blogs list' />
            <Box display='flex' justifyContent='flex-end' m={2}>
                <Button component={Link} to={'/admin/manage-account/addUser'}>
                    Add User
                </Button>
            </Box>
            <Box
                m='40px 0 0 0'
                height='75vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none',
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: 'none',
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.grey[300],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.success.light,
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
                    getRowId={(row) => row.BlogID}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
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

export default ListBlogs;
