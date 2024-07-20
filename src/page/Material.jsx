import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, colors } from '@mui/material';
import { getAllMaterialAndPrice } from '../server/api';

const Material = () => {
    const [materials, setMaterials] = useState([]);
    const [currentDate] = useState(new Date());

    useEffect(() => {
        getAllMaterialAndPrice()
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            });
    }, []);

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h6" align="center" gutterBottom
                style={{
                    backgroundColor: colors.red[400],
                    color: 'white',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '35px'
                }}
            >
                Material Prices as of {currentDate.toLocaleDateString()}
            </Typography>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: colors.grey[700], color: 'white', borderTopLeftRadius: '20px' }}>Name</TableCell>
                                <TableCell sx={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: colors.grey[700], color: 'white' }}>Unit</TableCell>
                                <TableCell sx={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: colors.grey[700], color: 'white' }}>Purchase Price</TableCell>
                                <TableCell sx={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: colors.grey[700], color: 'white', borderTopRightRadius: '20px' }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materials.map((material, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontSize: '20px' }}>{material.Name}</TableCell>
                                    <TableCell sx={{ fontSize: '20px' }}>{material.Unit}</TableCell>
                                    <TableCell sx={{ fontSize: '20px' }}>{formatNumber(material.PurchasePrice)}</TableCell>
                                    <TableCell sx={{ fontSize: '20px' }}>{formatNumber(material.Price)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default Material;
