import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useTheme,
    colors,
    IconButton,
} from "@mui/material";
import Header from "../Header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { deleteGemById, getAllGem } from "../../server/api";
import Search from "../Header/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListDiamond = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [diamondToDelete, setDiamondToDelete] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const getListDiamonds = async () => {
            try {
                const response = await getAllGem();
                setDiamonds(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getListDiamonds();
    }, []);

    const handleDelete = (GemId) => {
        setDiamondToDelete(GemId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteGemById(diamondToDelete)
            .then(() => {
                setDiamonds(diamonds.filter((diamond) => diamond.GemId !== diamondToDelete));
                setDeleteDialogOpen(false);
                toast.success("Diamond deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting diamond:", error);
                toast.error(`Error deleting diamond: Maybe ${error.response.data} in any product.`);
            });
    };

    const columns = [
        { field: "GemId", headerName: "ID" },
        { field: "Name", headerName: "Name", width: 150 },
        { field: "Color", headerName: "Color", width: 150 },
        { field: "CaraWeight", headerName: "Cara Weight", width: 150 },
        { field: "Clarity", headerName: "Clarity", width: 150 },
        { field: "Cut", headerName: "Cut", width: 150 },
        { field: "Size", headerName: "Size", width: 100 },
        {
            field: "Actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    {/* <IconButton component={Link} to={`/admin/manage-diamond/editDiamond/${params.row.GemId}`}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton> */}
                    <IconButton onClick={() => handleDelete(params.row.GemId)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                    <IconButton component={Link} to={`/admin/manage-diamond/Add-Diamond/${params.row.GemId}`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = diamonds;

    return (
        <Box>
            <Header title="MANAGE DIAMONDS" subtitle="Managing the diamonds list" />
            <Box display="flex" justifyContent="flex-end" m={2}>

                <Button
                    component={Link}
                    to="/admin/manage-diamond/addDiamond"
                    sx={{
                        backgroundColor: colors.blueGrey[300],
                        color: "white",
                        "&:hover": {
                            backgroundColor: "green",
                            color: "white",
                        },
                    }}
                    variant="contained"
                >
                    Add Diamond
                </Button>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "1px solid gray", // Add border here
                        borderRadius: "10px", // Add border radius here
                        overflow: "hidden", // Ensure rounded corners by clipping the overflow
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.blue[50],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
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
                    getRowId={(row) => row.GemId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this diamond?
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

export default ListDiamond;
