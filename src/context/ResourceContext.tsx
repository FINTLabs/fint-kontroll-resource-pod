import React, {createContext, ReactNode, useEffect, useState,} from "react";
import {
    contextDefaultValues,
    IResource,
    IOrgUnit,
    IOrgUnitPage,
    IUnitTree,
    ResourceContextState,
    IValidForOrgUnit
} from "./types";
import ResourceRepository from "../repositories/ResourceRepository";

export const ResourceContext = createContext<ResourceContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const ResourceProvider = ({children}: Props) => {
    const [basePath, setBasePath] = useState<string>(contextDefaultValues.basePath);
    const [resources, setResources] = useState<IResource[] | null>(contextDefaultValues.resources);
    const [orgUnitPage] = useState<IOrgUnitPage | null>(contextDefaultValues.orgUnitPage);
    const [orgUnits] = useState<IOrgUnit[]>(contextDefaultValues.orgUnits);
    const [orgName, setOrgName] = useState<string>(contextDefaultValues.orgName);
    const [organisationUnitId, setOrganisationUnitId] = useState<number>(contextDefaultValues.organisationUnitId);
    const [unitTree, setUnitTree] = useState<IUnitTree | null>(contextDefaultValues.unitTree);
    const [selected, setSelected] = useState<number[]>(contextDefaultValues.selected);
    const [validForOrgUnits] = useState<IValidForOrgUnit[] | null>(contextDefaultValues.validForOrgUnits);


    useEffect(() => {
        const getBasePath = () => {
            ResourceRepository.getBaseUrl()
                .then(response => {
                        setBasePath(response.data.basePath)
                        console.log("basePath i context", response.data.basePath)
                    }
                )
                .catch((err) => {
                    console.error(err);
                })
        }
        getBasePath()
    }, [])

    useEffect(() => {
        const getResources = () => {
            if (basePath) {
                ResourceRepository.getResources(basePath)
                    .then(response => setResources(response.data))
                    .catch((err) => console.error(err))
            }
        }
        getResources()
    }, [basePath]);

    useEffect(() => {
        const getUnitTree = () => {
            if (basePath) {
                ResourceRepository.getUnitTree(basePath)
                    .then(response => {
                        console.log("Returned org data: ", response.data);
                        setUnitTree(response.data);
                    })
                    .catch((err) => console.error(err))
            }
        }
        getUnitTree();
    }, [basePath]);

    const updateOrganisationUnitId = (id: number) => {
        setOrganisationUnitId(id);
    }

    const getOrgName = (orgName: string) => {
        setOrgName(orgName)
    }

    return (
        <ResourceContext.Provider
            value={{
                validForOrgUnits,
                basePath,
                resources,
                orgUnits,
                orgName,
                orgUnitPage,
                organisationUnitId,
                unitTree,
                selected,
                getOrgName,
                updateOrganisationUnitId,
                setSelected,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};
export default ResourceProvider;