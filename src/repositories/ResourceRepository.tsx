import axios from 'axios';
import {IResource} from "../context/types";


const getBaseUrl = () => {
    return axios.get('api/layout/configuration');
}

const getResources = (basePath: string) => {
    const url = `${basePath === '/' ? '' : basePath}/api/resources/`;
    return axios.get<IResource[]>(url);
}

const UserRepository = {
    getBaseUrl,
    getResources,
};

export default UserRepository;