import axios from 'axios';
import LocalStorage from '../../utils/LocalStorage';

const axiosInstance = axios.create({
    baseURL: 'http://10.10.102.39:8080',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await LocalStorage().getData('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        throw error;
    }
);

const apiClient = async ({
    url,
    method,
    data = null,
    params = null,
    multipart = false,
}) => {
    try {
        let result;

        if (method === 'put' || method === 'post') {
            if (multipart && data instanceof FormData) {
                result = await axiosInstance[method](url, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                result = await axiosInstance[method](url, data, { params });
            }
        } else {
            result = await axiosInstance[method](url, { params });
        }

        return result;
    } catch (error) {
        throw error;
    }
};

export default apiClient;
