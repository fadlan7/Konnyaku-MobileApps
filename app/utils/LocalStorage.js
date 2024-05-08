const {
    default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');

const LocalStorage = () => {
    const setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            throw e;
        }
    };

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            throw e;
        }
    };

    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            throw e;
        }
    };

    return {
        setData,
        getData,
        removeData,
    };
};

export default LocalStorage;
