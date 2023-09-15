import {Box} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import style from "../../template/style";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import Typography from "@mui/material/Typography";
import {UserTable} from "./UserTable";

function AssignmentContainer() {

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
            </Box>
            <Box sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h2">
                    Tildel ressurs
                </Typography>
            </Box>
            <UserTable resourceId={id}/>
        </Box>
    );
}

export default AssignmentContainer;