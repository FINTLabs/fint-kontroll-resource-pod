import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Alert, Box, Button, TableFooter, TablePagination} from "@mui/material";
import {ResourceContext} from "../../context";
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from "../main/TableFooter";
import {useParams} from "react-router-dom";
import DeleteDialog from "../details/DeleteDialog";

export const AssignmentsTable: any = (props: { resourceId: string, assignId: number, userId: string }) => {

    const {
        selected,
        searchString,
        assignmentPage,
        assignmentSize,
        setAssignmentSize,
        currentAssignmentPage,
        updateCurrentAssignmentPage,
        deleteAssignment,
        getAssignmentPage,
        deleted,
        setDeleted,
    } = useContext(ResourceContext);

    const {id} = useParams<string>();
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    // const [assignedRoleToRemove, setAssignedRoleToRemove] = useState<number | undefined>(undefined)
    const [assignmentToRemove, setAssignmentToRemove] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (id) {
            getAssignmentPage(parseInt(id));
            console.log(id, 'id her')
        }
        setUpdatingAssignment(false)
        // eslint-disable-next-line
    }, [id, currentAssignmentPage, assignmentSize, updatingAssignment, selected, searchString])

    const deleteAssignmentById = (assignmentId: number) => {
        setDeleteDialogOpen(true)
        setAssignmentToRemove(assignmentId)

        setTimeout(() => {
            setDeleted(null)
        }, 5000)

    }

    const assignmentsByResourceId = () => {
         return assignmentPage?.assignments.filter((el) => id === el.resourceRef.toString())
    }

    const counter = () => {
        const count = assignmentsByResourceId()?.length;
        if (count !== undefined) {
            return count
        }
        return 0;
    }

    const onRemoveAssignmentConfirmed = () => {
        setDeleteDialogOpen(false)
        setUpdatingAssignment(true)

        const assignments = assignmentPage?.assignments.filter((el) => el.id === assignmentToRemove);
        if (assignments && assignments.length > 0) {
            deleteAssignment(assignments[0].id)
        }
    };

    const onRemoveAssignmentCancel = () => {
        setDeleteDialogOpen(false)
        setAssignmentToRemove(undefined)
    };
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
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
            {deleted && (
                <Alert severity="success">{deleted}</Alert>
            )}

            <TableContainer sx={{minWidth: 1040, maxWidth: 1920}} id={"roleAssignmentTable"}>
                <Table aria-label="Assignment-table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Tildelt til</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Tildelt av</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Ressurs</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {
                            assignmentPage?.assignments.map((assignment) => (

                                <TableRow
                                    key={assignment.id}
                                    hover={true}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >

                                    <TableCell align="left" component="th" scope="row">
                                        {assignment.userDisplayname === null || assignment.userDisplayname.includes("null null")
                                            ?
                                            assignment.roleRef
                                            :
                                            assignment.userDisplayname}
                                    </TableCell>
                                    <TableCell align="left">{assignment.assignerUsername}</TableCell>
                                    <TableCell align="left">{assignment.resourceName}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            id={`buttonDeleteRoleAssignment-${assignment.id}`}
                                            variant={"outlined"}
                                            aria-label="Slett ressurs"
                                            color={"error"}
                                            endIcon={<DeleteIcon/>}
                                            sx={{marginLeft: 2}}
                                            onClick={() => deleteAssignmentById(assignment.id)}
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
                               // count={assignmentPage ? assignmentPage.totalItems : 0}
                                count={assignmentPage ? counter() : 0}
                                rowsPerPage={assignmentSize}
                                page={currentAssignmentPage}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                    autoComplete: "off",
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