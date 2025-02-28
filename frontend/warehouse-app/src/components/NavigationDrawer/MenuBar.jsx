import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import menuItems from './menuItems';
import Link from '@mui/material/Link';
import AboutDeveloper from '../Modal/AboutDeveloper';
import ContactMe from "../Modal/ContactMe";
import { useNavigate } from "react-router-dom"; 

const drawerWidth = 330;

export default function MenuBar({userRole}) {
    const navigate = useNavigate();
    const filteredMenuItems = menuItems
        .filter(item => item.roles.includes(userRole)) 
        .map(item => ({
        ...item, 
        children: item.children
            && item.children.filter(child => child.roles.includes(userRole)) 
        }));

    const [openMenus, setOpenMenus] = useState({}); 
    const [openModal, setOpenModal] = useState(null); // Holds the current open dialog

    const handleToggle = (menuText) => {
        setOpenMenus(prev => ({
        ...prev,
        [menuText]: !prev[menuText],
        }));
    };

    const handleOpenModals = (modal) => {
        setOpenModal(modal);
    }

    const handleCloseModals = () => {
        setOpenModal(null); // Close the dialog
    };

    const handleSelect = (path) => {
        navigate(path)
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Divider />
            <List>
                {filteredMenuItems.map((item, index) => (
                    <React.Fragment key={item.text + index}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                handleToggle(item.text)
                                if (!item.children) handleSelect(item.path)
                            }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />{item.children && (
                                <ListItemIcon>
                                    {openMenus[item.text] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItemIcon>
                            )}
                            </ListItemButton>
                        </ListItem>

                        {item.children && (
                            <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child, cindex) => (
                                        <ListItem key={child.text + cindex} disablePadding>
                                            <ListItemButton sx={{pl:5}} onClick={() => handleSelect(child.path)}>
                                                <ListItemIcon> {child.icon}</ListItemIcon>
                                                <ListItemText primary={child.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
            
            <Divider />
            <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', mt: 2, gap: 6, flexWrap: 'wrap'}}>
                <Link onClick={() => handleOpenModals('aboutDeveloper')} href="#">About the Developer</Link>
                    {openModal === 'aboutDeveloper' && <AboutDeveloper onClose={handleCloseModals} />}
                <Link onClick={() => handleOpenModals('contactMe')} href="#">Contact Me</Link>
                    {openModal === 'contactMe' && <ContactMe onClose={handleCloseModals} />}
            </Box>
            
        </Drawer>
        
        </Box>
    );
}
