import {Box} from "@mui/material";
import * as React from "react";
import style from "../../template/style";
import {useBasePath} from '../../context/BasePathContext';
import ResourceProvider from "../../context/ResourceContext";
import AssignmentContainer from "./AssignmentContainer";

function AssignmentTempContainer() {
    const basePath = useBasePath() || '';

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <ResourceProvider basePath={basePath}>
                    <AssignmentContainer/>
                </ResourceProvider>
            </Box>
        </Box>
    );
}

export default AssignmentTempContainer;