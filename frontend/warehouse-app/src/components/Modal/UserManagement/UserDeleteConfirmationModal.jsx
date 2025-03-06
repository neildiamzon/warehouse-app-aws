import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const UserDeleteConfirmationModal = ({ open, onClose, onConfirm, username }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete user <strong>{username}</strong>?
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserDeleteConfirmationModal;
