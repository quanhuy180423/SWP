import React from 'react';
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    return (
        <div>
            <Box display='flex' justifyContent='space-between' p={2} bgcolor='' position='sticky' >
                {/* Search bar */}
                <Box display='flex' borderRadius='15px' border='2px' bgcolor='lightcyan'>
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
                {/* Icon */}
                <Box display='flex'>
                    <IconButton>
                        <NotificationIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                </Box>
            </Box>
        </div>
    );
};

export default Navbar;
