
import React from "react";
import { Routes, Route } from "react-router-dom";

import ViewProducts from "../../pages/ViewProducts";

const DashboardRoutes = () => {
  return (
    <Routes>
       <Route path="inventory/view-products" element={<ViewProducts />} />
    </Routes>
  );
};

export default DashboardRoutes;