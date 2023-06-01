import {Box} from "@mui/material";
import {ResourceTable} from "./ResourceTable";
import * as React from "react";
import style from "../../template/style";

//import style from "../../template/style";

function MainContainer() {

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <ResourceTable/>
            </Box>
        </Box>
    );
}

export default MainContainer;