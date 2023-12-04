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
import {IRole} from "../../context/types";
import {Add, Check} from "@mui/icons-material";
import TablePaginationActions from "../main/TableFooter";
import {useBasePath} from "../../context/BasePathContext";
import AssignDialog from "../assignment/AssignDialog";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";

export const RoleTable: any = (props: { resourceId: number, assignId: number, roleId: number }) => {

    const {
        // searchValue,
        rolePage,
        roleSize,
        setRoleSize,
        currentRolePage,
        createRoleAssignment,
        updateCurrentRolePage,
        assigned,
        setAssigned,
        error,
        setError,
    } = useContext(ResourceContext);

    const [isRoleAssigned, setIsRoleAssigned] = useState<IRole[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [assignDialogOpen, setAssignDialogOpen] = useState<boolean>(false)
    const [roleId, setRoleId] = useState<number>(0)
    const [orgId, setOrgId] = useState<string>('')
    const {id} = useParams<string>();

    const basePath = useBasePath() || '';


    useEffect(() => {
        const refreshAssignments = () => {
            if (id) {
                axios.get(`${basePath === '/' ? '' : basePath}/api/assignments/resource/${id}/roles`)
                    .then(response => {
                        setIsRoleAssigned(response.data.roles);
                    })
            }
        }
        setUpdatingAssignment(false)
        refreshAssignments()
    }, [updatingAssignment, basePath, id])

    const assign = (resourceRef: number, roleRef: number, organizationUnitId: string): void => {
        createRoleAssignment(resourceRef, roleRef, organizationUnitId);
        setTimeout(() => {
            setAssigned(null)
            setError(null)
        }, 5000)
    };

    const roleToAssign = (resourceRef: number, roleId: number, orgId: string) => {
        setRoleId(roleId)
        setOrgId(orgId)
        setAssignDialogOpen(true)
    }

    const onAssignmentConfirmed = () => {
        assign(props.resourceId, roleId, orgId)
        setAssignDialogOpen(false)
        setUpdatingAssignment(true)
    };

    const isAssigned = (roleId: number) => {
        return isRoleAssigned
            .filter((el) => el.id === roleId)
            //.filter((el) => el.resourceRef === Number(id))
            .length > 0;

    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        updateCurrentRolePage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRoleSize(parseInt(event.target.value, 10));
        updateCurrentRolePage(0);
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
            <TableContainer sx={{minWidth: 1040, maxWidth: 1920}} id={"roleTable"}>
                <Table aria-label="Role-assignment-table">
                    <TableHead>
                        <TableRow sx={{fontWeight: 'bold'}}>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Gruppe</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Gruppetype</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Organisasjon</TableCell>
                            <TableCell align="left" sx={{fontWeight: 'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rolePage?.roles.map((roles) => (
                            <TableRow
                                key={roles.id}
                                hover={true}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {roles.roleName}
                                </TableCell>
                                <TableCell align="left">{roles.roleType}</TableCell>
                                <TableCell align="left">{roles.organisationUnitName}</TableCell>

                                <TableCell align="right">
                                    {isAssigned(roles.id) ?
                                        <Box>
                                            <Typography sx={{fontSize: 16, fontWeight: 600}} color="secondary.dark">
                                                Tildelt
                                                <Icon fontSize={"small"} sx={{ml: 1}}><Check/></Icon>
                                            </Typography>
                                        </Box>
                                        :
                                        <Button
                                            id={`buttonAddAssignmentRole-${roles.id}`}
                                            variant={"outlined"}
                                            aria-label="Tildel ressurs"
                                            onClick={() => roleToAssign(props.resourceId, roles.id, roles.organisationUnitId)}
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
                                id={"paginationRole"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={7}
                                count={rolePage ? rolePage.totalItems : 0}
                                rowsPerPage={roleSize}
                                page={currentRolePage}
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