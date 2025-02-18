import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import menuItems from './menuItems';
import Link from '@mui/material/Link';

const drawerWidth = 400;

export default function MenuBar({userRole}) {
    const filteredMenuItems = menuItems
        .filter(item => item.roles.includes(userRole)) 
        .map(item => ({
        ...item, 
        children: item.children
            && item.children.filter(child => child.roles.includes(userRole)) 
        }));

    const [openMenus, setOpenMenus] = React.useState({}); 

    const handleToggle = (menuText) => {
        setOpenMenus(prev => ({
        ...prev,
        [menuText]: !prev[menuText],
        }));
    };
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <Typography variant="h6" noWrap component="div">
                Welcome, {userRole}
            </Typography>
            </Toolbar>
        </AppBar>
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
                            <ListItemButton onClick={() => handleToggle(item.text)}>
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
                                            <ListItemButton sx={{pl:5}} onClick={() => handleSelect(child.text)}>
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
                <Link href="#">About the Developer</Link>
                <Link href="#">Contact Me</Link>
            </Box>
            
        </Drawer>
        
        </Box>
    );
}
