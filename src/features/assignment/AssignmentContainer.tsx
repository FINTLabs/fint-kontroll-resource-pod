import {Box} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import style from "../../template/style";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import Typography from "@mui/material/Typography";
import {UserTable} from "./UserTable";
import UserSearch from "../assignment/UserSearch";
import UserType from "../assignment/UserType";

function AssignmentContainer() {

    const {basePath, getResourceById, resourceDetails} = useContext(ResourceContext);
    const {id} = useParams<string>();

    useEffect(() => {
        if (id) {
            getResourceById(`${basePath === '/' ? '' : basePath}/api/resources/${id}`);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={style.content}>

            <Box sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Box>
                    <Typography variant="h1">
                        Ny tildeling
                    </Typography>
                    <Typography sx={{mt: 1}}>
                        {resourceDetails?.resourceName}
                    </Typography>
                </Box>
                <Box>
                    <UserType/>
                    <UserSearch/>
                </Box>
            </Box>
            <UserTable resourceId={id}/>
        </Box>
    );
}

export default AssignmentContainer;