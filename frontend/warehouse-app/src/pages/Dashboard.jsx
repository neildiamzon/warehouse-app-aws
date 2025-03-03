
import React from "react";
import HeaderBar from "../components/Header/HeaderBar";
import MenuBar from "../components/NavigationDrawer/MenuBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    var userRole = localStorage.getItem("role");

    return (
        <div className="layout">
            <MenuBar userRole={userRole} />
            <HeaderBar userRole={userRole} />
            <Box className="main-container" 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,  // Make sure it takes up available space
                    paddingTop: "20px", // Adjust space below the header
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    overflowY: "auto",  // Allow scrolling if content overflows
                }}>
                <main className="content">
                    <Outlet/>
                </main>
            </Box>
        </div>
    );
};

export default Dashboard;