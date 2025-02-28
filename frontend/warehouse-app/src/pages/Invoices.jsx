import React, { useState } from "react";
import { Container, TextField, MenuItem, Typography, Button, Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InvoiceDetailsModal from "../components/Modal/Invoices/InvoicesDetails";

const columns = [
  { 
    field: "invoice_id",
    headerName: "Invoice ID",
    flex: 1,
    renderCell: (params) => (
      <span
        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        onClick={() => params.api.getRow(params.id).handleOpenModal(params.row)}
      >
        {params.value}
      </span>
    ),
  },
  { field: "invoice_reference_number", headerName: "Reference No. ", flex: 1 },
  { field: "user_id", headerName: "User ID", flex: 1 },
  { field: "customer_name", headerName: "Name", flex: 1 },
  { field: "shipping_address", headerName: "Shipping Address", flex: 2 },
  { field: "total_cost", headerName: "Total Cost ($)", type: "number", flex: 1 },
  { field: "shipped", headerName: "Shipped", flex: 1 },
  { field: "invoice_status", headerName: "Invoice Status", flex: 1 }
];

const rows = [
  { id: 1, invoice_id: "INV-1001", invoice_reference_number: 'PO001', user_id: "U-001", customer_name: 'Lindor', shipping_address: "123 Street, City", total_cost: 250, shipped: "Y", invoice_status: "Paid" },
  { id: 2, invoice_id: "INV-1002", invoice_reference_number: 'PO002', user_id: "U-002", customer_name: 'Gary',shipping_address: "456 Avenue, City", total_cost: 150, shipped: "N", invoice_status: "Awaiting Payment" },
  { id: 3, invoice_id: "INV-1003", invoice_reference_number: 'PO003', user_id: "U-003", customer_name: 'Martin Yu',shipping_address: "789 Boulevard, City", total_cost: 300, shipped: "N", invoice_status: "Draft" }
];

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("invoice_id");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredRows = rows.filter((row) =>
    row[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <Container sx={{ mt: 2, width: "160%" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2, mt: 5 }}>
        Invoice Management
      </Typography>
      <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            select
            label="Search By"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            sx={{ mr: 2, width: 150 }}
          >
            {columns.map((col) => (
              <MenuItem key={col.field} value={col.field}>
                {col.headerName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={`Search ${columns.find((col) => col.field === searchColumn)?.headerName}`}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows.map((row) => ({ ...row, handleOpenModal }))}
        columns={columns}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      {selectedInvoice && (
        <InvoiceDetailsModal open={modalOpen} handleClose={handleCloseModal} invoice={selectedInvoice} />
      )}
    </Container>
  );
};

export default InvoiceManagement;
