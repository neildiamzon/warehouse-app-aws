import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const UserDetailsModal = ({ open, onClose, user }) => {
  if (!user) return null;

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
          User Details
        </Typography>

        <Stack spacing={1.5}>
          <Typography>User ID: <strong>{user.userId}</strong></Typography>
          <Typography>Username: <strong>{user.username}</strong></Typography>
          <Typography>Organization: <strong>{user.organization}</strong></Typography>
          <Typography>Customer Name: <strong>{user.customerName}</strong></Typography>
          <Typography>Shipping Address: <strong>{user.shippingAddress}</strong></Typography>
          <Typography>Email: <strong>{user.email}</strong></Typography>
          <Typography>Email Confirmed: <strong>{user.emailConfirmed ? "Yes" : "No"}</strong></Typography>
          <Typography>Phone Number: <strong>{user.phoneNumber}</strong></Typography>
          <Typography>Phone Confirmed: <strong>{user.phoneNumberConfirmed ? "Yes" : "No"}</strong></Typography>
          <Typography>Customer ID: <strong>{user.customerId}</strong></Typography>
          <Typography>Contact Person: <strong>{user.contactPerson}</strong></Typography>
          <Typography>Contact Person Email: <strong>{user.contactPersonEmail}</strong></Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
