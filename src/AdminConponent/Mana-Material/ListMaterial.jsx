import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../server/api";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, IconButton } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DemoDataMaterial } from "../../server/data/DemoData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListMaterial = () => {
    const [accounts, setAccount] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const getListAccount = async () => {
            try {
                const response = await getAllUsers();
                setAccount(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getListAccount();
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
                setAccount(accounts.filter(account => account.UserID !== staffToDelete));
                setDeleteDialogOpen(false);
                alert('User deleted successfully');
                getAllUsers();
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const columns = [
        { field: 'MaterialID', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 150 },
        { field: 'Unit', headerName: 'Unit', width: 70 },
        { field: 'BuyPrice', headerName: 'BuyPrice', width: 150 },
        { field: 'CostIdMaterial', headerName: 'CostIdMaterial', width: 150 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box display='flex' justifyContent='space-around'>
                    <IconButton onClick={() => handleEdit(params.row.MaterialID)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.MaterialID)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Box>
            ),
        }
    ];

    // Updated to ensure rows are correctly populated
    const rows = DemoDataMaterial.map((item, index) => ({
        id: index,
        MaterialID: item.MaterialID,
        Name: item.Name,
        Unit: item.Unit,
        BuyPrice: item.BuyPrice,
        CostIdMaterial: item.CostIdMaterial,
    }));

    return (
        <>
            <Box>
                <Header title='MANAGE ACCOUNT' subtitle='Managing the account members' />
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
                            width: '0'
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
                        getRowId={(row) => row.MaterialID}
                    />
                </Box>
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
        </>
    );
}

export default ListMaterial;
