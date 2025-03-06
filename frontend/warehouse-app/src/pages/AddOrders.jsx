import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Container, Grid, Button, TextField, Box, Typography, IconButton,
    MenuItem
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import axios from 'axios';

const AddOrders = () => {

    // State for managing added orders (cart)
    const [cart, setCart] = useState([]);

    // State for managing the selected order data (name, price, quantity)
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({ productCode: '', id: '', name: '', price: 0, quantity: 1 });

    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(''); // Error message state
    const [products, setProducts] = useState([]);

    // Column definitions for the DataGrids

    const orderColumns = [
        { field: 'productCode', headerName: 'Product Code', flex: 2},
        { field: "name", headerName: "Product Name", flex: 1 },
        { field: "description", headerName: "Description", flex: 2 },
        { field: "price", headerName: "Price ($)", type: "number", flex: 1 },
        { field: "weight", headerName: "Weight (kg)", type: "number", flex: 1 },
        { field: "uom", headerName: "UOM", flex: 1 },
        { field: "quantityPerUOM", headerName: "Qty/UOM", type: "number", flex: 1 },
        { field: "stockLevel", headerName: "Stock Level", type: "number", flex: 1 }
    ];

    const filteredProducts = products.filter((row) =>
        row[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartColumns = [
        { field: 'productCode', headerName: 'Product Code', width: 200},
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDeleteItem(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ];

    const generateInvoice = () => {
        // Create the invoice object
        const invoice = cart.map(item => ({
                productCode: item.productCode,
                quantity: item.quantity,
                unitPrice: item.price,
                totalPrice: item.total
            }));
    
        // Now you can send this `invoice` object to the backend
        console.log('Generated Invoice:', invoice);
    
        // Example: send the invoice to the backend via an API call
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://localhost:7187/api/new-order`, // how to add the search term here?
            data: invoice,
            headers: {
                "email": localStorage.getItem("email")  // Custom header
            },
        };

        axios.request(config)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert('Error has occurred');
                console.log(error);
            });
    };
    

    // Handle row selection from the orders grid
    const handleOrderSelection = (selectionModel) => {
        console.log("Selection Model:", selectionModel);  // Log the selected rows' IDs
        if (selectionModel.length > 0) {
            const selectedRow = products.find(order => order.id === selectionModel[0]); // Get the selected order by id
            if (selectedRow) {
                setSelectedOrder({
                    productCode: selectedRow.productCode,
                    id: selectedRow.id,
                    name: selectedRow.name,
                    price: selectedRow.price,
                    quantity: 1, // Start with quantity as 1
                });
            }
        }
    };


    const getCartSummary = () => {
        const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cart.reduce((acc, item) => acc + item.total, 0);
        return { totalProducts, totalPrice };
    };

    const { totalProducts, totalPrice } = getCartSummary();
    // Handle adding the selected order to the cart
    const addToCart = () => {
        if (selectedOrder.quantity > 0) {
            // Check if the product already exists in the cart
            const existingItemIndex = cart.findIndex(item => item.id === selectedOrder.id);

            if (existingItemIndex !== -1) {
                // If the product exists, update the quantity and the total price
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity += selectedOrder.quantity;
                updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].price * updatedCart[existingItemIndex].quantity;
                setCart(updatedCart); // Update the cart state
            } else {
                // If the product doesn't exist, add it to the cart
                const newItem = {
                    ...selectedOrder,
                    total: selectedOrder.price * selectedOrder.quantity,
                };
                setCart((prevCart) => [...prevCart, newItem]);
            }
        }
    };
    // Handle deleting an item from the cart
    const handleDeleteItem = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    // Handle submit order
    const handleSubmitOrder = () => {
        generateInvoice();
        // You can add logic here for submitting the order
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

    useEffect(() => {
        handleGetProducts();
    }, []);


    return (
        <Container maxWidth="lg" sx={{ width: '100%', padding: 4, minHeight: '100vh' }}>
            <Grid container spacing={4}>
                {/* Orders List and Price/Quantity Section in the same row */}
                <Grid item xs={50} md={9}>
                    <Typography variant="h6">List of Products</Typography>
                    <Typography sx={{mb: 2}} 
                        variant="subtitle1"
                        >Click a product - Set Quantity - Click "Add to Cart"</Typography>
                    
                    <TextField
                        select
                        label="Search By"
                        value={searchColumn}
                        onChange={(e) => setSearchColumn(e.target.value)}
                        sx={{ mr: 2, width: 150 }}
                    >
                        {orderColumns.map((col) => (
                            <MenuItem key={col.field} value={col.field}>
                                {col.headerName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label={`Search ${orderColumns.find((col) => col.field === searchColumn)?.headerName}`}
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 300 }}
                    />

                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid
                            sx={{ width: '110%' }}
                            rows={filteredProducts}
                            columns={orderColumns}
                            pageSize={5}
                            loading={loading}
                            onRowSelectionModelChange={(newSelection) => handleOrderSelection(newSelection)}
                            rowSelectionModel={rowSelectionModel}
                        />
                    </div>
                </Grid>

                <Grid item xs={50} md={2} sx={{ml: 10, mt: 5}}>
                    <Typography variant="h6">Product Details</Typography>
                    <TextField
                        label="Product Code"
                        value={selectedOrder.productCode}
                        disabled
                        margin="normal"
                        sx={{ width: '80%' }}
                    />
                    <TextField
                        label="Product Name"
                        value={selectedOrder.name}
                        disabled
                        margin="normal"
                        sx={{ width: '80%' }}
                    />
                    <TextField
                        label="Price"
                        value={selectedOrder.price}
                        disabled
                        margin="normal"
                        sx={{ width: '80%' }}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={selectedOrder.quantity}
                        onChange={(e) => setSelectedOrder({ ...selectedOrder, quantity: parseInt(e.target.value) })}
                        margin="normal"
                        sx={{ width: '80%' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addToCart}
                        disabled={`${selectedOrder.id}` === ''}>
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>

            {/* Added Orders (Cart) Section */}
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <Grid item xs={12}>
                    <Typography variant="h6">Added Orders (Cart)</Typography>
                    <Typography variant="h6" sx={{ marginLeft: 2, display: 'inline' }}>
                        ({totalProducts} products, Total: ${totalPrice.toFixed(2)})
                    </Typography>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid
                            rows={cart}
                            columns={cartColumns}
                            pageSize={5}
                            sx={{
                                width: '100%', // Makes the DataGrid take full width of the container
                                maxWidth: '100%', // Prevents any overflow and keeps it within the container's limits
                              }}
                        />
                    </div>
                </Grid>

                {/* Submit Order Button */}
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleSubmitOrder} fullWidth>
                        Submit Order
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddOrders;
