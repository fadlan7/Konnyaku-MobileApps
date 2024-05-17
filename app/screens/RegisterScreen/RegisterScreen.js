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
import CustomPasswordInput from '../../shared/components/CustomPasswordInput';
import OngkirService from '../../services/rajaOngkirApi/ongkirService';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { CustomInputImage } from '../../shared/components/CustomInputImage';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import AuthService from '../../services/konnyakuApi/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TermAndConditionModal } from './components/TermAndConditionModal';

export const RegisterScreen = ({ navigation }) => {
    const schema = z.object({
        email: z
            .string()
            .email('This is not a valid email address')
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Email is required'
            ),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Password is required'
            ),
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

    const authService = AuthService();
    const { theme } = useTheme();
    const ongkirService = OngkirService();

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: '',
        name: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: '', name: '' });
    const [ktpImage, setKtpImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [ktpValidation, setKtpValidation] = useState(true);
    const [selfieValidation, setSelfieValidation] = useState(true);
    const [permissionGranted, setPermissionGranted] = useState(null);
    const [isTCChecked, setIsTCChecked] = useState(null);
    const [isTCOpen, setIsTCOpen] = useState(false);

    const handleToggleTC = () => {
        setIsTCOpen(!isTCOpen);
    };

    const handleTCOk = () => {
        setIsTCChecked(true);
        setIsTCOpen(false);
    };

    const handleCloseTC = () => {
        setIsTCOpen(false);
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await ongkirService.getProvinces();
                setProvinces(provinceData.rajaongkir.results);
            } catch (error) {
                Alert.alert('Error fetching provinces:', error);
            }
        };

        const requestPermission = async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();
                setPermissionGranted(status === 'granted');
            }
        };

        requestPermission();
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

    const handlePermissionRequest = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionGranted(status === 'granted');
    };

    const handleTakeKtp = async () => {
        const camera = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!camera.canceled) {
            setKtpImage(camera.assets[0]);
            setKtpValidation(true);
        }
    };

    const handleTakeSelfie = async () => {
        const camera = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!camera.canceled) {
            setSelfieImage(camera.assets[0]);
            setSelfieValidation(true);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (ktpImage === null) {
                setKtpValidation(false);
            } else if (selfieImage === null) {
                setSelfieValidation(false);
            } else if (isTCChecked === null) {
                setIsTCChecked(false);
            } else {
                setKtpValidation(true);
                setSelfieValidation(true);

                const { email, password, mobilePhoneNo, name, street } = data;
                const formData = new FormData();

                const registrationData = {
                    username: email,
                    password,
                    mobilePhoneNo,
                    name,
                    addressRequest: {
                        street,
                        provinceId: selectedProvince.id,
                        provinceName: selectedProvince.name,
                        cityId: selectedCity.id,
                        cityName: selectedCity.name,
                    },
                };

                formData.append(
                    'registration',
                    JSON.stringify(registrationData)
                );

                formData.append('images', {
                    uri: selfieImage.uri,
                    type: 'image/jpeg',
                    name: `selfie-${email}.jpg`,
                });

                formData.append('images', {
                    uri: ktpImage.uri,
                    type: 'image/jpeg',
                    name: `ktp-${email}.jpg`,
                });

                const response = await authService.registerUser(formData);

                if (response.data.statusCode === 201) {
                    clearForm();
                    navigation.replace('Login');
                    Alert.alert('Success', 'Registration Success');
                }
            }
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    };

    const clearForm = () => {
        setKtpImage(null);
        setSelfieImage(null);
        reset();
        clearErrors();
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
                checkboxContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '80%',
                },
                checkboxText: {
                    fontFamily: 'poppins-regular',
                },
            }),
        []
    );
    return (
        <>
            {permissionGranted === false && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        backgroundColor: theme.colors.background,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'poppins-semibold',
                            textAlign: 'center',
                        }}
                    >
                        You need to grant camera permission to use this feature
                    </Text>
                    <CustomButton
                        title="Request camera permission"
                        color="#fff"
                        fontFamily="poppins-semibold"
                        fontSize={18}
                        style={styles.customBtn}
                        onPress={() => handlePermissionRequest()}
                    />
                </View>
            )}
            {permissionGranted === true && (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                >
                    <Text style={styles.headerTxt}>Register</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginTxt}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerInput}>
                        <View style={styles.containerInputAndError}>
                            <Text>Email</Text>
                            <Controller
                                name="email"
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <CustomTextInput
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        returnKeyType="next"
                                    />
                                )}
                            />
                            {errors.email && (
                                <Text style={styles.formErrorMessage}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>

                        <View style={styles.containerInputAndError}>
                            <Text>Password</Text>
                            <Controller
                                name="password"
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <CustomPasswordInput
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        returnKeyType="next"
                                    />
                                )}
                            />
                            {errors.password && (
                                <Text style={styles.formErrorMessage}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>

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
                                                            cities[
                                                                itemIndex - 1
                                                            ]?.city_name
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

                        <View style={styles.containerInputAndError}>
                            <Text>KTP Photo</Text>
                            <CustomInputImage
                                imageUri={ktpImage?.uri}
                                onPress={handleTakeKtp}
                            />
                            {ktpValidation === false ? (
                                <Text style={styles.formErrorMessage}>
                                    please take a picture
                                </Text>
                            ) : (
                                <></>
                            )}
                        </View>

                        <View style={styles.containerInputAndError}>
                            <Text>Selfie Photo</Text>
                            <CustomInputImage
                                imageUri={selfieImage?.uri}
                                onPress={handleTakeSelfie}
                            />
                            {selfieValidation === false ? (
                                <Text style={styles.formErrorMessage}>
                                    please take a picture
                                </Text>
                            ) : (
                                <></>
                            )}
                        </View>

                        <View style={styles.containerInputAndError}>
                            <View style={styles.checkboxContainer}>
                                <BouncyCheckbox
                                    isChecked={isTCChecked}
                                    onPress={() => setIsTCChecked(!isTCChecked)}
                                    disabled={!isTCOpen}
                                    fillColor={theme.colors.primary}
                                />
                                <Text style={styles.checkboxText}>
                                    I have read and agree{' '}
                                    <Text
                                        style={[
                                            styles.checkboxText,
                                            { color: theme.colors.primary },
                                        ]}
                                        numberOfLines={2}
                                        onPress={handleToggleTC}
                                    >
                                        Terms and Conditions
                                    </Text>
                                </Text>
                            </View>
                            {isTCChecked === false ? (
                                <Text style={styles.formErrorMessage}>
                                    You must agree to the terms and conditions
                                </Text>
                            ) : (
                                <></>
                            )}
                        </View>

                        <TermAndConditionModal
                            isVisible={isTCOpen}
                            onClose={handleCloseTC}
                            onAccept={handleTCOk}
                        />

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
            )}
        </>
    );
};
