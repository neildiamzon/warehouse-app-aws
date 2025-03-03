import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Avatar, Button, Box, Divider, TextField, CircularProgress } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const ViewProfile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('email');
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7187/api/user-details',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: {
        username: data
      }
    };

    axios.request(config)
      .then((response) => {
        const customerFields = [
          "customerName",
          "contactPerson",
          "shippingAddress",
          "contactPersonEmail",
          "organization",
          "phoneNumber"
        ];

        // Filter only customer-specific fields
        const filteredData = Object.fromEntries(
          Object.entries(response.data).filter(([key]) => customerFields.includes(key))
        );

        setFormData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      {/* Profile Section */}
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src="https://via.placeholder.com/150" // Placeholder, replace with real profile picture URL
          alt="Profile"
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {formData.customerName}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {formData.contactPersonEmail}
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        <Typography variant="body2" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
          {formData.organization}
        </Typography>
      </Paper>

      {/* Contact Information Section */}
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <TextField
              label="Customer Name"
              value={formData.customerName || ''}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Contact Person"
              value={formData.contactPerson || ''}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Phone Number"
              value={formData.phoneNumber || ''}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Email"
              value={formData.contactPersonEmail || ''}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </Paper>
        </Grid>

        {/* Shipping Address Section */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <TextField
              label="Shipping Address"
              value={formData.shippingAddress || ''}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewProfile;
