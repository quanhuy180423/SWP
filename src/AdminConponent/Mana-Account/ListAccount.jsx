import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../server/api";
import { Box, Button, Typography, colors, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, IconButton } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBriefcase, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../Header/Search";

const ListAccount = ({ role }) => {
    const [accounts, setAccount] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const getListAccount = async () => {
            try {
                const response = await getAllUsers();
                const filteredAccounts = response.data.filter(account => {
                    if (role === "staff") {
                        return account.Role === 1 || account.Role === 3;
                    } else if (role === "customer") {
                        return account.Role === 2;
                    } else {
                        return true;
                    }
                });
                const accountsWithIndex = filteredAccounts.map((account, index) => ({
                    ...account,
                    index: index + 1
                }));
                setAccount(accountsWithIndex);
                console.log(accountsWithIndex);
            } catch (error) {
                console.error(error);
            }
        };
        getListAccount();
    }, [role]);

    const handleDelete = (UserId) => {
        setStaffToDelete(UserId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(staffToDelete);
            setAccount(accounts.filter(account => account.UserId !== staffToDelete));
            setDeleteDialogOpen(false);
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (userId) => {
        navigate(`/admin/manage-account/edit/${userId}`);
    };

    const columns = [
        {
            field: 'index',
            headerName: 'No',
            width: 70,
        },
        { field: 'Name', headerName: 'Name', width: 150 },
        {
            field: 'PassWord',
            headerName: 'Password',
            width: 150,
            renderCell: () => '••••••••',
        },
        { field: 'Address', headerName: 'Address', width: 200 },
        { field: 'Phone', headerName: 'Phone', width: 150 },
        { field: 'Email', headerName: 'Email', width: 200 },
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
                        bgColor = colors.blue[300];
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
                <Box display='flex' justifyContent='space-around' color='red'>
                    <IconButton onClick={() => handleEdit(params.row.UserId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.UserId)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Box>
            ),
        }
    ];

    const rows = accounts;

    return (
        <>
            <Box>
                <Header title='MANAGE ACCOUNT' subtitle='Managing the account members' />
                <Box display='flex' justifyContent='flex-end' m={2}>
                    <Search />
                    <Button component={Link} to={'/admin/manage-account/addUser'}
                        sx={{
                            backgroundColor: colors.blueGrey[300],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'green',
                                color: 'white',
                            },
                        }}
                        variant="contained" >
                        Add User
                    </Button>
                </Box>

                <Box m='40px 0 0 0'
                    height='75vh'
                    width='100%'
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
                        getRowId={(row) => row.UserId}
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
