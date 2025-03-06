
import React, { useState } from 'react';
import HeaderBar from "../components/Header/HeaderBar";
import MenuBar from "../components/NavigationDrawer/MenuBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';


const Dashboard = () => {
    
    const drawerWidth = useMediaQuery('(min-width: 768px)') ? 240 : 180;  // Use media query to adjust width based on screen size
    const location = useLocation();
    var userRole = localStorage.getItem("role");

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "100px",
            paddingTop: "20px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            overflowY: "auto",  // Allow vertical scrolling
            overflowX: "hidden",  // Prevent horizontal overflow
            flexGrow: 1,  // Expand to fill available space
            width: "100%",  // Ensure full width
            maxWidth: "100%",  // Prevent container from overflowing
          }}>
            <MenuBar userRole={userRole} />
            <HeaderBar userRole={userRole} />
            <Box>
                <main className="content">
                    <Outlet/>
                </main>
            </Box>
        </Box>
    );
};

export default Dashboard;