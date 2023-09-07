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
import axios from "axios";
import {IAssignment, ICreateAssignment} from "../../context/types";
import {Done} from "@mui/icons-material";
import DeleteDialog from "./DeleteDialog";
import TablePaginationActions from "./UserTableFooter";

export const UserTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
        searchValue,
        basePath,
       // page,
        assignmentPage,
        createAssignment,
        deleteAssignment,
        updateCurrentAssignmentPage,
        //updateCurrentUserPage,
        size,
        setSize,
        currentAssignmentPage,
       // currentUserPage,
    } = useContext(ResourceContext);

    const [createAssignments, setCreateAssignments] = useState<ICreateAssignment[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [assignedUserToRemove, setAssignedUserToRemove] = useState<number | undefined>(undefined)
    //const [assignments, setAssignments] = useState<IAssignment[]>([])

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

   /* const assign = (resourceRef: string, userRef: string, organizationUnitId: string = '36'): void => {
        setUpdatingAssignment(true)
        createAssignment(resourceRef, userRef, organizationUnitId);
        searchValue("");
    };*/

    const isAssigned = (assignId: number) => {
        return createAssignments
            //.filter((el) => el.userRef.toString() === userId)
            .filter((el) => el.resourceRef.toString() === props.resourceId)
            .length > 0;
    }

    const getAssignedUsers = () => {
        return assignmentPage?.assignments.filter((assignments) => isAssigned(assignments.id))
    }

    const deleteAssignmentById = (assignmentId: number) => {
        setDeleteDialogOpen(true)
        setAssignedUserToRemove(assignmentId)
    }

    /*const deleteAssignmentByUserId = (userId: string) => {
        setDeleteDialogOpen(true)
        setAssignedUserToRemove(userId)
    }*/

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        updateCurrentAssignmentPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setSize(parseInt(event.target.value, 10));
        updateCurrentAssignmentPage(0);
    };

    const onRemoveAssignmentConfirmed = () => {
        setDeleteDialogOpen(false)

        setUpdatingAssignment(true)

        const userAssignments = createAssignments.filter((el) => el.id === assignedUserToRemove);
        if (userAssignments.length > 0) {
            deleteAssignment(userAssignments[0].id)
        }
        /*const userAssignments = createAssignments.filter((el) => el.userRef === assignedUserToRemove);
        if (userAssignments.length > 0) {
            deleteAssignment(userAssignments[0].id)
        }*/
    };

    const onRemoveAssignmentCancel = () => {
        setDeleteDialogOpen(false)
        setAssignedUserToRemove(undefined)
    };

    return (
        <Box>
            <DeleteDialog open={deleteDialogOpen} assignId={0} onConfirm={onRemoveAssignmentConfirmed}
                          onCancel={onRemoveAssignmentCancel}/>
            <TableContainer sx={{minWidth: 1040, maxWidth: 1536}} id={"userTable"}>
                <Table aria-label="Users-table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Navn userRef</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>resourceRef</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getAssignedUsers()?.map((assignments) => (
                            <TableRow
                                key={assignments.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {assignments.userRef}
                                </TableCell>
                                <TableCell align="left">{assignments.resourceRef}</TableCell>

                                <TableCell align="right">
                                    {/*<Button
                                       // id={`buttonAddAssignment-${user.id}`}
                                        variant={"text"}
                                        aria-label="Legg til ressurs"
                                      //  onClick={() => assign(props.resourceId, user.id.toString(), "36")}
                                        color={"primary"}
                                        endIcon={<Done/>}
                                       // disabled={isAssigned(user.id.toString())}
                                    >
                                      Testing  {isAssigned(user.id.toString()) ? 'Tildelt' : 'Tildel'}
                                    </Button>*/}


                                        <Button
                                          //  id={`buttonDeleteAssignment-${user.id}`}
                                            variant={"text"}
                                            aria-label="Slett ressurs"
                                            color={"error"}
                                            endIcon={<DeleteIcon/>}
                                            sx={{marginLeft: 2}}
                                            onClick={() => deleteAssignmentById(assignments.id)}
                                        >

                                            Slett

                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>


                    {/*<TableHead>
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
                                        endIcon={<Done/>}
                                        disabled={isAssigned(user.id.toString())}
                                    >
                                        {isAssigned(user.id.toString()) ? 'Tildelt' : 'Tildel'}
                                    </Button>

                                    {isAssigned(user.id.toString()) ?
                                        <Button
                                            id={`buttonDeleteAssignment-${user.id}`}
                                            variant={"text"}
                                            aria-label="Slett ressurs"
                                            color={"error"}
                                            endIcon={<DeleteIcon/>}
                                            sx={{marginLeft: 2}}
                                            onClick={() => deleteAssignmentByUserId(user.id.toString())}
                                        >

                                            Slett

                                        </Button> : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>*/}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                id={"pagination"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={assignmentPage ? assignmentPage.totalItems : 0}
                                rowsPerPage={size}
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