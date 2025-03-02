
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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" }}
                }>
                <main className="content">
                    <Outlet/>
                </main>
            </Box>
        </div>
    );
};

export default Dashboard;