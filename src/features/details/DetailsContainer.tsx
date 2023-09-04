import {Box, Button} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import style from "../../template/style";
import ResourceInfo from "./ResourceInfo";
import DetailsToolBar from "./DetailsToolBar";
import {useParams} from "react-router-dom";
import {ResourceContext} from "../../context";
import {UserTable} from "./UserTable";
import {AssignedUsersTable} from "./AssignedUsersTable"
import {ChangeCircleOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

function DetailsContainer() {

    const {basePath, getResourceById} = useContext(ResourceContext);
    const [selectedUsers, setSelectedUser] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>('Se kun tildelte');

    const {id} = useParams<string>();

    useEffect(() => {
        if (id) {
            getResourceById(`${basePath === '/' ? '' : basePath}/api/resources/${id}`);
        }
        // eslint-disable-next-line
    }, [])

    const handleClick = () => {
        if (selectedUsers) {
            setButtonText('Se kun tildelte')
            setSelectedUser(false)

        } else if (!selectedUsers) {
            setSelectedUser(true)
            setButtonText('Se alle brukere')
        }
    }

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <DetailsToolBar/>
                <ResourceInfo/>
            </Box>
            <Box sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h2">
                    Brukere
                </Typography>
                <Button
                    id={"button-only-assigned"}
                    variant={"outlined"}
                    aria-label="Toggle"
                    color={"primary"}
                    endIcon={<ChangeCircleOutlined/>}
                    onClick={handleClick}
                >
                    {buttonText}
                </Button>
            </Box>
            {selectedUsers ? <AssignedUsersTable resourceId={id}/> : <UserTable resourceId={id}/>}
        </Box>
    );
}

export default DetailsContainer;