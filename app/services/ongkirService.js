import ongkirClient from './ongkirClient';

const OngkirService = () => {
    const getProvinces = async () => {
        try {
            const { data } = await ongkirClient.get('/province');
            return data;
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    };

    const getCitiesByProvince = async (provinceId) => {
        try {
            const { data } = await ongkirClient.get('/city', {
                params: {
                    province: provinceId,
                },
            });
            return data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    };

    return {
        getProvinces,
        getCitiesByProvince,
    };
};

export default OngkirService;
