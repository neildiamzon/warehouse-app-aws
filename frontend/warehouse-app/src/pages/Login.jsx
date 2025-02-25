import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook
  
  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      // After successful login, navigate to the dashboard
      navigate('/dashboard');  // This will redirect the user to the dashboard page
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <Container sx={{ mt: 0, backgroundColor: 'white', p: 9, borderRadius: 6, width: '190%'}}>
      <Box 
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color='black' variant="h5" component="h2" gutterBottom>
          Foods Warehouse Login
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Message */}
        {loginMessage && <Typography color="error">{error}</Typography>}

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;