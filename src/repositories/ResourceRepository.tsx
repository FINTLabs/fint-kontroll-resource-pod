import axios from 'axios';
import {IResource, IResourcePage, IUnitTree} from "../context/types";


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

const getResourcePage = (basePath: string, resourcePage: number, organisationUnitId: number[], searchString: string) => {
    const baseUrl = `${basePath === '/' ? '' : basePath}/api/resources/`;
    let queryParams = [];

    const sanitizedQueryString = searchString.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchString}`);
    }

    /*if (userType) {
        queryParams.push(`userType=${userType}`);
    }*/

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgUnits=${organisationUnitId}`);
    }

    if (resourcePage) {
        queryParams.push(`resourcePage=${resourcePage}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

    return axios.get<IResourcePage>(url);
}

const UserRepository = {
    getBaseUrl,
    getResources,
    getUnitTree,
    getResourcePage,
    getResourceById,
};

export default UserRepository;