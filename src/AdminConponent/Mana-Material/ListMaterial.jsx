import { useEffect, useState } from "react";
import { deleteMaterial, getAllMaterial, getAllCostMaterial } from "../../server/api";  // Ensure getCostMaterial is correctly imported
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, IconButton, colors, Snackbar } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Search from "../Header/Search";

const ListMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const [materialsResponse, costMaterialsResponse] = await Promise.all([getAllMaterial(), getAllCostMaterial()]);

            const materialsData = materialsResponse.data;
            const costMaterialsData = costMaterialsResponse.data;

            const combinedData = materialsData.map(material => {
                const costMaterial = costMaterialsData.find(cost => cost.MaterialId === material.MaterialID);
                return {
                    ...material,
                    PurchasePrice: costMaterial ? costMaterial.PurchasePrice : null,
                    Price: costMaterial ? costMaterial.Price : null
                };
            });

            setMaterials(combinedData);
            console.log(combinedData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (materialId) => {
        console.log("Edit material with ID:", materialId);
    };

    const handleDelete = (materialId) => {
        setMaterialToDelete(materialId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteMaterial(materialToDelete);
            fetchMaterials(); // Fetch data again after successful deletion
            setDeleteDialogOpen(false);
            setSnackbarOpen(true); // Show success message
        } catch (error) {
            console.error('Error deleting material:', error);
        }
    };

    const handleAddCostMaterial = (materialId) => {
        navigate(`/admin/manage-account/addCostMaterial/${materialId}`);
    };

    const columns = [
        { field: 'MaterialID', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 350 },
        { field: 'Unit', headerName: 'Unit', width: 100 },
        { field: 'PurchasePrice', headerName: 'PurchasePrice', width: 100 },
        { field: 'Price', headerName: 'Price', width: 100 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <Box display='flex' justifyContent='space-around'>
                    <IconButton component={Link} to='/admin/manage-material/editMaterial' >
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.MaterialID)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                    <IconButton onClick={() => handleAddCostMaterial(params.row.MaterialID)}>
                        <FontAwesomeIcon icon={faPlus} /> {/* Add appropriate icon for adding cost material */}
                    </IconButton>
                </Box>
            ),
        }
    ];

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Box>
                <Header title='MANAGE MATERIALS' subtitle='Managing the materials' />
                <Box display='flex' justifyContent='flex-end' m={2}>
                    <Search />
                    <Button component={Link} to={'/admin/manage-account/addMaterial'}
                        sx={{
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
                        Add Material
                    </Button>
                    <Button component={Link} to={'/admin/manage-account/addCostMaterial/'}
                        sx={{
                            backgroundColor: colors.blue[300],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'green',
                                color: 'white',
                            },
                        }}
                        variant="contained"
                    >
                        Add Cost Material
                    </Button>
                </Box>
                <Box
                    m='40px 0 0 0'
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
                        rows={materials}
                        getRowId={(row) => row.MaterialID}
                    />
                </Box>
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this material?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Material deleted successfully"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    );
}

export default ListMaterial;
