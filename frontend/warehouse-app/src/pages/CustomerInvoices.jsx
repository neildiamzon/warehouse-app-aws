import React, { useState } from "react";
import { Container, TextField, MenuItem, Typography, Button, Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomerInvoiceDetailsModal from "../components/Modal/Invoices/InvoicesDetails";
import RefreshIcon from "@mui/icons-material/Refresh";

import axios from "axios";

const columns = [
  { 
    field: "invoiceId",
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
  { field: "invoiceReferenceNumber", headerName: "Reference No. ", flex: 1 },
  { field: "shippingAddress", headerName: "Shipping Address", flex: 2 },
  { field: "totalCost", headerName: "Total Cost ($)", type: "number", flex: 1 },
  { field: "shipped", headerName: "Shipped", flex: 1 },
  { field: "invoiceStatus", headerName: "Invoice Status", flex: 1 },
  { field: "dateCreated", headerName: "Date Created", flex: 1 }
];

const CustomerInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("invoiceId");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredRows = invoices.filter((invoices) =>
    invoices[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (invoice) => {
    console.log(invoice)
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleGetInvoices = () => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://localhost:7187/api/my-orders`, // how to add the search term here?
      headers: {
        email: localStorage.getItem("email")
      },
    };

    axios.request(config)
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        alert('Error has occurred');
        console.log(error);
      }).finally(() => {
        setLoading(false); // Hide loading state
      });
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
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => handleGetInvoices()}
            sx={{ ml: 2 }}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows.map((row) => ({ ...row, handleOpenModal }))}
        columns={columns}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading} 
        getRowId={(row) => row.invoiceId}
        localeText={{noRowsLabel: 'Please click refresh to load data'}}
      />
      {selectedInvoice && (
        <CustomerInvoiceDetailsModal open={modalOpen} handleClose={handleCloseModal} invoice={selectedInvoice} />
      )}
    </Container>
  );
};

export default CustomerInvoices;
