import ViewListIcon from '@mui/icons-material/ViewList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { Children } from 'react';

const menuItems = [
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
        roles: ['Customer'],
        children: [
            {
                text: 'New Order',
                icon: <AddShoppingCartIcon />,
                roles: ['Customer'],
                path: '/dashboard/add-order'
            },
            {
                text: 'View Orders',
                icon: <ViewListIcon />,
                roles: ['Customer'],
            }
        ]
    },
    
    {
        text: 'User Management',
        icon: <PersonIcon />,
        roles: ['Admin', 'staff']
    }
];

// Export the menu items
export default menuItems;