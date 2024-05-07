import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

const AuthService = () => {
    const registerMutation = useMutation(async (data) => {
        const response = await apiClient({
            url: 'auth/register/user',
            method: 'post',
            body: data,
        });
        return response.data;
    });

    return registerMutation;
};

export default AuthService;
