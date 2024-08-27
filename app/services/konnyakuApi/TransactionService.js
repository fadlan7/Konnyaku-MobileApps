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

    const getAll = async (userId) => {
        try {
            const { data } = await apiClient({
                url: `/api/transactions?userId=${userId}`,
                method: 'get',
            });
            return data.data;
        } catch (error) {
            throw error;
        }
    };

    const changeTransactionStatus = async (formData) => {
        try {
            const { data } = await apiClient({
                url: `/api/transactions/transaction-status`,
                method: 'put',
                data: formData,
                multipart: false,
            });
            return data.data;
        } catch (error) {
            throw error;
        }
    };

    return { create, getAll, changeTransactionStatus };
};

export default TransactionService;
