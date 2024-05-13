import apiClient from './apiClient';

const WishlistService = () => {
    const create = async (data) => {
        try {
            const response = await apiClient({
                url: '/api/wish-list',
                method: 'post',
                data: data,
                multipart: false,
            });

            return response;
        } catch (error) {
            throw error;
        }
    };

    const findAll = async (userId) => {
        try {
            const { data } = await apiClient({
                url: `/api/wish-list/${userId}`,
                method: 'get',
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const deleteById = async (id) =>{
        try {
            const response = await apiClient({
                url: `/api/wish-list/${id}`,
                method: 'delete',
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    return { create, findAll, deleteById };
};

export default WishlistService;
