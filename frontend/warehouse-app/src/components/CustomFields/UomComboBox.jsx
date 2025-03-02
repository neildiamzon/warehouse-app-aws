import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const UomComboBox = ({ label, value, onChange }) => {
    const options = [
        { label: 'BX', value: 'box' },
        { label: 'KG', value: 'kg' },
        { label: 'PC', value: 'piece' },
        { label: 'PK', value: 'pack' },
        { label: 'LT', value: 'liters' },
    ];

    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            variant="outlined"
            margin="normal"
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default UomComboBox;
