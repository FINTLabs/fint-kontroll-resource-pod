import * as React from 'react';
import {useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {SettingsRounded} from "@mui/icons-material";
import {Box, Tooltip} from "@mui/material";
import {ResourceContext} from "../../context";
import ToolBar from "./ToolBar";
import DialogUnit from "./DialogUnit";


export const ResourceTable: any = () => {

    const {resources} = useContext(ResourceContext);
    const [openDialog, setOpenDialog] = useState(false);

    const handleTypeSelect = () => {
        setOpenDialog(false);
        console.log("selected");
    }

    return (
        <Box>
            <DialogUnit
                onClose={handleTypeSelect}
                open={openDialog}
            />
            <TableContainer sx={{minWidth: 1040, maxWidth: 1536}} id={"resourceTable"}>
                <ToolBar onShowDialog={() => setOpenDialog(true)}/>
                <Table aria-label="resource-table">
                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Ressurs</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Type</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Antall</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources?.map((resources) => (
                            <TableRow
                                key={resources.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {resources.resourceName}
                                </TableCell>
                                <TableCell align="left">{resources.resourceType}</TableCell>
                                <TableCell align="left">{resources.resourceLimit}</TableCell>
                                <TableCell align="left">
                                    <Tooltip title={"Se detaljer"}>
                                        <IconButton>
                                            <SettingsRounded color={"primary"}/>
                                        </IconButton
                                        >
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};