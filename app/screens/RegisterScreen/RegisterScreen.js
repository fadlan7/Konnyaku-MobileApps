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

export const RegisterScreen = ({ navigation }) => {
    const schema = z.object({
        email: z
            .string()
            .email('This is not a valid email address')
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Email is required'
            ),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Password is required'
            ),
        name: z
            .string()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Name is required'
            ),
        mobilePhoneNo: z
            .string()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Mobile phone number is required'
            ),
        street: z
            .string()
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

    const register = AuthService();
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
    const [permissionGranted, setPermissionGranted] = useState(null);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await ongkirService.getProvinces();
                setProvinces(provinceData.rajaongkir.results);
            } catch (error) {
                console.error('Error fetching provinces:', error);
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

    const handlePermissionRequest = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionGranted(status === 'granted');
    };

    const handleTakeKtp = async () => {
        const camera = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!camera.canceled) {
            const uri = camera.assets[0].uri;
            setKtpImage(uri);
        }
    };

    const handleTakeSelfie = async () => {
        const camera = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!camera.canceled) {
            const uri = camera.assets[0].uri;
            setSelfieImage(uri);
            console.log(camera);
            // fileName, fileSize, mimeType, path
        }
    };

    const onSubmit = async (data) => {
        try {
            if (ktpImage === null || selfieImage === null) {
                return;
            } else {
                const { email, password, profileImage } = data;
                console.log(ktpImage)
                console.log(selfieImage)
                console.log(data);
            }
            // const data = new FormData();

            // data.append('daftar', JSON.stringify({ email, password }));
            // data.append('profileImage', {
            //     uri: profileImage.uri,
            //     type: 'image/jpeg',
            //     name: 'image.jpg',
            // });
            // await authService.registerMutation.mutateAsync(data);
            // navigation.replace('Homepage');
        } catch (error) {
            if (error instanceof z.ZodError) {
                Alert.alert(
                    'Validation Error',
                    error.errors.map((err) => err.message).join('\n')
                );
            } else {
                console.error('Error:', error);
                Alert.alert('Error', error.message);
            }
        }
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
                    marginTop: 5,
                },
                customBtn: {
                    backgroundColor: theme.colors.secondary,
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
        <>
            {permissionGranted === false && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 15,
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
                                imageUri={ktpImage}
                                onPress={handleTakeKtp}
                            />
                            {ktpImage === null && (
                                <Text style={styles.formErrorMessage}>
                                    please take a picture
                                </Text>
                            )}
                        </View>

                        <View style={styles.containerInputAndError}>
                            <Text>Selfie Photo</Text>
                            <CustomInputImage
                                imageUri={selfieImage}
                                onPress={handleTakeSelfie}
                            />
                            {selfieImage === null && (
                                <Text style={styles.formErrorMessage}>
                                    please take a picture
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
            )}
        </>
    );
};
