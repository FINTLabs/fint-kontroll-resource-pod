import React, {createContext, ReactNode, useEffect, useState,} from "react";
import {
    contextDefaultValues,
    IAssignment,
    IAssignmentPage,
    IOrgUnit,
    IOrgUnitPage,
    IResource,
    IResourceItem,
    IResourcePage,
    IUnitTree,
    IUserItem,
    IUserPage,
    ResourceContextState
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
    const [validForOrgUnits] = useState<IResourceItem[] | null>(contextDefaultValues.validForOrgUnits);
    const [resourceItem] = useState<IResourceItem | null>(contextDefaultValues.resourceItem);
    const [resourceDetails, setResourceDetails] = useState<IResource | null>(contextDefaultValues.resourceDetails);
    const [resourcePage, setResourcePage] = useState<IResourcePage | null>(contextDefaultValues.resourcePage);
    const [currentPage] = useState<number>(contextDefaultValues.currentPage);
    const [searchString, setSearchString] = useState<string>("");
    const [users] = useState<IUserItem[]>(contextDefaultValues.users);
    const [page, setPage] = useState<IUserPage | null>(contextDefaultValues.page);
    const [userType, setUserType] = useState<string>(contextDefaultValues.userType);
    const [currentUserPage, setCurrentUserPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [isAggregate, setIsAggregate] = useState<boolean>(contextDefaultValues.isAggregate);
    const [assignmentPage, setAssignmentPage] = useState<IAssignmentPage | null>(contextDefaultValues.assignmentPage);
    const [assignments] = useState<IAssignment[] | null>(contextDefaultValues.assignments);
    const [currentAssignmentPage, setCurrentAssignmentPage] = useState<number>(contextDefaultValues.currentAssignmentPage);
    const [assignmentSize, setAssignmentSize] = useState<number>(contextDefaultValues.assignmentSize);

    const createAssignment = (resourceRef: string, userRef: string, organizationUnitId: string) => {
        // console.log("resourceRef:", resourceRef, "userRef:", userRef, "organizationUnitId:", organizationUnitId)

        ResourceRepository.createAssignment(basePath, resourceRef, userRef, organizationUnitId)
            .then(response => {
                    console.log("Dette er responsen", response)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    const deleteAssignment = (id: number) => {
        ResourceRepository.deleteAssignment(basePath, id)
            .then(response => {
                    console.log("Dette er responsen", response)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

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

    /*useEffect(() => {
        const getAssignments = () => {
            if (basePath) {
                ResourceRepository.getAssignments(basePath)
                    .then(response => setAssignments(response.data))
                    .catch((err) => console.error(err))
            }
        }
        getAssignments()
    }, [basePath]);*/

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

    const getResourceById = (uri: string) => {
        ResourceRepository.getResourceById(uri)
            .then(response => {
                    setResourceDetails(response.data)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        const getResourcePage = () => {
            if (basePath) {
                ResourceRepository.getResourcePage(basePath, currentPage, userType, selected, searchString, isAggregate)
                    .then(response => setResourcePage(response.data))
                    .catch((err) => console.error(err))
            }
        }

        if (searchString.length >= 3 || searchString.length === 0) {
            getResourcePage();
        }
    }, [basePath, currentPage, userType, organisationUnitId, searchString, selected, isAggregate]);

    useEffect(() => {
        const getAssignmentPage = () => {
            if (basePath) {
                ResourceRepository.getAssignmentPage(basePath, currentAssignmentPage, assignmentSize, userType)
                    .then(response => setAssignmentPage(response.data))
                    .catch((err) => console.error(err))
            }
        }
        getAssignmentPage();

    }, [basePath, currentAssignmentPage, assignmentSize, userType, selected]);


    useEffect(() => {
        const getUserPage = () => {
            if (basePath) {
                ResourceRepository.getUserPage(basePath, currentUserPage, size, userType, selected, searchString)
                    .then(response => setPage(response.data))
                    .catch((err) => console.error(err))
            }
        }

        if (searchString.length >= 3 || searchString.length === 0) {
            getUserPage();
        }
    }, [basePath, currentUserPage, size, userType, organisationUnitId, searchString, selected]);

    const updateOrganisationUnitId = (id: number) => {
        setOrganisationUnitId(id);
    }

    const getOrgName = (orgName: string) => {
        setOrgName(orgName)
    }

    const searchValue = (searchString: string) => {
        setSearchString(searchString)
    }

    const updateUserType = (userType: string) => {
        setUserType(userType)
    }

    const updateCurrentUserPage = (currentUserPage: number) => {
        setCurrentUserPage(currentUserPage)
    }

    const updateCurrentAssignmentPage = (currentAssignmentPage: number) => {
        setCurrentAssignmentPage(currentAssignmentPage)
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
                resourceItem,
                resourceDetails,
                resourcePage,
                currentPage,
                searchString,
                getResourceById,
                searchValue,
                users,
                userType,
                page,
                currentUserPage,
                size,
                setSize,
                updateUserType,
                updateCurrentUserPage,
                createAssignment,
                deleteAssignment,
                isAggregate,
                setIsAggregate,
                assignments,
                assignmentPage,
                currentAssignmentPage,
                updateCurrentAssignmentPage,
                assignmentSize,
                setAssignmentSize,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};
export default ResourceProvider;