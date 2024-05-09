import LocalStorage from '../../utils/LocalStorage';
import apiClient from './apiClient';

const AuthService = () => {
    const registerUser = async (formData) => {
        try {
            const response = await apiClient({
                url: '/api/auth/register/user',
                method: 'post',
                data: formData,
                multipart: true,
            });

            return response;
        } catch (error) {
            throw error;
        }
    };

    const login = async (payload) => {
        const { data } = await apiClient({
            url: '/api/auth/login',
            method: 'post',
            data: payload,
            multipart: false,
        });
        return data;
    };

    const checkToken = async () => {
        const token = await LocalStorage().getData('token');

        if (token) {
            const { data } = await apiClient({
                url: '/api/auth/validate-token',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } else {
            throw new Error('Token not found');
        }
    };

    const logout = async () => {
        await LocalStorage().removeData('token');
    };

    return { registerUser, login, checkToken, logout };
};

export default AuthService;
