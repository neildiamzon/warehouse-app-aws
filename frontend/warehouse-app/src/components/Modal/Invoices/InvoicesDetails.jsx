import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const productColumns = [
  { field: "product_id", headerName: "Product ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  { field: "unit_price", headerName: "Unit Price ($)", flex: 1 },
  { field: "total_price", headerName: "Total Price ($)", flex: 1 },
];

const InvoiceDetailsModal = ({ open, handleClose, invoice, handleCancelInvoice }) => {
    var rows = [];
    if (invoice.invoiceProducts) {
        rows = invoice.invoiceProducts.map((ip, index) => {
            return {
                product_id: ip.productCode,
                name: ip.product.name,
                description: ip.product.description,
                quantity: ip.quantity,
                unit_price: ip.unitPrice,
                total_price: ip.totalPrice
            };
        });
    }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, bgcolor: "white", width: 1200, mx: "auto", mt: 20, borderRadius: 2 }}>
        <Typography variant="h6">Invoice Details</Typography>
        <Typography>User ID: <strong>{invoice.userId}</strong></Typography>
        <Typography>Customer Name: <strong>{invoice.customerName}</strong></Typography>
        <Typography>Shipping Address: <strong>{invoice.shippingAddress}</strong></Typography>
        <Typography>Total Cost: <strong>${invoice.totalCost}</strong></Typography>
        <Typography>Shipped: <strong>{invoice.shipped}</strong></Typography>
        <Typography>Invoice Status: <strong>{invoice.invoiceStatus}</strong></Typography>
        <Box sx={{ height: 300, mt: 2 }}>
          <DataGrid 
            rows={rows} 
            columns={productColumns} 
            pageSize={10} 
            getRowId={(row) => row.product_id}/>
        </Box>
        
        <Button onClick={handleCancelInvoice} variant="contained" sx={{ mt: 2, backgroundColor: "red", mr: 2 }}>Cancel Invoice</Button>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default InvoiceDetailsModal;
