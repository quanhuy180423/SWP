import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const Step3ListDiamond = ({ diamonds, onChoose }) => {
    const columns = [
        { field: 'GemId', headerName: 'Gem ID', width: 150 },
        { field: 'Name', headerName: 'Name', width: 150 },
        { field: 'Color', headerName: 'Color', width: 150 },
        { field: 'CaraWeight', headerName: 'Cara Weight', width: 150 },
        { field: 'Clarity', headerName: 'Clarity', width: 150 },
        { field: 'Cut', headerName: 'Cut', width: 150 },
        { field: 'Size', headerName: 'Size', width: 100 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onChoose(params.row.GemId)}
                >
                    Choose
                </Button>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={diamonds} columns={columns} getRowId={(row) => row.GemId} />
        </div>
    );
};

export default Step3ListDiamond;
