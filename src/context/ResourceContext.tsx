import React, {createContext, ReactNode, useEffect, useState,} from "react";
import {
    contextDefaultValues,
    IAssignedRolesPage,
    IAssignedUsersPage,
    IOrgUnit,
    IOrgUnitPage,
    IResource,
    IResourceItem,
    IResourcePage,
    IRolePage,
    IUnitItem,
    IUnitTree,
    IUser,
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
    basePath: string;
};

const getInitialOrgUnit = () => {
    const selected = localStorage.getItem("selected");
    return selected ? JSON.parse(selected) : contextDefaultValues.selected
};

const ResourceProvider = ({children, basePath}: Props) => {
    // const [validForOrgUnits] = useState<IResourceItem[] | null>(contextDefaultValues.validForOrgUnits);
    const [orgUnitPage] = useState<IOrgUnitPage | null>(contextDefaultValues.orgUnitPage);
    const [orgUnits] = useState<IOrgUnit[]>(contextDefaultValues.orgUnits);
    const [orgName, setOrgName] = useState<string>(contextDefaultValues.orgName);
    const [organisationUnitId, setOrganisationUnitId] = useState<string>(contextDefaultValues.organisationUnitId);
    const [unitTree, setUnitTree] = useState<IUnitTree | null>(contextDefaultValues.unitTree);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>(contextDefaultValues.selectedOrgUnits);
    const [selected, setSelected] = useState<string[]>(getInitialOrgUnit);

    const [resourceItem] = useState<IResourceItem | null>(contextDefaultValues.resourceItem);
    const [resourceDetails, setResourceDetails] = useState<IResource | null>(contextDefaultValues.resourceDetails);
    const [resourcePage, setResourcePage] = useState<IResourcePage | null>(contextDefaultValues.resourcePage);
    const [resourceSize, setResourceSize] = useState<number>(contextDefaultValues.resourceSize);
    const [currentResourcePage, setCurrentResourcePage] = useState<number>(contextDefaultValues.currentResourcePage);
    const [searchString, setSearchString] = useState<string>("");

    const [users] = useState<IUserItem[]>(contextDefaultValues.users);
    const [userType, setUserType] = useState<string>(contextDefaultValues.userType);
    const [page, setPage] = useState<IUserPage | null>(contextDefaultValues.page);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [currentUserPage, setCurrentUserPage] = useState<number>(contextDefaultValues.currentUserPage);
    const [user] = useState<IUser | null>(contextDefaultValues.user);

    const [assignedUsersPage, setAssignedUsersPage] = useState<IAssignedUsersPage | null>(contextDefaultValues.assignedUsersPage);
    const [assignmentSize, setAssignmentSize] = useState<number>(contextDefaultValues.assignmentSize);
    const [currentAssignmentPage, setCurrentAssignmentPage] = useState<number>(contextDefaultValues.currentAssignmentPage);

    const [rolePage, setRolePage] = useState<IRolePage | null>(contextDefaultValues.rolePage);
    const [roleType, setRoleType] = useState<string>(contextDefaultValues.roleType);
    const [roleSize, setRoleSize] = useState<number>(contextDefaultValues.roleSize);
    const [currentRolePage, setCurrentRolePage] = useState<number>(contextDefaultValues.currentRolePage);

    const [assignedRolesPage, setAssignedRolesPage] = useState<IAssignedRolesPage | null>(contextDefaultValues.assignedRolesPage);
    const [assignedRoleSize, setAssignedRoleSize] = useState<number>(contextDefaultValues.assignedRoleSize);
    const [currentAssignedRolePage, setCurrentAssignedRolePage] = useState<number>(contextDefaultValues.currentAssignedRolePage);

    const [objectType, setObjectType] = useState<string>("")

    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        localStorage.setItem("selected", JSON.stringify(selected))
    }, [selected])

    const createUserAssignment = (resourceRef: number, userRef: number, organizationUnitId: string) => {
        console.log("resourceRef:", resourceRef, "userRef:", userRef, "organizationUnitId:", organizationUnitId)

        ResourceRepository.createUserAssignment(basePath, resourceRef, userRef, organizationUnitId)
            .then(response => {
                    // console.log("Dette er responsen", response)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    const createRoleAssignment = (resourceRef: number, roleRef: number, organizationUnitId: string) => {
        console.log("resourceRef:", resourceRef, "RolleRef ", roleRef, "organizationUnitId:", organizationUnitId)

        ResourceRepository.createRoleAssignment(basePath, resourceRef, roleRef, organizationUnitId)
            .then(response => {
                    // console.log("Dette er responsen", response)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    const deleteAssignment = (id: number) => {
        ResourceRepository.deleteAssignment(basePath, id)
            .then(response => {
                    console.log(response)
                }
            )
            .catch((err) => {
                const errorObject = new Error((err as Error).message);
                setError(errorObject.message);
                console.error(err);
            })
    }

    useEffect(() => {
        const getUnitTree = () => {
            // console.log(`Getting the units stree:`);
            if (basePath) {

                ResourceRepository.getUnitTree(basePath)
                    .then(response => {
                        console.log("Returned tree data: ", response.data);
                        setUnitTree(response.data);
                    })
                    .catch((err) => console.error(err))
            }
        }

        getUnitTree();
    }, [basePath]);

    const getResourceById = (id: number) => {
        ResourceRepository.getResourceById(id, basePath)
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
                ResourceRepository.getResourcePage(basePath, currentResourcePage, resourceSize, userType, selected, searchString)
                    .then(response => setResourcePage(response.data))
                    .catch((err) => console.error(err))
            }
        }

        if (searchString.length >= 3 || searchString.length === 0) {
            getResourcePage();
        }
    }, [basePath, currentResourcePage, resourceSize, userType, organisationUnitId, searchString, selected]);

    const getAssignedUsersPage = (id: number) => {
        if (basePath) {
            ResourceRepository.getAssignmentsPage(basePath, id, currentAssignmentPage, assignmentSize, userType, selected, searchString)
                .then(response => setAssignedUsersPage(response.data))
                .catch((err) => console.error(err))
        }
    }

    const getAssignedRolesPage = (id: number) => {
        if (basePath) {
            ResourceRepository.getAssignedRolesPage(basePath, id, roleType, currentAssignedRolePage, assignedRoleSize, selected, searchString)
                .then(response => setAssignedRolesPage(response.data))
                // .catch((err) => console.error(err))
                .catch((err) => {
                    const errorObject = new Error((err as Error).message);
                    setError(errorObject.message);
                    console.error(err);
                })
        }
    }

    useEffect(() => {
        const getRolePage = () => {
            if (basePath) {
                ResourceRepository.getRolePage(basePath, roleType, currentRolePage, roleSize, selected, searchString)
                    .then(response => setRolePage(response.data))
                    // .catch((err) => console.error(err))
                    .catch((err) => {
                        const errorObject = new Error((err as Error).message);
                        setError(errorObject.message);
                        console.error(err);
                    })
            }
        }
        if (searchString.length >= 3 || searchString.length === 0) {
            getRolePage()
        }
    }, [basePath, roleType, currentRolePage, roleSize, searchString, organisationUnitId, selected]);


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

    const updateOrganisationUnitId = (id: string) => {
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

    const updateCurrentResourcePage = (currentResourcePage: number) => {
        setCurrentResourcePage(currentResourcePage)
    }

    const updateCurrentRolePage = (currentRolePage: number) => {
        setCurrentRolePage(currentRolePage)
    }

    const updateRoleType = (roleType: string) => {
        setRoleType(roleType)
    }

    const updateCurrentAssignedRolePage = (currentAssignedRolePage: number) => {
        setCurrentAssignedRolePage(currentAssignedRolePage)
    }

    return (
        <ResourceContext.Provider
            value={{
                // validForOrgUnits,
                orgUnits,
                orgName,
                orgUnitPage,
                organisationUnitId,
                unitTree,
                selected,
                getOrgName,
                updateOrganisationUnitId,
                setSelected,
                selectedOrgUnits,
                setSelectedOrgUnits,

                resourceItem,
                resourceDetails,
                resourcePage,
                resourceSize,
                setResourceSize,
                currentResourcePage: currentResourcePage,
                updateCurrentResourcePage,
                getResourceById,

                searchString,
                searchValue,

                users,
                userType,
                updateUserType,
                user,
                page,
                currentUserPage,
                size,
                setSize,
                updateCurrentUserPage,

                currentAssignmentPage,
                updateCurrentAssignmentPage,
                assignmentSize,
                setAssignmentSize,
                assignedUsersPage,
                getAssignedUsersPage,

                getAssignedRolesPage,
                assignedRolesPage,
                assignedRoleSize,
                setAssignedRoleSize,
                currentAssignedRolePage,
                updateCurrentAssignedRolePage,

                rolePage,
                roleType,
                roleSize,
                setRoleSize,
                currentRolePage,
                updateRoleType,
                updateCurrentRolePage,

                createRoleAssignment,
                createUserAssignment,
                deleteAssignment,
                objectType,
                setObjectType,

                error,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};
export default ResourceProvider;