import {Box} from "@mui/material";
import * as React from "react";
import style from "../../template/style";
import ResourceInfo from "./ResourceInfo";

function MainContainer() {

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
               <ResourceInfo/>
            </Box>
        </Box>
    );
}

export default MainContainer;