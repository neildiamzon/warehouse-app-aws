import React, { useState, useEffect } from 'react';
import UomComboBox from '../../CustomFields/UomComboBox';
import { Modal, Box, TextField, Button } from '@mui/material';

const EditProductModal = ({ open, handleClose, product, handleSave }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
        uom: product.uom,
        stock_level: product.stock_level
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
        handleSave(formData);
        handleClose();
    };

    useEffect(() => {
        if (open) {
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                uom: product.uom,
                stock_level: product.stock_level
            });
        }
    }, [open, product]);

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
                <h2>Edit Product</h2>
                <TextField
                    label="Name"
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

                <UomComboBox
                    label="Select UOM"
                    value={formData.uom}
                    onChange={handleUomChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Adjust Stock Level"
                    name="stock_level"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.stock_level}
                    onChange={handleChange}
                />
                <Box>
                    <Button variant="contained" color="primary" onClick={handleSubmit}
                        sx={{ marginTop: 2 }}>
                        Save
                    </Button><Button variant="contained" color="primary" onClick={handleClose}
                        sx={{ marginTop: 2 , marginLeft: 2}}>
                        Cancel
                    </Button>
                </Box>
                
            </Box>
        </Modal>
    );
};

export default EditProductModal;