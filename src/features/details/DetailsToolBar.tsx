import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserSearch from './UserSearch'
//import FilterType from "./FilterType";
import {ResourceContext} from "../../context";


function CustomTableToolbar() {

    const {resourceDetails} = useContext(ResourceContext);

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
                {resourceDetails?.resourceName}
            </Typography>
            <UserSearch/>
        </Toolbar>
    );
}

export default CustomTableToolbar;