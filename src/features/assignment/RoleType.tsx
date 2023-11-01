import * as React from 'react';
import {useContext} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ResourceContext} from "../../context";

export default function FilterGroupType() {

    const {roleType, updateRoleType, updateCurrentRolePage} = useContext(ResourceContext);

    function handleChange(event: SelectChangeEvent) {
        updateRoleType(event.target.value as string);
        console.log(event.target.value as string + "test")
    }

    const updateRolePage = () => {
        updateCurrentRolePage(0)
    }

    const options = [
        {value: "ALLTYPES", label: "Alle"},
        {value: "elev", label: "Elev"},
        {value: "ansatt", label: "Ansatt"}
    ];

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
            <InputLabel
                id="valg-gruppetype"
            >
                Gruppetype
            </InputLabel>
            <Select
                labelId="valg-brukertype"
                id="brukertype"
                value={roleType}
                label="Gruppetype"
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} onClick={updateRolePage}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    );
}