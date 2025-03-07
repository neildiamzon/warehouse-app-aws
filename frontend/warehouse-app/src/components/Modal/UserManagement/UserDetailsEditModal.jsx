import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField
} from "@mui/material";

const UserDetailsEditModal = ({ open, onClose, user, onSave }) => {
  if (!user) return null;

  const [formData, setFormData] = useState({
    userId: user.userId,
    phoneNumber: user.phoneNumber,
    customerName: user.customerName,
    shippingAddress: user.shippingAddress,
    contactPerson: user.contactPerson,
    contactPersonEmail: user.contactPersonEmail,
    customerId: user.customerId,
    organization: user.organization
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit User
        </Typography>

        <Stack spacing={1.5}>
          <Typography>User ID: <strong>{user.userId}</strong></Typography>
          <Typography>Username: <strong>{user.username}</strong></Typography>
          <Typography>Organization: <strong>{user.organization}</strong></Typography>
          
          <TextField
            label="Customer Name"
            name="customerName"
            fullWidth
            value={formData.customerName}
            onChange={handleChange}
          />

          <TextField
            label="Shipping Address"
            name="shippingAddress"
            fullWidth
            value={formData.shippingAddress}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <TextField
            label="Contact Person"
            name="contactPerson"
            fullWidth
            value={formData.contactPerson}
            onChange={handleChange}
          />

          <TextField
            label="Contact Person Email"
            name="contactPersonEmail"
            fullWidth
            value={formData.contactPersonEmail}
            onChange={handleChange}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserDetailsEditModal;
