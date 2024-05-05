import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomTextInput from '../../shared/components/CustomTextInput';
import CustomButton from '../../shared/components/CustomButton';
import CustomPasswordInput from '../../shared/components/CustomPasswordInput';
import OngkirService from '../../services/ongkirService';
import { Picker } from '@react-native-picker/picker';

export const RegisterScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const ongkirService = OngkirService();

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: '',
        name: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: '', name: '' });

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await ongkirService.getProvinces();
                setProvinces(provinceData.rajaongkir.results);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    const fetchCities = async (provinceId) => {
        try {
            const cityData = await ongkirService.getCitiesByProvince(
                provinceId
            );
            setCities(cityData.rajaongkir.results);
            setSelectedCity({ id: '', name: '' });
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleProvinceChange = (provinceId, provinceName) => {
        setSelectedProvince({ id: provinceId, name: provinceName });
        fetchCities(provinceId);
    };

    const handleCityChange = (cityId, cityName) => {
        setSelectedCity({ id: cityId, name: cityName });
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    padding: 20,
                },
                headerTxt: {
                    fontFamily: 'poppins-bold',
                    fontSize: 24,
                },
                title: {
                    fontFamily: 'poppins-regular',
                    fontSize: 15,
                    color: theme.colors.grey,
                },
                loginTxt: {
                    fontFamily: 'poppins-semibold',
                    color: theme.colors.secondary,
                },
                containerInput: {
                    marginTop: 20,
                    paddingBottom: 50,
                },
                selectInput: {
                    borderWidth: 1,
                    borderColor: '#d9d4e7',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    marginBottom: 20,
                    marginTop: 5,
                },
                customBtn: {
                    backgroundColor: theme.colors.secondary,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                },
            }),
        []
    );
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <Text style={styles.headerTxt}>Register</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerInput}>
                <Text>Username</Text>
                <CustomTextInput autoComplete="username" />

                <Text>Password</Text>
                <CustomPasswordInput />

                <Text>Name</Text>
                <CustomTextInput autoComplete="username" />

                <Text>Phone Number</Text>
                <CustomTextInput autoComplete="tel" keyboardType="phone-pad" />

                <Text>Province</Text>
                <View style={styles.selectInput}>
                    <Picker
                        selectedValue={selectedProvince.id}
                        onValueChange={(itemValue, itemIndex) =>
                            handleProvinceChange(
                                itemValue,
                                provinces[itemIndex - 1]?.province
                            )
                        }
                    >
                        <Picker.Item label="-- Select Province --" value="" />
                        {provinces.map((province) => (
                            <Picker.Item
                                key={province.province_id}
                                label={province.province}
                                value={province.province_id}
                            />
                        ))}
                    </Picker>
                </View>

                {selectedProvince.id !== '' && (
                    <View>
                        <Text>City</Text>
                        <View style={styles.selectInput}>
                            <Picker
                                selectedValue={selectedCity.id}
                                onValueChange={(itemValue, itemIndex) =>
                                    handleCityChange(
                                        itemValue,
                                        cities[itemIndex - 1]?.city_name
                                    )
                                }
                            >
                                <Picker.Item
                                    label="-- Select City --"
                                    value=""
                                />
                                {cities.map((city) => (
                                    <Picker.Item
                                        key={city.city_id}
                                        label={city.city_name}
                                        value={city.city_id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )}

                <Text>Street</Text>
                <CustomTextInput multiline numberOfLines={4} />

                <CustomButton
                    title="REGISTER"
                    color="#fff"
                    fontFamily="poppins-semibold"
                    fontSize={18}
                    style={styles.customBtn}
                ></CustomButton>
            </View>
        </ScrollView>
    );
};
