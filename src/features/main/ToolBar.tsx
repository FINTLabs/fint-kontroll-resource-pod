import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchField from "./SearchField";
import {Button} from "@mui/material";
import style from "../../template/style";
import {Apartment} from "@mui/icons-material";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props: CustomTableToolbarProps) {

    const {onShowDialog} = props;

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
            <Button
                id={'selectUnits'}
                variant="outlined"
                startIcon={<Apartment/>}
                onClick={onShowDialog}
                sx={style.changeOrgButton}
                style={{fontWeight: 'normal'}}
            >
                Velg enhet
            </Button>
        </Toolbar>
    );
}

export default CustomTableToolbar;