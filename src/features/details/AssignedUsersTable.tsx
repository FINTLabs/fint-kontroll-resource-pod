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
import DeleteDialog from "./DeleteDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from "./UserTableFooter";

export const AssignedUsersTable: any = (props: { resourceId: string, userId: number, userFullName: string }) => {

    const {
        size, currentUserPage, updateCurrentUserPage, searchValue, setSize, basePath, page, deleteAssignment,
    } = useContext(ResourceContext);

    const [assignments, setAssignments] = useState<ICreateAssignment[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [assignedUserToRemove, setAssignedUserToRemove] = useState<string | undefined>(undefined)

    useEffect(() => {
        refreshAssignments()
        setUpdatingAssignment(false)
    }, [updatingAssignment])

    const refreshAssignments = () => {
        axios.get(`${basePath === '/' ? '' : basePath}/api/assignments?size=1000`)
            .then(response => {
                setAssignments(response.data.assignments);
            })
    }


    const deleteAssignmentByUserId = (userId: string) => {
        setDeleteDialogOpen(true)
        setAssignedUserToRemove(userId)
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log("new page:", newPage)
        updateCurrentUserPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setSize(parseInt(event.target.value, 10));
        updateCurrentUserPage(0);
    };

    const onRemoveAssignmentConfirmed = () => {
        setDeleteDialogOpen(false)

        setUpdatingAssignment(true)
        console.log("assignedUserToRemove", assignedUserToRemove)

        const userAssignments = assignments.filter((el) => el.userRef === assignedUserToRemove);
        if (userAssignments.length > 0) {
            deleteAssignment(userAssignments[0].id)
        }

    };

    const onRemoveAssignmentCancel = () => {
        setDeleteDialogOpen(false)
        setAssignedUserToRemove(undefined)
    };

    const isAssigned = (userId: string) => {
        return assignments
            .filter((el) => el.userRef === userId)
            .filter((el) => el.resourceRef === props.resourceId)
            .length > 0;
    }

    return (
        <Box>
            <DeleteDialog open={deleteDialogOpen} userId={""} userFullName={""} onConfirm={onRemoveAssignmentConfirmed}
                          onCancel={onRemoveAssignmentCancel}/>
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
                                {isAssigned(user.id.toString()) ?
                                    <>
                                        <TableCell align="left" component="th" scope="row">
                                            {user.fullName}
                                        </TableCell>
                                        <TableCell align="left">
                                            {user.userType}
                                        </TableCell>
                                        <TableCell
                                            align="right">
                                            <Button
                                                id={`iconAddResource-${user.id}`}
                                                variant={"text"}
                                                aria-label="Slett ressurs"
                                                color={"error"}
                                                endIcon={<DeleteIcon/>}
                                                sx={{marginLeft: 2}}
                                                onClick={() => deleteAssignmentByUserId(user.id.toString())}
                                            >
                                                slett
                                            </Button>
                                        </TableCell>
                                    </>
                                    : ''}
                            </TableRow>

                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                id={"pagination"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
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