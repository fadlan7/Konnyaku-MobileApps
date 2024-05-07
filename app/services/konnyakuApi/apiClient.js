import axios from 'axios';
import { GlobalError, UnauthorizedError } from '../../utils/error';

const axiosInstance = axios.create({
    baseURL: 'http://10.10.102.39:8080',
});


// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const token = await LocalStorage().getData('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


const apiClient = async ({ url, method, body = null, params = null }) => {
    try {
        let result;

        if (method === 'put' || method === 'post') {
            result = await axiosInstance[method](url, body);
        } else {
            result = await axiosInstance[method](url, { params });
        }
        return result;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new UnauthorizedError('Unauthorized');
        } else if (error.response && error.response.data && error.response.data.message) {
            throw new GlobalError(error.response.data.message);
        } else {
            throw new Error(`Unknown error occurred: ${error.message}`);
        }
    }
};

export default apiClient;