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
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OngkirService from '../../services/rajaOngkirApi/ongkirService';
import UserService from '../../services/konnyakuApi/UserService';

export const EditProfileScreen = ({ route, navigation }) => {
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
        provincePicker: z.string(),
        cityPicker: z.string(),
    });

    const {
        control,
        handleSubmit,
        clearErrors,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });

    const { theme } = useTheme();
    const ongkirService = OngkirService();

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: '',
        name: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: '', name: '' });
    const { id, name, mobilePhoneNo, address, activity } = route.params;
    const userService = UserService();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await ongkirService.getProvinces();
                setProvinces(provinceData.rajaongkir.results);
            } catch (error) {
                Alert.alert('Error fetching provinces:', error);
            }
        };

        const fetchDefaultCities = async () => {
            try {
                const cityData = await ongkirService.getCitiesByProvince(
                    address.provinceId
                );
                setCities(cityData.rajaongkir.results);
                setSelectedCity({ id: address.cityId, name: address.cityName });
            } catch (error) {
                Alert.alert('Error fetching cities:', error);
            }
        };

        setValue('name', name);
        setValue('mobilePhoneNo', mobilePhoneNo);
        setValue('street', address.street);
        setSelectedProvince({
            id: address.provinceId,
            name: address.provinceName,
        });

        fetchProvinces();
        if (address.provinceId) {
            fetchDefaultCities();
        }
    }, []);

    const fetchCities = async (provinceId) => {
        try {
            const cityData = await ongkirService.getCitiesByProvince(
                provinceId
            );
            setCities(cityData.rajaongkir.results);
            // setSelectedCity({ id: '', name: '' });
        } catch (error) {
            Alert.alert('Error fetching cities:', error);
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
                id: id,
                mobilePhoneNo,
                name,
                activity: true,
                addressRequest: {
                    street,
                    provinceId: selectedProvince.id,
                    provinceName: selectedProvince.name,
                    cityId: selectedCity.id,
                    cityName: selectedCity.name,
                },
            };

            const response = await userService.updateProfile(registrationData);

            if (response.statusCode === 200) {
                clearForm();
                navigation.replace('TabHome');
                Alert.alert('Success', 'Successfully update profile data');
            }
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    };

    const clearForm = () => {
        reset();
        clearErrors();
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    paddingHorizontal: 20,
                },
                headerContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                },
                backButton: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 8,
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
                    color: theme.colors.primary,
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
            }),
        []
    );
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
            >
                <Text style={styles.headerTxt}>Edit Profile</Text>
                <View style={styles.containerInput}>
                    <View style={styles.containerInputAndError}>
                        <Text>Name</Text>
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
                        title="UPDATE"
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
