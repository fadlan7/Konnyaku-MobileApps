import apiClient from './apiClient';

const ProductService = () => {
    const getAll = async (query) => {
        try {
            const { data } = await apiClient({
                url: '/api/product',
                method: 'get',
                params: query,
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { getAll };
};

export default ProductService;
