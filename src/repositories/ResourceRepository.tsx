import axios from 'axios';
import {
    IAssignedRolesPage,
    IAssignedUsersPage, IAssignmentPage,
    ICreateRoleAssignment,
    ICreateUserAssignment,
    IResource,
    IResourcePage,
    IRolePage,
    IUnitTree,
    IUserPage
} from "../context/types";

const getBaseUrl = () => {
    return axios.get('api/layout/configuration');
}

/*const getAssignments = (basePath: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments`;
    return axios.get<IAssignmentPage>(url);
}*/

const getUnitTree = (basePath: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/orgunits`;
    return axios.get<IUnitTree>(url)
}

const getResourceById = (id: number, basePath: string) => {
    const uri = `${basePath === '/' ? '' : basePath}/api/resources/${id}`
    return axios.get<IResource>(uri);
}

const getResourcePage =
    (basePath: string, resourcePage: number, resourceSize: number, userType: string, organisationUnitId: string[],
     searchString: string) => {
        const baseUrl = `${basePath === '/' ? '' : basePath}/api/resources`;
        let queryParams = [];

        const sanitizedQueryString = searchString.trim();
        if (sanitizedQueryString.length !== 0) {
            queryParams.push(`search=${searchString}`);
        }

        if (organisationUnitId && organisationUnitId.length > 0) {
            queryParams.push(`orgUnits=${organisationUnitId}`);
        }

        if (resourcePage) {
            queryParams.push(`page=${resourcePage}`);
        }

        if (resourceSize) {
            queryParams.push(`size=${resourceSize}`);
        }

        const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

        return axios.get<IResourcePage>(url);
    }

const getUserPage = (basePath: string, page: number, size: number,
                     userType: string, organisationUnitId: string[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/users`;
    let queryParams = [];

    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    if (userType) {
        queryParams.push(`userType=${userType}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgUnits=${organisationUnitId}`);
    }

    if (page) {
        queryParams.push(`page=${page}`);
    }

    if (size) {
        queryParams.push(`size=${size}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IUserPage>(url);
}

const getRolePage = (basePath: string, roleType: string, currentRolePage: number, roleSize: number, organisationUnitId: string[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/roles`;
    let queryParams = [];

    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    if (roleType) {
        queryParams.push(`roletype=${roleType}`);
    }

    if (currentRolePage) {
        queryParams.push(`page=${currentRolePage}`);
    }

    if (roleSize) {
        queryParams.push(`size=${roleSize}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgunits=${organisationUnitId}`);
    }
    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IRolePage>(url);
}

const getAssignmentsPage = (basePath: string, id: number, currentAssignmentPage: number, assignmentSize: number, organisationUnitId: string[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/assignments`;
    let queryParams = [];
    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    if (assignmentSize) {
        queryParams.push(`size=${assignmentSize}`);
    }

    if (currentAssignmentPage) {
        queryParams.push(`page=${currentAssignmentPage}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgUnits=${organisationUnitId}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IAssignmentPage>(url);
}

const getAssignedRolesPage = (basePath: string, id: number, roleType: string, currentAssignedRolePage: number, assignedRoleSize: number, organisationUnitId: string[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/assignments/resource/${id}/roles`;
    let queryParams = [];
    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    if (roleType) {
        queryParams.push(`roleType=${roleType}`);
    }

    if (assignedRoleSize) {
        queryParams.push(`size=${assignedRoleSize}`);
    }

    if (currentAssignedRolePage) {
        queryParams.push(`page=${currentAssignedRolePage}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgUnits=${organisationUnitId}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IAssignedRolesPage>(url);
}

const getAssignedUsersPage = (basePath: string, id: number, assignedUsersPage: number, assignedUsersSize: number, userType: string, organisationUnitId: string[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/assignments/resource/${id}/users`;
    let queryParams = [];

    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    if (assignedUsersSize) {
        queryParams.push(`size=${assignedUsersSize}`);
    }

    if (userType) {
        queryParams.push(`userType=${userType}`);
    }

    if (assignedUsersPage) {
        queryParams.push(`page=${assignedUsersPage}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgUnits=${organisationUnitId}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IAssignedUsersPage>(url);
}

const createUserAssignment = (basePath: string, resourceRef: number, userRef: number, organizationUnitId: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments`;
    return axios.post<ICreateUserAssignment>(url, {
        resourceRef: resourceRef,
        userRef: userRef,
        organizationUnitId: organizationUnitId,
    })
}

const createRoleAssignment = (basePath: string, resourceRef: number, roleRef: number, organizationUnitId: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments`;
    return axios.post<ICreateRoleAssignment>(url, {
        resourceRef: resourceRef,
        roleRef: roleRef,
        organizationUnitId: organizationUnitId,
    })
}

const deleteAssignment = (basePath: string, id: number) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments/${id}`;
    console.log("Repository id", id)
    return axios.delete<ICreateUserAssignment>(url,
    )
}

const ResourceRepository = {
    getBaseUrl,
    getUnitTree,
    getResourcePage,
    getResourceById,
    getUserPage,
    createUserAssignment,
    createRoleAssignment,
    deleteAssignment,
    getAssignedUsersPage,
    getAssignedRolesPage,
    getRolePage,
    getAssignmentsPage,
};
export default ResourceRepository;
