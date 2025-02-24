
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "./Header/HeaderBar";
import MenuBar from "./NavigationDrawer/MenuBar";

const Layout = () => {
  return (
    <div className="layout">
      <MenuBar />
      <div className="main-container">
        <HeaderBar />
        <main className="content">
        </main>
      </div>
    </div>
  );
};

export default Layout;