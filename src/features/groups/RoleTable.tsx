import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button, Icon, TableFooter, TablePagination} from "@mui/material";
import {ResourceContext} from "../../context";
import axios from "axios";
import {ICreateRoleAssignment} from "../../context/types";
import {Add, Check} from "@mui/icons-material";
import TablePaginationActions from "../main/TableFooter";
import {useBasePath} from "../../context/BasePathContext";
import AssignDialog from "../assignment/AssignDialog";
import Typography from "@mui/material/Typography";

export const RoleTable: any = (props: { resourceId: number, assignId: number, roleId: number }) => {

    const {
        searchValue,
        rolePage,
        roleSize,
        setRoleSize,
        currentRolePage,
        createRoleAssignment,
        updateCurrentRolePage,
    } = useContext(ResourceContext);

    const [createAssignments, setCreateAssignments] = useState<ICreateRoleAssignment[]>([]);
    const [updatingAssignment, setUpdatingAssignment] = useState<boolean>(false)
    const [assignDialogOpen, setAssignDialogOpen] = useState<boolean>(false)

    const basePath = useBasePath() || '';


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

    const assign = (resourceRef: number, roleRef: number, organizationUnitId: string): void => {
        setAssignDialogOpen(true)
        createRoleAssignment(resourceRef, roleRef, organizationUnitId);
        searchValue("");
    };

    const isAssigned = (roleId: number) => {
        return createAssignments
            .filter((el) => el.roleRef === roleId)
            .filter((el) => el.resourceRef === props.resourceId)
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

    const onAssignmentConfirmed = () => {
        setAssignDialogOpen(false)
        setUpdatingAssignment(true)
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

                                        /*<Button
                                            id={`buttonIsAssignedRole-${roles.id}`}
                                            variant={"text"}
                                            aria-label="Legg til ressurs"
                                            // onClick={() => assign(props.resourceId, roles.id, roles.organisationUnitId)}
                                            color={"primary"}
                                            endIcon={<Check/>}
                                            disabled={isAssigned(roles.id)}
                                        >
                                            Tildelt
                                        </Button>*/
                                        :
                                        <Button
                                            id={`buttonAddAssignmentRole-${roles.id}`}
                                            variant={"outlined"}
                                            aria-label="Tildel ressurs"
                                            onClick={() => assign(props.resourceId, roles.id, roles.organisationUnitId)}
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