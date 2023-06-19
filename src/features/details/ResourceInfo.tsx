import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import {FlutterDash} from "@mui/icons-material";
import {ResourceContext} from "../../context";

function UserInfo() {

    const {resourceDetails} = useContext(ResourceContext);

    return (
        <Box sx={{flexGrow: 1, maxWidth: 752}}>
            <FormGroup row>
            </FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        <ListItem>
                            <ListItemText
                                id={'resourceName'}
                                primary={resourceDetails?.resourceName}
                                secondary={'Ressurs'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                id={'userNameText'}
                                 primary={resourceDetails?.resourceType}
                                secondary={'Ressurstype'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                id={'orgUnitText'}
                                 primary={resourceDetails?.applicationAccessType}
                                secondary={'Applikasjonstilgangstype'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={resourceDetails?.applicationAccessRole}
                                secondary={'Tilgangsrolle'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={resourceDetails?.accessType}
                                secondary={'Tilgangstype'}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserInfo;