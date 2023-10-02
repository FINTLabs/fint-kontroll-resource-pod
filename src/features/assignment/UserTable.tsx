import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button, TableFooter, TablePagination} from "@mui/material";
import {ResourceContext} from "../../context";
import axios from "axios";
import {ICreateAssignment} from "../../context/types";
import {Add} from "@mui/icons-material";
import TablePaginationActions from "../details/UserTableFooter";

export const UserTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
        searchValue,
        basePath,
        page,
        createAssignment,
        updateCurrentUserPage,
        size,
        setSize,
        currentUserPage,
    } = useContext(ResourceContext);

    const [createAssignments, setCreateAssignments] = useState<ICreateAssignment[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)

    useEffect(() => {
        const refreshAssignments = () => {
            axios.get(`${basePath === '/' ? '' : basePath}/api/assignments`)
                .then(response => {
                    setCreateAssignments(response.data.assignments);
                })
        }
        setUpdatingAssignment(false)
        refreshAssignments()
    }, [updatingAssignment, basePath])

    const assign = (resourceRef: string, userRef: string, organizationUnitId: string = '36'): void => {
        setUpdatingAssignment(true)
        createAssignment(resourceRef, userRef, organizationUnitId);
        searchValue("");
    };

    const isAssigned = (userId: string) => {
        return createAssignments
            .filter((el) => el.userRef.toString() === userId)
            .filter((el) => el.resourceRef.toString() === props.resourceId)
            .length > 0;
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        updateCurrentUserPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setSize(parseInt(event.target.value, 10));
        updateCurrentUserPage(0);
    };

    return (
        <Box>
            <TableContainer sx={{minWidth: 1040, maxWidth: 1536}} id={"userTable"}>
                <Table aria-label="Users-table">
                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Navn</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Brukertype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {page?.users.map((user) => (
                            <TableRow
                                key={user.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {user.fullName}
                                </TableCell>
                                <TableCell align="left">{user.userType}</TableCell>

                                <TableCell align="right">
                                    <Button
                                        id={`buttonAddAssignment-${user.id}`}
                                        variant={"text"}
                                        aria-label="Legg til ressurs"
                                        onClick={() => assign(props.resourceId, user.id.toString(), "36")}
                                        color={"primary"}
                                        endIcon={<Add/>}
                                        disabled={isAssigned(user.id.toString())}
                                    >
                                        {isAssigned(user.id.toString()) ? 'Tildelt' : 'Tildel'}
                                    </Button>

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
                                count={page ? page.totalItems : 0}
                                rowsPerPage={size}
                                page={currentUserPage}
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