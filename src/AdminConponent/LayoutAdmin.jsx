import React from 'react';
import Navbar from './Navbar-Sildebar/Navbar';
import SlideBar from './Navbar-Sildebar/Slidebar';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';


const LayoutAdmin = () => {
    return (
        <Box className="flex h-screen">
            <CssBaseline />
            {/* Sidebar */}

            <SlideBar />


            {/* Main content */}
            <div className="flex flex-col w-full">
                {/* Navbar */}
                <Navbar />

                {/* Main content area */}
                <main className="flex-grow p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </Box>
    );
};

export default LayoutAdmin;
