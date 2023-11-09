import React, {useContext, useState} from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {TreeView} from '@mui/x-tree-view/TreeView';
import {TreeItem} from '@mui/x-tree-view/TreeItem';
import {ResourceContext} from '../../context/ResourceContext';
import {IUnitItem} from "../../context/types";

interface DialogUnitProps {
    open: boolean;
    onClose: () => void;
}

function UnitSelectDialog({open, onClose}: DialogUnitProps) {
    const {unitTree, selectedOrgUnits, setSelectedOrgUnits} = useContext(ResourceContext);
    const [aggregated, setAggregated] = useState(false);

    const customDialogStyle: React.CSSProperties = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleClose = () => {
        onClose();
    };

    const toggleOrgUnit = (orgUnit: IUnitItem) => {
        const isSelected = selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId);
        let newSelected;

        if (isSelected) {
            // If the orgUnit is already selected, remove it
            newSelected = selectedOrgUnits.filter(unit => unit.organisationUnitId !== orgUnit.organisationUnitId);
        } else {
            // If the orgUnit is not selected, add it (if it doesn't already exist)
            if (!selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected = [...selectedOrgUnits, orgUnit];
            } else {
                // It's already in the selectedOrgUnits array, no need to do anything
                newSelected = selectedOrgUnits;
            }
        }
        console.log(newSelected, 'Valgte')
        setSelectedOrgUnits(newSelected);
    };

    const handleAggregationToggle = () => {
        setAggregated(!aggregated);
    };

    const handleCheckboxClick = (orgUnit: IUnitItem) => {

        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit);
        } else {
            toggleOrgUnit(orgUnit);
        }
    };

    const toggleOrgUnitAndChildren = (orgUnit: IUnitItem) => {
        const isSelected = selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId);
        let newSelected = [...selectedOrgUnits];

        // Toggle the selectedOrgUnit
        if (isSelected) {
            newSelected = selectedOrgUnits.filter(unit => unit.organisationUnitId !== orgUnit.organisationUnitId);
        } else {
            if (!selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected.push(orgUnit);
            }
        }

        // Toggle the children
        const childrenOrgUnits = findChildrenOrgUnits(orgUnit);
        for (const childOrgUnit of childrenOrgUnits) {
            if (isSelected) {
                newSelected = newSelected.filter(unit => unit.organisationUnitId !== childOrgUnit.organisationUnitId);
            } else {
                if (!newSelected.some(unit => unit.organisationUnitId === childOrgUnit.organisationUnitId)) {
                    newSelected.push(childOrgUnit);
                }
            }
        }
        setSelectedOrgUnits(newSelected);
    };

    const findChildrenOrgUnits = (orgUnit: IUnitItem): IUnitItem[] => {
        const childrenOrgUnits: IUnitItem[] = [];

        const findChildren = (node: IUnitItem) => {
            if (Array.isArray(node.childrenRef)) {
                for (const nodeId of node.childrenRef) {
                    const childNode = unitTree?.orgUnits.find((n) => n.organisationUnitId === nodeId.toString());
                    if (childNode) {
                        childrenOrgUnits.push(childNode);
                        findChildren(childNode);
                    }
                }
            }
        };

        findChildren(orgUnit);
        return childrenOrgUnits;
    };

    const renderTree = (nodes: IUnitItem) => {
        return (
            <TreeItem
                key={nodes.organisationUnitId}
                nodeId={nodes.organisationUnitId.toString()}
                label={
                    <React.Fragment>
                        <Checkbox
                            id={`node-${nodes.organisationUnitId}`}
                            checked={selectedOrgUnits.some(unit => unit.organisationUnitId === nodes.organisationUnitId)}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCheckboxClick(nodes)
                            }}
                        />
                        {nodes.name}
                    </React.Fragment>
                }
            >
                {Array.isArray(nodes.childrenRef)
                    ? nodes.childrenRef.map((nodeId: number) => {
                        const node = unitTree?.orgUnits.find(
                            (n) => n.organisationUnitId === nodeId.toString()
                        );
                        if (node) {
                            return renderTree(node);
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
                <div>
                    <FormControlLabel
                        control={<Switch/>}
                        label="Aggregated"
                        checked={aggregated}
                        onChange={handleAggregationToggle}
                        id="aggregatedCheckbox"
                    />

                </div>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon id={'expandMoreIcon'}/>}
                    defaultExpandIcon={<ChevronRightIcon id={'expandIcon'}/>}
                >
                    {unitTree?.orgUnits?.map((node: any) => {
                        if (node.parentRef !== node.organisationUnitId) {
                            return null;
                        }
                        return renderTree(node);
                    })}
                </TreeView>
            </DialogContent>
            <DialogActions>
                <Button id={'closeDialog'} onClick={onClose}>Ferdig</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UnitSelectDialog;


/*
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

export default DialogUnit;*/
