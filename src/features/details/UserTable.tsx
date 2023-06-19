import * as React from 'react';
import {useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button} from "@mui/material";
import {ResourceContext} from "../../context";


export const UserTable: any = () => {

    const {currentUserPage, searchValue, page} = useContext(ResourceContext);

    const handleClick = (): void => {
        searchValue("");
    };

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
                                        id={`iconAddResource-${user.id}`}
                                        variant={"outlined"}
                                        aria-label="Legg til ressurs"
                                        // component={Link}
                                        // to={``}
                                        onClick={handleClick}
                                        color={"primary"}
                                    >
                                        Tildel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};