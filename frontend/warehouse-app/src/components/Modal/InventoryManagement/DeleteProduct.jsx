import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteProductModal = ({ open, handleClose, selectedProducts, handleDelete }) => {
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
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete the following products?
        </Typography>
        {selectedProducts.map((product) => (
          <Box key={product.id} sx={{ mb: 1 }}>
            <Typography>{`${product.name} - ${product.description}`}</Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete()}
            sx={{ marginRight: 6 }}
          >
            Confirm Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
