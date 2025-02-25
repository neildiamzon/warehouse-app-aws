
import React from "react";
import HeaderBar from "../components/Header/HeaderBar";
import MenuBar from "../components/NavigationDrawer/MenuBar";
import { Outlet } from "react-router-dom";

const Dashboard = ({userRole}) => {
    
    return (
        <div className="layout">
            <MenuBar userRole={userRole} />
            <HeaderBar userRole={userRole} />
            <div className="main-container">
                <main className="content">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;