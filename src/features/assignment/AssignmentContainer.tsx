import {Box} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import style from "../../template/style";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import Typography from "@mui/material/Typography";
import {UserTable} from "../users/UserTable";
import UserSearch from "../users/UserSearch";
//import UserType from "../users/UserType";
//import RoleType from "../groups/RoleType";
import {RoleTable} from "../groups/RoleTable";
import ObjectType from "../details/ObjectType";
import RoleSearch from "../groups/RoleSearch";

function AssignmentContainer() {

    const {getResourceById, resourceDetails, objectType} = useContext(ResourceContext);
    const {id} = useParams<string>();

    useEffect(() => {
        if (id) {
            getResourceById(parseInt(id));
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
                    <ObjectType/>
                    {objectType === 'Brukere' ?
                        <>
                            {/*<UserType/>*/}
                            <UserSearch/>
                        </>
                        :
                        <>
                            {/*<RoleType/>*/}
                            <RoleSearch/>
                        </>
                    }
                </Box>
            </Box>
            {objectType === 'Brukere' ?
                <UserTable resourceId={Number(id)}/>
                :
                <RoleTable resourceId={Number(id)}/>
            }
        </Box>
    );
}

export default AssignmentContainer;