import {Box} from "@mui/material";
import * as React from "react";
import style from "../../template/style";
import {useBasePath} from '../../context/BasePathContext';
import DetailsContainer from "./DetailsContainer";
import ResourceProvider from "../../context/ResourceContext";

function DetailsTempContainer() {
    const basePath = useBasePath() || '';

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <ResourceProvider basePath={basePath}>
                    <DetailsContainer/>
                </ResourceProvider>
            </Box>
        </Box>
    );
}

export default DetailsTempContainer;