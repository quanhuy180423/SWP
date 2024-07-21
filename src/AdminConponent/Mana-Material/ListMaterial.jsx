import { useEffect, useState } from "react";
import { deleteMaterial, getAllMaterial, getAllCostMaterial } from "../../server/api";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, IconButton, colors } from "@mui/material";
import Header from "../Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Search from "../Header/Search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const ListMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const [materialsResponse, costMaterialsResponse] = await Promise.all([getAllMaterial(), getAllCostMaterial()]);

            const materialsData = materialsResponse.data;
            let costMaterialsData = costMaterialsResponse.data;

            // Sort cost materials by update date
            costMaterialsData.sort((a, b) => new Date(b.UpdateDate) - new Date(a.UpdateDate));

            // Create a map to store the most recent cost material for each MaterialId
            const latestCostMaterials = {};
            costMaterialsData.forEach(costMaterial => {
                if (!latestCostMaterials[costMaterial.MaterialId]) {
                    latestCostMaterials[costMaterial.MaterialId] = costMaterial;
                }
            });

            // Combine data
            const combinedData = materialsData.map(material => {
                const costMaterial = latestCostMaterials[material.MaterialId];
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
            toast.error('Error fetching materials');
        }
    };

    const handleDelete = (MaterialId) => {
        setMaterialToDelete(MaterialId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteMaterial(materialToDelete);
            fetchMaterials(); // Fetch data again after successful deletion
            setDeleteDialogOpen(false);
            toast.success('Material deleted successfully');
        } catch (error) {
            console.error('Error deleting material:', error);
            toast.error('Error deleting material');
        }
    };

    const handleAddCostMaterial = (MaterialId) => {
        navigate(`/admin/manage-material/addCostMaterial/${MaterialId}`);
    };

    const columns = [
        { field: 'MaterialId', headerName: 'ID', width: 70 },
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
                    <IconButton onClick={() => handleDelete(params.row.MaterialId)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                    <IconButton onClick={() => handleAddCostMaterial(params.row.MaterialId)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </Box>
            ),
        }
    ];

    return (
        <>
            <Box>
                <Header title='MANAGE MATERIALS' subtitle='Managing the materials' />
                <Box display='flex' justifyContent='flex-end' m={2}>

                    <Button component={Link} to='AddMaterial'
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
                </Box>
                <Box
                    m='40px 0 0 0'
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
                        rows={materials}
                        getRowId={(row) => row.MaterialId}
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
            <ToastContainer />
        </>
    );
}

export default ListMaterial;
