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
    onConfirm: () => void,
    onCancel: () => void,
}) => {

    return (
        <React.Fragment>
            <Dialog
                id="assign-dialog"
                open={props.open}
                onClose={props.onCancel}
                aria-labelledby="assign-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown={true}
            >
                <DialogTitle id="assign-dialog-title">
                    {"Fullfør tildelingen"}
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
                    <DialogContentText id="assign-dialog-description">
                        Trykk lagre for å bekrefte tildelingen av ressursen
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{margin: "1em"}}>
                    <Button variant={"outlined"} onClick={props.onCancel}>Avbryt</Button>
                    <Button variant={"contained"} id="assign-button" onClick={props.onConfirm}
                            autoFocus>
                        Lagre
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AlertDialog;