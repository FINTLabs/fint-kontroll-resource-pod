import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props: {
    open: boolean,
    assignId: number,
    userId: string,
    onConfirm: () => void,
    onCancel: () => void,

}) => {

    return (
        <div>
            <Dialog
                id="delete-dialog"
                open={props.open}
                onClose={props.onConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Er du sikker på at du ønsker å trekke tilgangen på ressursen?"}
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText id="alert-dialog-description">
                        Er du sikker på at du vil fjerne {props.userFullName}?
                    </DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onCancel}>Avbryt</Button>
                    <Button id="delete-button" color={"error"} onClick={props.onConfirm} autoFocus>
                        Slett
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;