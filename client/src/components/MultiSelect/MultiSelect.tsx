import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './style';

interface Props {
    label: string;
    options: string[];
    value?: string[];
    onChange: (values: string[]) => void;
}

export default function MultiSelect({ label, options, value, onChange }: Props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOpen(false);
        onChange(event.target.value as string[]);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={value || []}
                onChange={handleChange}
                input={<Input />}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    )
}