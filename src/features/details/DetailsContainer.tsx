import {Box} from "@mui/material";
import * as React from "react";
import style from "../../template/style";

function MainContainer() {

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
               <h1>Detaljer</h1>
            </Box>
        </Box>
    );
}

export default MainContainer;