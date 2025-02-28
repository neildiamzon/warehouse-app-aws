import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const UomComboBox = ({ label, value, onChange }) => {
    const options = [
        { label: 'BX', value: 'BX' },
        { label: 'BIB', value: 'BIB' },
        { label: 'JAR', value: 'JAR' },
        { label: 'BOT', value: 'BOT' },
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
