import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

// const AuthService = () => {
//     const registerMutation = useMutation({
//         mutationFn: async (formData) => {
//             try {
//                 const response = await apiClient({
//                     url: '/api/auth/register/user',
//                     method: 'post',
//                     data: formData,
//                     multipart: true,
//                 });
//                 return response.data;
//             } catch (error) {
//                 throw new Error(error.response.data.message);
//             }
//         },
//     });

//     return { registerMutation };
// };

// export default AuthService;

const AuthService = () => {
    const registerUser = async (formData) => {
        try {
            const response = await apiClient({
                url: '/api/auth/register/user',
                method: 'post',
                data: formData,
                multipart: true,
            });
            
            return response.data;
        } catch (error) {
            throw error; 
        }
    };

    return { registerUser };
};

export default AuthService;
