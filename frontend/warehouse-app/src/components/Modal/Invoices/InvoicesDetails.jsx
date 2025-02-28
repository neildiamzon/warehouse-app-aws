import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const productColumns = [
  { field: "product_id", headerName: "Product ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "price", headerName: "Price ($)", flex: 1 },
  { field: "weight", headerName: "Weight (kg)", flex: 1 },
  { field: "uom", headerName: "UOM", flex: 1 },
  { field: "quantity_per_uom", headerName: "Qty/UOM", flex: 1 },
];

const InvoiceDetailsModal = ({ open, handleClose, invoice }) => {
  const productRows = [
    { id: 1, product_id: "P001", name: "Item A", description: "Quality item", price: 50, weight: 1.2, uom: "BX", quantity_per_uom: 10 },
    { id: 2, product_id: "P002", name: "Item B", description: "Durable and strong", price: 75, weight: 2.5, uom: "BX", quantity_per_uom: 20 },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, bgcolor: "white", width: 1200, mx: "auto", mt: 20, borderRadius: 2 }}>
        <Typography variant="h6">Invoice Details</Typography>
        <Typography>User ID: {invoice.user_id}</Typography>
        <Typography>Shipping Address: {invoice.shipping_address}</Typography>
        <Typography>Total Cost: ${invoice.total_cost}</Typography>
        <Typography>Shipped: {invoice.shipped}</Typography>
        <Typography>Invoice Status: {invoice.invoice_status}</Typography>
        <Box sx={{ height: 300, mt: 2 }}>
          <DataGrid rows={productRows} columns={productColumns} pageSize={5} />
        </Box>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default InvoiceDetailsModal;
