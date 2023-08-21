import {Box, List, ListItem, ListItemText, Paper} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import {ResourceContext} from "../../context";

function ResourceInfo() {

    const {resourceDetails} = useContext(ResourceContext);

    return (
        <Box sx={{mb: 6}}>
            <Paper>
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
                    <Grid item xs={12} md={6}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.resourceLimit}
                                    secondary={'Grense for antall'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.platform.join(', ')}
                                    secondary={'plattform'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.resourceOwnerOrgUnitName}
                                    secondary={'Ressurseier'}
                                />
                            </ListItem>
                            {/*<ListItem>
                                <ListItemText
                                    primary={resourceDetails?.validForOrgUnits[]}
                                    secondary={'Ressurseier'}
                                />
                            </ListItem>*/}
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.validForRoles}
                                    secondary={'Gyldig for rolle'}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default ResourceInfo;