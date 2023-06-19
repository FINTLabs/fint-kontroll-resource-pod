import {Box} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import style from "../../template/style";
import ResourceInfo from "./ResourceInfo";
import DetailsToolBar from "./DetailsToolBar";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import {UserTable} from "./UserTable";

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
                <DetailsToolBar/>
                <ResourceInfo/>
                <UserTable/>
            </Box>
        </Box>
    );
}

export default DetailsContainer;