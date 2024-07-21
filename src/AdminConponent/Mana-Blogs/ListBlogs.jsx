import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, colors } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { deleteBlogs, getAllBlogs } from "../../server/api";
import ActionButtons from "../Mana-Account/ActionButtons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const ListBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [BlogsToDelete, setBlogsToDelete] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const getListBlogs = async () => {
            try {
                const response = await getAllBlogs();
                setBlogs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getListBlogs();
    }, []);

    const handleEdit = (BlogId) => {
        navigate(`/admin/manage-blogs/editBlog/${BlogId}`);
    };

    const handleDelete = (BlogId) => {
        setBlogsToDelete(BlogId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteBlogs(BlogsToDelete);
            setBlogs(blogs.filter(blog => blog.BlogId !== BlogsToDelete));
            setDeleteDialogOpen(false);
            toast.success('Blog deleted successfully');
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Error deleting blog');
        }
    };

    const columns = [
        { field: 'BlogId', headerName: 'ID' },
        { field: 'UserId', headerName: 'UserID', width: 150 },
        { field: 'Title', headerName: 'Title', width: 150 },
        { field: 'DateCreated', headerName: 'Date Created', width: 150 },
        { field: 'Content', headerName: 'Content', width: 450 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <ActionButtons
                    onEdit={() => handleEdit(params.row.BlogId)}
                    onDelete={() => handleDelete(params.row.BlogId)}
                />
            ),
        }
    ];

    const rows = blogs;

    return (
        <Box>
            <Header title='MANAGE BLOGS' subtitle='Managing the blogs list' />
            <Box display='flex' justifyContent='flex-end' m={2}>
                <Button component={Link} to={'/admin/manage-blogs/addBlog'}
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
                    Add Blogs
                </Button>
            </Box>
            <Box
                m='40px 0 0 0'
                height='75vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: '1px solid gray',
                        borderRadius: '10px',
                        overflow: 'hidden',
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
                    getRowId={(row) => row.BlogId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this blog?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Box>
    );
};

export default ListBlogs;
