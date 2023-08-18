import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchField from "./SearchField";
import {Button, Tooltip} from "@mui/material";
import style from "../../template/style";
import {Apartment} from "@mui/icons-material";
import {ResourceContext} from "../../context";
import IconButton from "@mui/material/IconButton";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props: CustomTableToolbarProps) {

    const {onShowDialog} = props;
    const {isAggregate, setIsAggregate} = useContext(ResourceContext);
    // const [showLayers, setShowLayers] = useState(true);

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
                id={'selectUnitsIcon'}
                variant="text"
                startIcon={<Apartment/>}
                onClick={onShowDialog}
                sx={style.changeOrgButton}
                style={{ fontWeight: 'normal' }}
            >
                Velg enhet
            </Button>

            {/*<Tooltip title={"Velg organisasjonsenhet"}>
                <IconButton
                    id={'selectUnitsIcon'}
                    aria-label="settings"
                    onClick={onShowDialog}
                >
                    <PeopleIcon color={"primary"}/>
                </IconButton>
            </Tooltip>*/}

            {isAggregate ? (
                <Tooltip title={"Aggregated"}>
                    <IconButton
                        id={'aggregatedFalse'}
                        aria-label="settings"
                        onClick={() => setIsAggregate(false)}
                    >
                        <LayersClearIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="Aggregated">
                    <IconButton
                        id={'aggregatedTrue'}
                        aria-label="settings"
                        onClick={() => setIsAggregate(true)}
                    >
                        <LayersIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>
            )}

        </Toolbar>
    );
}

export default CustomTableToolbar;