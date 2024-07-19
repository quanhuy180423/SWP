import React from 'react';
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import logo from '../../assets/image/img/kim_cuong.png';
import { Link } from 'react-router-dom';


const Navbar = () => {

    return (
        <div>
            <Box display='flex' justifyContent='space-between' p={2} bgcolor='' position='sticky'>
                {/* Logo */}
                <Card style={{ display: 'flex', boxShadow: 'none' }}>
                    <CardMedia style={{ height: '80px', width: '80px' }}
                        component={Link}
                        to={'/'}
                    >
                        <img src={logo} alt='logo store' />
                    </CardMedia>
                    <CardContent style={{ fontSize: '35px', fontWeight: 'bold' }}>
                        <h2>Sun Shine</h2>
                    </CardContent>
                </Card>
                {/* Icons */}
                {/* <Box display='flex'>
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
                </Box> */}
            </Box>
        </div>
    );
};

export default Navbar;
