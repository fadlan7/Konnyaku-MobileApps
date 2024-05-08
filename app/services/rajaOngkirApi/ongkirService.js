import axios from 'axios';

const API_URL = 'https://api.rajaongkir.com/starter';
const KEY = 'e1a00d7500cbd448a553cfdc2406e698';

const ongkirClient = axios.create({
    baseURL: API_URL,
    headers: {
        key: KEY,
    },
});

const OngkirService = () => {
    const getProvinces = async () => {
        try {
            const { data } = await ongkirClient.get('/province');
            return data;
        } catch (error) {
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
            throw error;
        }
    };

    return {
        getProvinces,
        getCitiesByProvince,
    };
};

export default OngkirService;
