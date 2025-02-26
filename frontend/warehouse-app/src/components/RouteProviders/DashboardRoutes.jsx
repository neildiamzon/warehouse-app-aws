
import React from "react";
import { Routes, Route } from "react-router-dom";

import ViewProducts from "../../pages/InventoryManagement";

const DashboardRoutes = () => {
  return (
    <Routes>
       <Route path="inventory/view-products" element={<ViewProducts />} />
    </Routes>
  );
};

export default DashboardRoutes;