import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Alert, Box, Button, Icon, TableFooter, TablePagination} from "@mui/material";
import {ResourceContext} from "../../context";
import axios from "axios";
import {IUserItem} from "../../context/types";
import {Add, Check} from "@mui/icons-material";
import TablePaginationActions from "../main/TableFooter";
import {useBasePath} from "../../context/BasePathContext";
import AssignDialog from "../assignment/AssignDialog";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";

export const UserTable: any = (props: { resourceId: number, assignId: number, userId: number }) => {

    const {
        page,
        createUserAssignment,
        updateCurrentUserPage,
        size,
        setSize,
        currentUserPage,
        assigned,
        setAssigned,
        error,
        setError,
    } = useContext(ResourceContext);

    const [createAssignments, setCreateAssignments] = useState<IUserItem[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [assignDialogOpen, setAssignDialogOpen] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>(0)
    const [orgId, setOrgId] = useState<string>('')
    const {id} = useParams<string>()

    const basePath = useBasePath() || '';


    useEffect(() => {
        const refreshAssignments = () => {
            if (id) {
                axios.get(`${basePath === '/' ? '' : basePath}/api/assignments/resource/${id}/users`)
                    .then(response => {
                        setCreateAssignments(response.data.users);
                    })
            }
        }
        setUpdatingAssignment(false)
        refreshAssignments()
    }, [updatingAssignment, basePath, id])

    const assign = (resourceRef: number, userRef: number, organizationUnitId: string): void => {
        createUserAssignment(resourceRef, userRef, organizationUnitId);
        setTimeout(() => {
            setAssigned(null)
            setError(null)
        }, 5000)
    };

    const userToAssign = (resourceRef: number, userId: number, orgId: string) => {
        setUserId(userId)
        setOrgId(orgId)
        setAssignDialogOpen(true)
    }

    const onAssignmentConfirmed = () => {
        assign(props.resourceId, userId, orgId)
        setAssignDialogOpen(false)
        setUpdatingAssignment(true)
    };

    const isAssigned = (userId: number) => {
        return createAssignments
            .filter((el) => el.id === userId)
            // .filter((el) => el.resourceRef === props.resourceId)
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

    const onAssignmentCancel = () => {
        setAssignDialogOpen(false)
        setUpdatingAssignment(false)
    };

    return (
        <Box>
            <AssignDialog open={assignDialogOpen}
                          onConfirm={() => onAssignmentConfirmed()}
                          onCancel={onAssignmentCancel}/>
            {assigned && (
                <Alert severity="success">{assigned}</Alert>
            )}
            {error && (
                <Alert severity="error">{error}</Alert>
            )}
            <TableContainer sx={{minWidth: 1040, maxWidth: 1920}} id={"userAssignmentTable"}>
                <Table aria-label="Users-table">
                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Navn</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Brukertype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Organisasjon</TableCell>
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
                                <TableCell align="left">{user.organisationUnitName}</TableCell>

                                <TableCell align="right">
                                    {isAssigned(user.id) ?
                                        <Box>
                                            <Typography sx={{fontSize: 16, fontWeight: 600}} color="secondary.dark">
                                                Tildelt
                                                <Icon fontSize={"small"} sx={{ml: 1}}><Check/></Icon>
                                            </Typography>
                                        </Box>
                                        :
                                        <Button
                                            id={`buttonAddAssignment-${user.id}`}
                                            variant={"outlined"}
                                            aria-label="Tildel ressurs"
                                            onClick={() => userToAssign(props.resourceId, user.id, user.organisationUnitId)}
                                            color={"primary"}
                                            endIcon={<Add/>}
                                        >
                                            Tildel
                                        </Button>
                                    }
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