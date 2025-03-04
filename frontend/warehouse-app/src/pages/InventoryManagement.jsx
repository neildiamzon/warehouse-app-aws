import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import EditProductModal from "../components/Modal/InventoryManagement/EditProduct";
import DeleteProductModal from "../components/Modal/InventoryManagement/DeleteProduct";
import AddProductModal from "../components/Modal/InventoryManagement/NewProduct";

import axios from "axios";

const columns = [
  { field: "name", headerName: "Product Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "price", headerName: "Price ($)", type: "number", flex: 1 },
  { field: "weight", headerName: "Weight (kg)", type: "number", flex: 1 },
  { field: "uom", headerName: "UOM", flex: 1 },
  { field: "quantityPerUOM", headerName: "Qty/UOM", type: "number", flex: 1 },
  { field: "stockLevel", headerName: "Stock Level", type: "number", flex: 1 },
  { field: "dateCreated", headerName: "Date Created", flex: 1 }
];

const InventoryManagement = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const selectedProducts = products.filter((row) => rowSelectionModel.includes(row.id));

  const filteredRows = products.filter((row) =>
    row[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = () => {
    const product = products.find(row => row.id === rowSelectionModel[0]);

    console.log(product);
    setSelectedProduct(product);
    setEditModalOpen(true);
    console.log(`Edit product with id ${product}`);

  }

  const handleDeleteProduct = () => {
    setDeleteModalOpen(true);
  }

  const handleConfirmDeleteProduct = () => {
    console.log(`Delete product with ${rowSelectionModel}`);

    const selectedProducts = rowSelectionModel.map(selectedId => 
      products.find(row => row.id === selectedId)
    );

    const validProducts = selectedProducts.filter(product => product !== undefined && product !== null);

    const requestBody = validProducts.map(product => ({
      ProductId: product.id,
      ProductCode: product.productCode
    }));

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://localhost:7187/api/InventoryManagement/DeleteProducts',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : requestBody
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    setDeleteModalOpen(false);
    handleGetProducts();
  }

  const handleSaveEditProduct = (updatedProduct) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://localhost:7187/api/InventoryManagement',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : updatedProduct
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    setEditModalOpen(false);
    handleGetProducts();
  }

  const handleSaveNewProduct = (newProduct) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7187/api/InventoryManagement',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : newProduct
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert('Item Successfully Added. Please Refresh table.')
    })
    .catch((error) => {
      console.log(error);
    });
    
    setAddModalOpen(false);
    handleGetProducts();
  }

  const handleAddProduct = () => {
    setAddModalOpen(true);
  }

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setAddModalOpen(false);
  };

  const handleGetProducts = () => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://localhost:7187/api/InventoryManagement`, // how to add the search term here?
      headers: {},
    };

    axios.request(config)
      .then((response) => {
        setProducts(response.data);
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
        Inventory Management
      </Typography>

      <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', borderColor: 'divider' }}>
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
            id="refresh-button"
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => handleGetProducts()}
            sx={{ ml: 2 }}
          >
            Refresh
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleAddProduct()}
            sx={{ marginRight: 2 }}
          >
            Add New Product
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEditProduct()}
            disabled={rowSelectionModel.length !== 1}
            sx={{ marginRight: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteProduct()}
            disabled={rowSelectionModel.length === 0}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => setRowSelectionModel(newSelection)}
        rowSelectionModel={rowSelectionModel}
        loading={loading}
        localeText={{noRowsLabel: 'Please click refresh to load data'}}
        pageSize={10}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          handleClose={handleCloseModal}
          product={selectedProduct}
          handleSave={handleSaveEditProduct}
        />
      )}

      {deleteModalOpen && (
        <DeleteProductModal
          open={deleteModalOpen}
          handleClose={handleCloseModal}
          selectedProducts={selectedProducts}
          handleDelete={handleConfirmDeleteProduct}
        />
      )}
      {addModalOpen && (
        <AddProductModal
          open={addModalOpen}
          handleClose={handleCloseModal}
          handleSave={handleSaveNewProduct}
        />
      )}
    </Container>

  );
};

export default InventoryManagement;
