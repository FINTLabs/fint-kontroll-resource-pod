import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogContentText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const AlertDialog = (props: {
    open: boolean,
    assignId: number,
    userId: string,
    onConfirm: () => void,
    onCancel: () => void,

}) => {

    return (
        <React.Fragment>
            <Dialog
                id="delete-dialog"
                open={props.open}
                onClose={props.onConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Trekke tilgang?"}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.onCancel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Er du sikker på at du ønsker å trekke tilgangen til denne ressursen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{margin: "1em"}}>
                    <Button variant={"outlined"} onClick={props.onCancel}>Avbryt</Button>
                    <Button variant={"contained"} id="delete-button" color={"error"} onClick={props.onConfirm}
                            autoFocus>
                        Slett
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AlertDialog;