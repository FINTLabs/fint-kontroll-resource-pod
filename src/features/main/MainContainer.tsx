import {Box} from "@mui/material";
import {ResourceTable} from "./ResourceTable";
import * as React from "react";
import style from "../../template/style";
import {useBasePath} from "../../context/BasePathContext";
import ResourceProvider from "../../context";
//import style from "../../template/style";

function MainContainer() {
    const basePath = useBasePath() || '';

    return (
        <Box sx={style.content} >
            <Box sx={style.table}>
                <ResourceProvider basePath={basePath}>
                    <ResourceTable/>
                </ResourceProvider>
            </Box>
        </Box>
    );
}

export default MainContainer;