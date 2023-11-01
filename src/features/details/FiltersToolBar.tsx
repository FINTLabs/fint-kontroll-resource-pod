import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import AssignedUserSearch from './AssignedUserSearch';
import UserType from '../assignment/UserType'
import RoleType from '../assignment/RoleType'
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
                <UserType/>

                :
                <RoleType/>
            }
            {objectType === 'Brukere' ?
                <AssignedUserSearch/>
                :
                ''
            }

        </Toolbar>
    );
}

export default CustomTableToolbar;