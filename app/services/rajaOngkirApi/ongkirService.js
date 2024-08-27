import axios from 'axios';

const API_URL = 'https://api.rajaongkir.com/starter';
// const KEY = '036bd70cf0086951436f06ad40b59738';
// const KEY = 'e1a00d7500cbd448a553cfdc2406e698';
// const KEY = '7645ca40576aaf548397baab0d660c48'; //reached daily limit
// 036bd70cf0086951436f06ad40b59738
// const KEY = '6c3dcc8c51900a528283d8916e6f1ffc'; // baruu
// 415055a15b911dc78f124d5a09393ed1  // newwwwwwwwwww
const KEY = '55df7d9043a7870edbe65b25218f627b';


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

    const getCost = async (origin, destination, weight, courier) => {
        try {
            const { data } = await ongkirClient.post(
                '/cost',
                new URLSearchParams({
                    origin,
                    destination,
                    weight,
                    courier,
                }).toString()
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getProvinces,
        getCitiesByProvince,
        getCost,
    };
};

export default OngkirService;
