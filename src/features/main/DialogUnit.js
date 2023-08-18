import React, {useContext} from "react";
import {Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {ResourceContext} from "../../context";

const DialogUnit = ({open, onClose}) => {

    const {unitTree, selected, setSelected} = useContext(ResourceContext);

    const customDialogStyle = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };
    const handleClose = () => {
        onClose(setSelected([]))
    };

    const handleSave = () => {
        onClose(selected);
    };

    const renderTree = (nodes) => {

        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.organisationUnitId}
                label={
                    <React.Fragment>
                        <Checkbox
                            id={`node-${nodes.organisationUnitId}`}
                            checked={selected.indexOf(nodes.organisationUnitId) !== -1}
                            onClick={(event) => {
                                event.stopPropagation();
                                const newSelected = selected.includes(nodes.organisationUnitId)
                                    ? selected.filter((id) => id !== nodes.organisationUnitId)
                                    : [...selected, nodes.organisationUnitId];
                                setSelected(newSelected);
                            }}
                        />
                        {nodes.name}
                    </React.Fragment>
                }
            >
                {Array.isArray(nodes.childrenRef)
                    ? nodes.childrenRef.map((nodeId) => {
                        const node = unitTree.orgUnits.find(
                            (n) => n.organisationUnitId === nodeId
                        );
                        if (node) {
                            return renderTree(node, nodes.organisationUnitId);
                        }
                        return null;
                    })
                    : null}
            </TreeItem>
        );
    };

    return (
        <Dialog id={'unitsSelectDialog'} open={open} onClose={handleClose} sx={{'& .MuiPaper-root': customDialogStyle}}>
            <DialogTitle>Velg enhet(er)</DialogTitle>
            <DialogContent>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon id={'expandMoreIcon'}/>}
                    defaultExpandIcon={<ChevronRightIcon id={'expandIcon'}/>}
                >
                    {unitTree?.orgUnits?.map((node) => {
                        if (node.parentRef !== node.organisationUnitId) {
                            console.log('Herehere', renderTree(node))
                            return null;
                        }
                        return renderTree(node);
                    })}
                </TreeView>
            </DialogContent>
            <DialogActions>
                <Button id={'regretDialog'} onClick={handleClose}>Avbryt</Button>
                <Button id={'closeDialog'} onClick={handleSave}>Lagre</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogUnit;