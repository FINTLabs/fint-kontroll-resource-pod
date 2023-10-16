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
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "./DeleteDialog";
import TablePaginationActions from "../assignment/UserTableFooter";
import {useParams} from "react-router-dom";

export const AssignmentsTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
       // searchValue,
       // searchString,
        deleteAssignment,
        updateCurrentAssignmentPage,
        assignmentSize,
        setAssignmentSize,
        currentAssignmentPage,
        assignedUsersPage,
        getAssignmentsPage,
    } = useContext(ResourceContext);

    const {id} = useParams<string>();
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [assignedUserToRemove, setAssignedUserToRemove] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (id) {
            getAssignmentsPage(parseInt(id));
        }
        setUpdatingAssignment(false)
        // eslint-disable-next-line
    }, [id, currentAssignmentPage, assignmentSize, updatingAssignment])


    const deleteAssignmentById = (assignmentId: number) => {
        setDeleteDialogOpen(true)
        setAssignedUserToRemove(assignmentId)
    }

    const onRemoveAssignmentConfirmed = () => {
        setDeleteDialogOpen(false)
        setUpdatingAssignment(true)

        const userAssignments = assignedUsersPage?.users.filter((el) => el.assignmentRef === assignedUserToRemove);
        if (userAssignments && userAssignments.length > 0) {
            deleteAssignment(userAssignments[0].assignmentRef)
        }
    };

    const onRemoveAssignmentCancel = () => {
        setDeleteDialogOpen(false)
        setAssignedUserToRemove(undefined)
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log("new page:", newPage)
        updateCurrentAssignmentPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setAssignmentSize(parseInt(event.target.value, 10));
        updateCurrentAssignmentPage(0);
    };

    return (
        <Box>
            <DeleteDialog open={deleteDialogOpen} userId={""} assignId={0}
                          onConfirm={() => onRemoveAssignmentConfirmed()}
                          onCancel={onRemoveAssignmentCancel}/>
            <TableContainer sx={{minWidth: 1040, maxWidth: 1536}} id={"userTable"}>
                <Table aria-label="Users-table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Navn</TableCell>
                            {/*<TableCell align="left" sx={{fontWeight: 'bold'}}>resourceRef</TableCell>*/}
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Brukertype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Gruppetype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Tildelt av</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignedUsersPage?.users.map((users) => (
                            <TableRow
                                key={users.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {users.firstName} {users.lastName}
                                </TableCell>
                                <TableCell align="left">{users.userType} </TableCell>
                                <TableCell align="left">Hvis gruppe</TableCell>
                                <TableCell align="right">

                                    <Button
                                        //  id={`buttonDeleteAssignment-${user.id}`}
                                        variant={"text"}
                                        aria-label="Slett ressurs"
                                        color={"error"}
                                        endIcon={<DeleteIcon/>}
                                        sx={{marginLeft: 2}}
                                        onClick={() => deleteAssignmentById(users.assignmentRef)}
                                    >
                                        Slett
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                id={"paginationAssignment"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={7}
                                count={assignedUsersPage ? assignedUsersPage.totalItems : 0}
                                rowsPerPage={assignmentSize}
                                page={currentAssignmentPage}
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