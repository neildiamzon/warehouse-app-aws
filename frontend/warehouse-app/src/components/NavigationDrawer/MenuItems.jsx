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
        roles: [ 'Customer']
    },
    {
        text: 'Inventory Management',
        icon: <InventoryIcon />,
        roles: ['Admin', 'Staff'],
        path: '/dashboard/inventory-management'
    },
    {
        text: 'Invoices',
        icon: <ReceiptIcon />, // Icon for the menu item
        roles: ['Admin', 'staff'], // Roles that can access this menu item
        path: '/dashboard/invoices'
    },
    {
        text: 'My Orders',
        icon: <ShoppingCartIcon />,
        roles: ['Customer']
    },
    
    {
        text: 'User Management',
        icon: <PersonIcon />,
        roles: ['Admin', 'staff']
    }
];

// Export the menu items
export default menuItems;