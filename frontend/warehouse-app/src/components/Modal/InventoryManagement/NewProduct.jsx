import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import UomComboBox from '../../CustomFields/UomComboBox';

const AddProductModal = ({ open, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        productCode: '',
        name: '',
        description: '',
        price: '',
        quantityPerUOM: '',
        uom: '',
        weight: '',
        stockLevel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUomChange = (e) => {
        setFormData(prev => ({ ...prev, uom: e.target.value }));
    };

    const handleSubmit = () => {
        // Save and console log the form data as JSON
        console.log(JSON.stringify(formData, null, 2));
        handleSave(formData);  // Optional: You can use handleSave to perform further actions
        handleClose();  // Close the modal after saving
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}
            >
                <h2>Add New Product</h2>
                <TextField
                    label="Product Code"
                    name="productCode"
                    value={formData.productCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Product name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    label="Quantity Per UOM"
                    name="quantityPerUOM"
                    type="number"
                    value={formData.quantityPerUOM}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <UomComboBox
                    label="Select UOM"
                    name="uom"
                    value={formData.uom}
                    onChange={handleUomChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Stock Level"
                    name="stockLevel"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.stock_level}
                    onChange={handleChange}
                />

                <Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        sx={{ marginTop: 2 }}
                    >
                        Save
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClose}
                        sx={{ marginTop: 2, marginLeft: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductModal;
