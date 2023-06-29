import axios from 'axios';
import {ICreateAssignment, IResource, IResourcePage, IUnitTree, IUserPage} from "../context/types";

const getBaseUrl = () => {
    return axios.get('api/layout/configuration');
}

const getResources = (basePath: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/resources/`;
    return axios.get<IResource[]>(url);
}

const getUnitTree = (basePath: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/orgunits/`;
    return axios.get<IUnitTree>(url)
}

const getResourceById = (uri: string) => axios.get<IResource>(uri);

const getResourcePage = (basePath: string, resourcePage: number, userType: string, organisationUnitId: number[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/resources/`;
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

    if (resourcePage) {
        queryParams.push(`resourcePage=${resourcePage}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IResourcePage>(url);
}

const getUserPage = (basePath: string, page: number, size: number,
                     userType: string, organisationUnitId: number[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/users/`;
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

const createAssignment = (basePath: string, resourceRef: string, userRef: string, organizationUnitId: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments/`;
    console.log("resourceRef:", resourceRef, "userRef:", userRef, "organizationUnitId:", organizationUnitId)
    return axios.post<ICreateAssignment>(url, {
        resourceRef: resourceRef,
        userRef: userRef,
        organizationUnitId: organizationUnitId,
    })
}

const deleteAssignment = (basePath: string, id: number) => {
    const url = `${basePath === '/' ? '' : basePath}/api/assignments/${id}`;
    console.log("Repository id", id)
    return axios.delete<ICreateAssignment>(url,
    )
}

const UserRepository = {
    getBaseUrl,
    getResources,
    getUnitTree,
    getResourcePage,
    getResourceById,
    getUserPage,
    createAssignment,
    deleteAssignment,
};

export default UserRepository;