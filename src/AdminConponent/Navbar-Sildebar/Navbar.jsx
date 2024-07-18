import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/image/img/kim_cuong.png';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        Cookies.remove("loginTime");
        window.location.href = "/";
    };

    return (
        <div>
            <Box display='flex' justifyContent='space-between' p={2} bgcolor='' position='sticky'>
                {/* Logo */}
                <Card style={{ display: 'flex', boxShadow: 'none' }}>
                    <CardMedia style={{ height: '80px', width: '80px' }}>
                        <img src={logo} alt='logo store' />
                    </CardMedia>
                    <CardContent style={{ fontSize: '35px', fontWeight: 'bold' }}>
                        <h2>Sun Shine</h2>
                    </CardContent>
                </Card>
                {/* Icons */}
                <Box display='flex'>
                    <IconButton>
                        <NotificationIcon />
                    </IconButton>
                    <IconButton onClick={handleMenuOpen}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                </Box>
            </Box>
        </div>
    );
};

export default Navbar;
