import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';        
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import React from 'react';

const menuItems = [
    {
        text: 'All Products',
        icon: <InventoryIcon />,
        roles: [ 'user']
    },
    {
        text: 'Inventory Management',
        icon: <InventoryIcon />,
        roles: ['admin', 'staff'],
        children: [
            { text: 'View Products', path: '/inventory/view', icon: <ViewListIcon />, roles: ['admin', 'staff', 'user'] },
            { text: 'Add New Product', path: '/inventory/add', icon: <AddBoxIcon />, roles: ['admin'] },
            { text: 'Edit Products', path: '/inventory/edit', icon: <EditIcon />, roles: ['admin'] },
            { text: 'Remove Products', path: '/inventory/delete', icon: <DeleteIcon />, roles: ['admin'] }
        ]
    },
    {
        text: 'Invoices',
        icon: <ReceiptIcon />, // Icon for the menu item
        roles: ['admin', 'staff'] // Roles that can access this menu item
    },
    {
        text: 'My Orders',
        icon: <ShoppingCartIcon />,
        roles: ['user'],
        children: [
            { text: 'View Invoices', path: '/my-orders/view', icon: <ListAltIcon />, roles: ['user'] },
            { text: 'Add New Order', path: '/my-orders/add', icon: <AddShoppingCartIcon />, roles: ['user'] },
            { text: 'Edit Orders', path: '/my-orders/edit', icon: <EditIcon />, roles: ['user'] }
        ]
    },
    
    {
        text: 'User Management',
        icon: <PersonIcon />,
        roles: ['admin', 'staff']
    }
];

// Export the menu items
export default menuItems;