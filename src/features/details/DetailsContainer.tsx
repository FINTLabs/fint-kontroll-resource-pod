import {Box} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import style from "../../template/style";
import ResourceInfo from "./ResourceInfo";
import DetailsToolBar from "./FiltersToolBar";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import {AssignmentsTable} from "./AssignmentsTable";
import Typography from "@mui/material/Typography";

function DetailsContainer() {

    const {basePath, getResourceById} = useContext(ResourceContext);
    const {id} = useParams<string>();

    useEffect(() => {
        if (id) {
            getResourceById(`${basePath === '/' ? '' : basePath}/api/resources/${id}`);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <ResourceInfo/>
            </Box>
            <Box sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h2">
                    Tildelinger
                </Typography>
                <DetailsToolBar/>
            </Box>
            <AssignmentsTable resourceId={id}/>
        </Box>
    );
}

export default DetailsContainer;