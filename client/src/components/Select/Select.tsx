import React from 'react';
import { FormControl, Input, InputLabel, MenuItem, Select as MaterialSelect } from '@material-ui/core';
import useStyles from './style';

interface Option {
    key: number;
    value: string;
}

interface Props {
    label: string;
    options: Option[];
    value?: number;
    onChange: (value: number) => void;
}

export default function Select({ label, options, value, onChange }: Props) {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as number);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <MaterialSelect
                value={value === undefined ? "" : value}
                onChange={handleChange}
                input={<Input />}>
                <MenuItem>Please select</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                        {option.value}
                    </MenuItem>
                ))}
            </MaterialSelect>
        </FormControl>
    )
}
