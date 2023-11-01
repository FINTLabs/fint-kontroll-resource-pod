import * as React from 'react';
import {useContext} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ResourceContext} from "../../context";

export default function FilterGroupUser() {

    const {objectType, setObjectType} = useContext(ResourceContext);

    const handleChange = (event: SelectChangeEvent) => {
        setObjectType(event.target.value as string);
    };

    const options = [
        {value: "Grupper", label: "Grupper"},
        {value: "Brukere", label: "Brukere"}
    ];

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
            <InputLabel
                id="velg-bruker-eller-gruppe"
            >
                Velg Brukere / Grupper
            </InputLabel>
            <Select
                labelId="select-users-or-groups-label"
                id="select-users-or-groups"
                value={objectType}
                label="Velg Brukere / Grupper"
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}