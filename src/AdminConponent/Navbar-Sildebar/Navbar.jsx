import React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import NotificationIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/image/img/kim_cuong.png'
const Navbar = () => {
    return (
        <div>
            <Box display='flex' justifyContent='space-between' p={2} bgcolor='' position='sticky' >
                {/* Search bar
                <Box display='flex' borderRadius='15px' border='2px' bgcolor={colors.blue[200]}>
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box> */}

                <Card style={{ display: 'flex', boxShadow: 'none' }}>
                    <CardMedia style={{ height: '80px', width: '80px' }}>
                        <img src={logo} alt='logo store' />
                    </CardMedia>
                    <CardContent style={{ fontSize: '35px', fontWeight: 'bold' }}>
                        <h2 >Sun Shine</h2>
                    </CardContent>
                </Card>
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
