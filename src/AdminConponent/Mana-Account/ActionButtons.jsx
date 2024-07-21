// ActionButtons.js
import React from 'react';
import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ActionButtons = ({ onEdit, onDelete }) => {
    return (
        <Box display='flex' justifyContent='space-around' color='red'>
            <IconButton onClick={onEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>
        </Box>
    );
};

export default ActionButtons;
