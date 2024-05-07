import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

// const AuthService = () => {
//     const registerMutationFn = async (data) => {
//         const response = await apiClient({
//             url: 'auth/register/user',
//             method: 'post',
//             body: data,
//         });
//         return response.data;
//     };

//     const loginMutationFn = async (data) => {
//         const response = await apiClient({
//             url: 'auth/login',
//             method: 'post',
//             body: data,
//         });
//         return response.data;
//     };

//     const registerMutation = useMutation(registerMutationFn);
//     const loginMutation = useMutation(loginMutationFn);

//     return { registerMutation, loginMutation };
// };

// export default AuthService;

const AuthService = () => {
    // const registerMutation = useMutation(async (data) => {
    //     const response = await apiClient({
    //         url: 'auth/register/user',
    //         method: 'post',
    //         body: data,
    //     });
    //     return response.data;
    // });
    const registerMutation = useMutation({
        mutationFn: async (formData) => {
            try {
                const response = await apiClient({
                    url: '/api/auth/register/user',
                    method: 'post',
                    // headers: {
                    //     'Content-Type': 'multipart/form-data', // Header Content-Type
                    // },
                    data: formData, 
                });
                return response.data;
            } catch (error) {
                throw new Error(error.response.data.message);
            }
        },
    });


    return { registerMutation };
};

export default AuthService;

