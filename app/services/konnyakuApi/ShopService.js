import apiClient from './apiClient';

const ShopService = () => {
    const registerShop = async (formData) => {
        try {
            const response = await apiClient({
                url: '/api/shop',
                method: 'post',
                data: formData,
                multipart: false,
            });

            return response;
        } catch (error) {
            throw error;
            console.log('pesanerrer' + error);
        }
    };

    return { registerShop };
};

export default ShopService;
