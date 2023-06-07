import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchField from "./SearchField";

function CustomTableToolbar() {

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h1"
                id="tableTitle"
            >
                Ressurser
            </Typography>
            <SearchField/>

            {/*<Tooltip title={"Velg organisasjonsenhet"}>
                <IconButton
                    id={'selectUnitsIcon'}
                    aria-label="settings"
                    onClick={onShowDialog}
                >
                    <PeopleIcon color={"primary"}/>
                </IconButton>
            </Tooltip>*/}
        </Toolbar>
    );
}

export default CustomTableToolbar;