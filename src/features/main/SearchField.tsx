import * as React from 'react';
import {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import {FormControl, InputAdornment} from "@mui/material";
import {Clear, Search} from "@mui/icons-material";
import {ResourceContext} from "../../context";

export default function SearchFieldUser() {

    const [showClearIcon, setShowClearIcon] = useState("none");
    const [showSearchIcon, setShowSearchIcon] = useState("");

    const {searchValue, searchString,} = useContext(ResourceContext);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setShowSearchIcon(event.target.value !== "" ? "none" : "flex");
        searchValue(event.target.value as string);
        console.log(event.target.value as string);
    }

    const handleClick = (): void => {
        setShowClearIcon("none");
        setShowSearchIcon("");
        searchValue("");
    };

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
            <TextField
                id="outlined-search-resource"
                label="Søk etter ressurs"
                role="search"
                onChange={handleChange}
                autoComplete="off"
                value={searchString}
                InputLabelProps={{
                    shrink: true,
                }}

                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            style={{
                                display: showSearchIcon,
                            }}
                        >
                            <Search id="showSearchIcon"/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{
                                display: showClearIcon,
                                cursor: 'pointer'
                            }}
                            onClick={handleClick}
                        >
                            <Clear id="showClearIcon"/>
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
}