import {Box, Button, List, ListItem, ListItemText, Paper} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import {ResourceContext} from "../../context";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Add} from "@mui/icons-material";

function ResourceInfo() {

    const {resourceDetails} = useContext(ResourceContext);

    const handleClick = (): void => {
        // searchValue("");
    };

    return (
        <Box sx={{mb: 6}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 100%', pb: 3}}>
                <Typography
                    variant="h1"
                    id="tableTitle"
                >
                    {resourceDetails?.resourceName}
                </Typography>
                <Button
                    sx={{minWidth: '80px'}}
                    id={"button-add-assignment"}
                    variant={"contained"}
                    aria-label="Ny tildeling"
                    color={"primary"}
                    endIcon={<Add/>}
                    component={Link}
                    to={`tildeling`}
                    onClick={handleClick}
                >
                    Ny tildeling
                </Button>
            </Box>
            <Paper>
                <FormGroup row>
                </FormGroup>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    id={'entraId'}
                                    primary={resourceDetails?.identityProviderGroupName}
                                    secondary={'Gruppenavn Entra ID'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    id={'resourceId'}
                                    primary={resourceDetails?.resourceId}
                                    secondary={'KildesystemId'}
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
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                            {/*  <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.resourceLimit}
                                    secondary={'Totalt antall til tildeling'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.resourceLimit}
                                    secondary={'Antall brukt av denne ressursen'}
                                />
                            </ListItem>*/}
                            <ListItem>
                                <ListItemText
                                    primary={resourceDetails?.accessType}
                                    secondary={'Tilgangstype'}
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