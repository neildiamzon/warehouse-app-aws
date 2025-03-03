import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

import { Link, useNavigate } from "react-router-dom"; 

import AboutDeveloper from '../components/Modal/AboutDeveloper';
import ContactMe from "../components/Modal/ContactMe";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [openModal, setOpenModal] = useState(null); // Holds the current open dialog

  const navigate = useNavigate(); // Initialize the navigate hook
  const handleOpenModals = (modal) => {
    setOpenModal(modal);
}

const handleCloseModals = () => {
    setOpenModal(null); // Close the dialog
};
  const handleLogin = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7187/api/authentication/login',
      headers: {},
      data: {
        Username: email,
        Password: password
      }
    };
    
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var _role = response.data.role[0];
        localStorage.setItem('role', _role);
        localStorage.setItem('email', email);
        navigate('/dashboard');  // This will redirect the user to the dashboard page
      })
      .catch((error) => {
        alert('Invalid email or password');
        console.log(error);
      });
  };
  return (
    <Container 
      sx={{ 
        backgroundColor: "white",
        p: 9,
        display: "flex", 
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" }}}>
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
          <strong>Foods Warehouse</strong>
        </Typography>
        <Typography color='black' variant="h5" component="h2">
          Login
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
        <Link to="/registration">Don't have an account? Register</Link>
      </Box>
      <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', mt: 2, gap: 6, flexWrap: 'wrap'}}>
                <Link onClick={() => handleOpenModals('aboutDeveloper')} href="#">About the Developer</Link>
                    {openModal === 'aboutDeveloper' && <AboutDeveloper onClose={handleCloseModals} />}
                <Link onClick={() => handleOpenModals('contactMe')} href="#">Contact Me</Link>
                    {openModal === 'contactMe' && <ContactMe onClose={handleCloseModals} />}
            </Box>
    </Container>
  );
};

export default Login;