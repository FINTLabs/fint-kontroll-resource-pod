import * as React from 'react';
import {useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {InfoOutlined} from "@mui/icons-material";
import {Box, Button, TableFooter, TablePagination} from "@mui/material";
import {ResourceContext} from "../../context";
import ToolBar from "./ToolBar";
import DialogUnit from "./DialogUnit";
import {Link} from "react-router-dom";
import TablePaginationActions from "./TableFooter";

export const ResourceTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
        resourcePage,
        resourceSize,
        setResourceSize,
        currentResourcePage,
        updateCurrentResourcePage,
        searchValue,
        selectedOrgUnits,
        setSelected
    } = useContext(ResourceContext);
    const [openDialog, setOpenDialog] = useState(false);

    const handleTypeSelect = () => {
        setOpenDialog(false);
        const orgunitIds = selectedOrgUnits.map(orgunit => orgunit.organisationUnitId);
        setSelected(orgunitIds);
    }

    const handleClick = (): void => {
        searchValue("");
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        updateCurrentResourcePage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setResourceSize(parseInt(event.target.value, 10));
        updateCurrentResourcePage(0);
    };

    return (
        <Box>
            <DialogUnit
                onClose={handleTypeSelect}
                open={openDialog}
            />
            <TableContainer sx={{minWidth: 1040, maxWidth: 1920}} id={"resourceTable"}>
                <ToolBar onShowDialog={() => setOpenDialog(true)}/>
                <Table aria-label="resource-table" role="main">
                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Ressurs</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Type</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Antall totalt</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Antall i bruk</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resourcePage?.resources
                            .map((resources) => (
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
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="right">
                                        <Button
                                            id={`iconResourceInfo-${resources.id}`}
                                            variant={"outlined"}
                                            aria-label="Se informasjon"
                                            component={Link}
                                            to={`info/${resources.id}`}
                                            onClick={handleClick}
                                            color={"primary"}
                                            endIcon={<InfoOutlined/>}
                                        >
                                            Se info
                                        </Button>

                                        {/*<Tooltip title={"Se detaljer"}>
                                            <IconButton
                                                id={`iconResourceInfo-${resources.id}`}
                                                aria-label="informasjon"
                                                component={Link}
                                                to={`info/${resources.id}`}
                                                onClick={handleClick}>
                                                <ArrowCircleRightOutlined color={"primary"}/>
                                            </IconButton>
                                        </Tooltip>*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                id={"pagination"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={7}
                                count={resourcePage ? resourcePage.totalItems : 0}
                                rowsPerPage={resourceSize}
                                page={currentResourcePage}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
};