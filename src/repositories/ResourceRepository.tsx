import axios from 'axios';
import {IResource, IUnitTree} from "../context/types";


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

const UserRepository = {
    getBaseUrl,
    getResources,
    getUnitTree,
};

export default UserRepository;