import apiClient from './apiClient';

const UserService = () => {
    const getUserIdByAccountId = async (userAccountId) => {
        try {
            const { data } = await apiClient({
                url: `/api/user/account/${userAccountId}`,
                method: 'get',
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getUserByUserId = async (userId) => {
        try {
            const { data } = await apiClient({
                url: `/api/user/${userId}`,
                method: 'get',
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const updateProfile = async (formData) => {
        try {
            const { data } = await apiClient({
                url: `/api/user`,
                method: 'put',
                data: formData,
                multipart: false,
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { getUserIdByAccountId, getUserByUserId, updateProfile };
};

export default UserService;
