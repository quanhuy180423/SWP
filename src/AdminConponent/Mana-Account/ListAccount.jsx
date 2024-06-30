import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../server/api";
import { Box, Button, Typography, colors, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from "./ActionButtons";
import { Link } from "react-router-dom";

const ListAccount = () => {
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

        deleteUser(setStaffToDelete)
            .then(() => {
                setAccount(accounts.filter(account => account.UserID !== staffToDelete));
                setDeleteDialogOpen(false);
                alert('User deleted successfully');
                getAllUsers();
            })
            .catch(error => console.error('Error deleting user:', error));
        getAllUsers();
    };

    const columns = [
        { field: 'UserID', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 150 },
        {
            field: 'PassWord',
            headerName: 'Password',
            width: 150,
            renderCell: () => '••••••••',
        },
        { field: 'Address', headerName: 'Address', width: 150 },
        { field: 'Phone', headerName: 'Phone', width: 150 },
        { field: 'Email', headerName: 'Email', width: 150 },
        {
            field: 'Role',
            headerName: 'Role',
            width: 150,
            renderCell: ({ row: { Role } }) => {
                let roleLabel, bgColor, icon;
                switch (Role) {
                    case 1:
                        roleLabel = "Admin";
                        bgColor = colors.red[500];
                        icon = faLock;
                        break;
                    case 2:
                        roleLabel = "User";
                        bgColor = colors.green[300];
                        icon = faUser;
                        break;
                    case 3:
                        roleLabel = "Staff";
                        bgColor = colors.green[300];
                        icon = faBriefcase;
                        break;
                    default:
                        roleLabel = "Unknown";
                        bgColor = colors.grey[300];
                        icon = null;
                        break;
                }
                return (
                    <Box
                        width='100%'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        bgcolor={bgColor}
                        borderRadius='5px'
                        marginTop='15px'
                    >
                        {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />}
                        <Typography variant="body2" color="textPrimary">
                            {roleLabel}
                        </Typography>
                    </Box>
                );
            }
        },
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
    const rows = accounts;

    return (
        <>
            <Box>
                <Header title='MANAGE ACCOUNT' subtitle='Managing the account members' />
                <Box display='flex' justifyContent='flex-end' m={2}>
                    <Button component={Link} to={'/admin/manage-account/addUser'}>
                        Add User
                    </Button>
                </Box>
                <Box m='40px 0 0 0'
                    height='75vh'
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: 'none',
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: 'none',
                        },
                        // . MuiDataGrid-coIumnHeaders :
                        "& .MuiDataGrid-columnHeader": {
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
                        getRowId={(row) => row.UserID}
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
};

export default ListAccount;
