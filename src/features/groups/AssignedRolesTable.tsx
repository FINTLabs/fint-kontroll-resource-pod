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
import TablePaginationActions from "../assignment/UserTableFooter";
import {useParams} from "react-router-dom";
import DeleteDialog from "../details/DeleteDialog";

export const AssignedRolesTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
        deleteAssignment,
        assignedRolesPage,
        assignedRoleSize,
        setAssignedRoleSize,
        currentAssignedRolePage,
        updateCurrentAssignedRolePage,
        getAssignedRolesPage,
    } = useContext(ResourceContext);

    const {id} = useParams<string>();
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [assignedRoleToRemove, setAssignedRoleToRemove] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (id) {
            getAssignedRolesPage(parseInt(id));
        }
        setUpdatingAssignment(false)
        // eslint-disable-next-line
    }, [id, currentAssignedRolePage, assignedRoleSize, updatingAssignment])

//TODO: Sjekk om funkjoner kan flyttes ut
    const deleteAssignmentById = (assignmentId: number) => {
        setDeleteDialogOpen(true)
        setAssignedRoleToRemove(assignmentId)
    }

    const onRemoveAssignmentConfirmed = () => {
        setDeleteDialogOpen(false)
        setUpdatingAssignment(true)

        const roleAssignments = assignedRolesPage?.roles.filter((el) => el.assignmentRef === assignedRoleToRemove);
        if (roleAssignments && roleAssignments.length > 0) {
            deleteAssignment(roleAssignments[0].assignmentRef)
        }
    };

    const onRemoveAssignmentCancel = () => {
        setDeleteDialogOpen(false)
        setAssignedRoleToRemove(undefined)
    };
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        updateCurrentAssignedRolePage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setAssignedRoleSize(parseInt(event.target.value, 10));
        updateCurrentAssignedRolePage(0);
    };

    return (
        <Box>
            <DeleteDialog open={deleteDialogOpen} userId={""} assignId={0}
                          onConfirm={() => onRemoveAssignmentConfirmed()}
                          onCancel={onRemoveAssignmentCancel}/>
            <TableContainer sx={{minWidth: 1040, maxWidth: 1536}} id={"roleAssignmentTable"}>
                <Table aria-label="Role-assignment-table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Gruppe</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Gruppetype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Tildelt av</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignedRolesPage?.roles.map((role) => (
                            <TableRow
                                key={role.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {role.roleName}
                                </TableCell>
                                <TableCell align="left">{role.roleType} </TableCell>
                                <TableCell align="right">
                                    <Button
                                        id={`buttonDeleteRoleAssignment-${role.id}`}
                                        variant={"text"}
                                        aria-label="Slett ressurs"
                                        color={"error"}
                                        endIcon={<DeleteIcon/>}
                                        sx={{marginLeft: 2}}
                                        onClick={() => deleteAssignmentById(role.assignmentRef)}
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
                                count={assignedRolesPage ? assignedRolesPage.totalItems : 0}
                                rowsPerPage={assignedRoleSize}
                                page={currentAssignedRolePage}
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