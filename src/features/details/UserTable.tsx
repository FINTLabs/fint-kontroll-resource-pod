import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button} from "@mui/material";
import {ResourceContext} from "../../context";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {contextDefaultValues, ICreateAssignment, IUserItem} from "../../context/types";
import {Done} from "@mui/icons-material";
import DeleteDialog from "./DeleteDialog";

export const UserTable: any = (props: { resourceId: string, assignId: number, userId: number, userFullName: string}) => {

    const {
        searchValue,
        basePath,
        page,
        createAssignment,
        deleteAssignment,
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

    const assign = (resourceRef: string, userRef: string, organizationUnitId: string = '36'): void => {
        setUpdatingAssignment(true)
        createAssignment(resourceRef, userRef, organizationUnitId);
        searchValue("");
    };


     const isAssigned = (userId: string) => {
         return assignments.filter((el) => el.userRef === userId).length > 0;
     }

    const deleteAssignmentByUserId = (userId: string) => {
        setDeleteDialogOpen(true)
        setAssignedUserToRemove(userId)

    }


    // const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    // ) => {
    //     console.log("new page:", newPage)
    //     updateCurrentPage(newPage)
    // };
    //
    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setSize(parseInt(event.target.value, 10));
    //     updateCurrentPage(0);
    // };

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
                                <TableCell align="left" component="th" scope="row">
                                    {user.fullName}
                                </TableCell>
                                <TableCell align="left">{user.userType}</TableCell>

                                <TableCell align="right">
                                    <Button
                                        id={`iconAddResource-${user.id}`}
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
                                            id={`iconAddResource-${user.id}`}
                                            variant={"text"}
                                            aria-label="Slett ressurs"
                                            color={"error"}
                                            endIcon={<DeleteIcon/>}
                                            sx={{marginLeft: 2}}
                                            onClick={() => deleteAssignmentByUserId(user.id.toString())}
                                        >
                                            slett
                                        </Button> : ''}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};