import apiClient from './apiClient';

const TransactionService = () => {
    const create = async (dataForm) => {
        try {
            const { data } = await apiClient({
                url: '/api/transactions',
                method: 'post',
                data: dataForm,
                multipart: false,
            });

            return data.data;
        } catch (error) {
            throw error;
        }
    };

    return { create };
};

export default TransactionService;