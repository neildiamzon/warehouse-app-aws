import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';

export default function MenuBar({userRole}) {

    const settings = [
        { key: 'profile', label: 'Profile', path: '/profile', icon: Person2Icon }, 
        { key: 'Logout', label: 'Logout', path: '/logout' , icon: LogoutIcon}
    ];

    const drawerWidth = 330
    
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (key, path) => {
        
        if (key === "profile") {
            navigate('/dashboard/profile');
        }
        if (key === "Logout") {
            navigate('/login');
        }
        console.log(path)
      };
    const navigate = useNavigate();
    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 1}}>
                
                <Typography variant="h6" sx={{ mr: 5 }}>
                        Greetings, {userRole}   
                    </Typography>
                <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} variant="contained">
                            <Avatar alt={userRole} src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        {settings.map((setting) => (
                            <MenuItem key={setting.key} onClick={() => handleMenuClick(setting.key, setting.path)}>
                                <setting.icon sx={{ marginRight: 2 }} />
                                <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
            </Box>
        </AppBar>
    )

}