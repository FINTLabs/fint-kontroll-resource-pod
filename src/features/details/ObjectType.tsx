import * as React from 'react';
import {useContext} from 'react';
import {FormControl, MenuItem} from "@mui/material";
import {ResourceContext} from "../../context";
import TextField from "@mui/material/TextField";

export default function FilterGroupUser() {

    const {updateCurrentUserPage} = useContext(ResourceContext);

    const updatePage = () => {
        updateCurrentUserPage(0)
    }

    const options = [
        {value: "Alle", label: "Alle"},
        {value: "Brukere", label: "Brukere"},
        {value: "Grupper", label: "Grupper"}
    ];

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
            <TextField
                id="select-object-type"
                select
                label="Brukere/Grupper"
                //  defaultValue="EUR"
                // helperText="Velg brukere eller grupper"
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} onClick={updatePage}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
}