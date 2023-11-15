import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import UserSearch from '../users/UserSearch';
//import UserType from '../users/UserType';
//import RoleType from '../groups/RoleType';
import RoleSearch from '../groups/RoleSearch';
import ObjectType from './ObjectType';
import {ResourceContext} from "../../context";


function CustomTableToolbar() {

    const {objectType} = useContext(ResourceContext);

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                pb: 2,
            }}
        >
            <ObjectType/>
            {objectType === 'Brukere' ?
                <>
                    {/* <UserType/>*/}
                    <UserSearch/>
                </>
                :
                <>
                    {/* <RoleType/>*/}
                    <RoleSearch/>
                </>
            }
        </Toolbar>
    );
}

export default CustomTableToolbar;