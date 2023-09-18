import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import UserSearch from './UserSearch';
//import UserType from './UserType';
//import ObjectType from './ObjectType';


function CustomTableToolbar() {

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                pb: 2,
            }}
        >
            {/*<ObjectType/>
            <UserType/>*/}
            <UserSearch/>
        </Toolbar>
    );
}

export default CustomTableToolbar;