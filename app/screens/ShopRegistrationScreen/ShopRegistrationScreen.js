import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomTextInput from '../../shared/components/CustomTextInput';
import CustomButton from '../../shared/components/CustomButton';
import OngkirService from '../../services/rajaOngkirApi/ongkirService';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import LocalStorage from '../../utils/LocalStorage';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import ShopService from '../../services/konnyakuApi/ShopService';

export const ShopRegistrationScreen = ({ navigation }) => {
    const schema = z.object({
        name: z
            .string()
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Name is required'
            ),
        mobilePhoneNo: z
            .string()
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Mobile phone number is required'
            ),
        street: z
            .string()
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Street is required'
            ),
        provincePicker: z.string().nonempty(),
        cityPicker: z.string().nonempty(),
    });

    const {
        control,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });

    const localStorage = LocalStorage();
    const shopService = ShopService();
    const { theme } = useTheme();
    const ongkirService = OngkirService();
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: '',
        name: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: '', name: '' });
    const [userAccId, setUserAccId] = useState('');

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
            },
            headerContainer: {
                padding: 15,
                borderBottomWidth: 0.5,
            },
            backButton: {
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
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
                marginTop: 5,
            },
            customBtn: {
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
            },
            formErrorMessage: {
                color: theme.colors.error,
            },
            containerInputAndError: {
                marginBottom: 20,
            },
        })
    );

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await ongkirService.getProvinces();
                setProvinces(provinceData.rajaongkir.results);
            } catch (error) {
                Alert.alert('Error fetching provinces:', error);
            }
        };

        const checkToken = async () => {
            const token = await localStorage.getData('token');
            const decoded = jwtDecode(token);
            const userAccountId = decoded.sub;

            setUserAccId(userAccountId);
        };

        checkToken();
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

    const onSubmit = async (data) => {
        try {
            const { mobilePhoneNo, name, street } = data;

            const registrationData = {
                userAccountId: userAccId,
                mobilePhoneNo,
                name,
                address: {
                    street,
                    provinceId: selectedProvince.id,
                    provinceName: selectedProvince.name,
                    cityId: selectedCity.id,
                    cityName: selectedCity.name,
                },
            };

            const response = await shopService.registerShop(registrationData);

            if (response.data.statusCode === 201) {
                clearForm();
                navigation.replace('TabHome');
                Alert.alert('Success', 'Registration Success');
            }
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    };

    const clearForm = () => {
        reset();
        clearErrors();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 15 }}
            >
                <View style={styles.containerInput}>
                    <View style={styles.containerInputAndError}>
                        <Text>Store Name</Text>
                        <Controller
                            name="name"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <CustomTextInput
                                    autoComplete="name"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    returnKeyType="next"
                                />
                            )}
                        />
                        {errors.name && (
                            <Text style={styles.formErrorMessage}>
                                {errors.name.message}
                            </Text>
                        )}
                    </View>

                    <View style={styles.containerInputAndError}>
                        <Text>Phone Number</Text>
                        <Controller
                            name="mobilePhoneNo"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <CustomTextInput
                                    autoComplete="tel"
                                    keyboardType="phone-pad"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    returnKeyType="next"
                                />
                            )}
                        />
                        {errors.mobilePhoneNo && (
                            <Text style={styles.formErrorMessage}>
                                {errors.mobilePhoneNo.message}
                            </Text>
                        )}
                    </View>

                    <View style={styles.containerInputAndError}>
                        <Text>Province</Text>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="provincePicker"
                            defaultValue=""
                            render={({ field }) => (
                                <View style={styles.selectInput}>
                                    <Picker
                                        selectedValue={selectedProvince.id}
                                        onValueChange={(
                                            itemValue,
                                            itemIndex
                                        ) => {
                                            handleProvinceChange(
                                                itemValue,
                                                provinces[itemIndex - 1]
                                                    ?.province
                                            );
                                            field.onChange(
                                                itemValue,
                                                provinces[itemIndex - 1]
                                                    ?.province
                                            );
                                        }}
                                    >
                                        <Picker.Item
                                            label="-- Select Province --"
                                            value=""
                                        />
                                        {provinces.map((province) => (
                                            <Picker.Item
                                                key={province.province_id}
                                                label={province.province}
                                                value={province.province_id}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        {errors.provincePicker && (
                            <Text style={styles.formErrorMessage}>
                                Please select an option
                            </Text>
                        )}
                    </View>

                    {selectedProvince.id !== '' && (
                        <View style={styles.containerInputAndError}>
                            <Text>City</Text>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                name="cityPicker"
                                defaultValue=""
                                render={({ field }) => (
                                    <View style={styles.selectInput}>
                                        <Picker
                                            selectedValue={selectedCity.id}
                                            onValueChange={(
                                                itemValue,
                                                itemIndex
                                            ) => {
                                                handleCityChange(
                                                    itemValue,
                                                    cities[itemIndex - 1]
                                                        ?.city_name
                                                ),
                                                    field.onChange(
                                                        itemValue,
                                                        cities[itemIndex - 1]
                                                            ?.city_name
                                                    );
                                            }}
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
                                )}
                            />
                            {errors.cityPicker && (
                                <Text style={styles.formErrorMessage}>
                                    Please select an option
                                </Text>
                            )}
                        </View>
                    )}

                    <View style={styles.containerInputAndError}>
                        <Text>Street</Text>
                        <Controller
                            name="street"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <CustomTextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    returnKeyType="next"
                                    multiline
                                    numberOfLines={4}
                                />
                            )}
                        />
                        {errors.street && (
                            <Text style={styles.formErrorMessage}>
                                {errors.street.message}
                            </Text>
                        )}
                    </View>

                    <CustomButton
                        title="REGISTER"
                        color="#fff"
                        fontFamily="poppins-semibold"
                        fontSize={18}
                        style={styles.customBtn}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
