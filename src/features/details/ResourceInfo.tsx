import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import {FlutterDash} from "@mui/icons-material";
import {ResourceContext} from "../../context";

function UserInfo() {

    const {resources, resourceItem, resourceDetails} = useContext(ResourceContext);

    return (
        <Box sx={{flexGrow: 1, maxWidth: 752}}>
            <FormGroup row>
            </FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                id={'resourceName'}
                                primary={resourceDetails?.resourceName}
                                secondary={'Ressurs'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                id={'userNameText'}
                                 primary={resourceDetails?.resourceLimit}
                                secondary={'Ressurstype'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                id={'orgUnitText'}
                                 primary={resourceDetails?.resourceName}
                                secondary={'Applikasjonstilgangstype'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                 // primary={userDetailed?.mobilePhone}
                                secondary={'Tilgangsrolle'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                // primary={userDetailed?.email}
                                secondary={'Tilgangstype'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                // primary={userDetailed?.email}
                                secondary={'Plattform'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    border: '1px solid #4b727a',
                                    backgroundColor: 'transparent'
                                }}>
                                    {<FlutterDash sx={{color: '#4b727a'}}/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                // primary={userDetailed?.email}
                                secondary={'Ressurseier-organisasjon'}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserInfo;