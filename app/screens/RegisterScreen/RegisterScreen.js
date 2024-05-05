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
import OngkirService from '../../services/ongkirService';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CustomInputImage } from '../../shared/components/CustomInputImage';

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
    const [ktpImage, setKtpImage] = useState('');
    const [selfieImage, setSelfieImage] = useState('');
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
                        <Text>Username</Text>
                        <CustomTextInput autoComplete="username" />

                        <Text>Password</Text>
                        <CustomPasswordInput />

                        <Text>Name</Text>
                        <CustomTextInput autoComplete="username" />

                        <Text>Phone Number</Text>
                        <CustomTextInput
                            autoComplete="tel"
                            keyboardType="phone-pad"
                        />

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

                        <Text>KTP Photo</Text>
                        <CustomInputImage
                            imageUri={ktpImage}
                            onPress={handleTakeKtp}
                        />

                        <Text>Selfie Photo</Text>
                        <CustomInputImage
                            imageUri={selfieImage}
                            onPress={handleTakeSelfie}
                        />

                        <CustomButton
                            title="REGISTER"
                            color="#fff"
                            fontFamily="poppins-semibold"
                            fontSize={18}
                            style={styles.customBtn}
                        ></CustomButton>
                    </View>
                </ScrollView>
            )}
        </>
        // </ScrollView>
    );
};
