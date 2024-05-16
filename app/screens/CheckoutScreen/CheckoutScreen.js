import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat, url } from '../../utils/currencyFormat';
import CustomButton from '../../shared/components/CustomButton';
import LocalStorage from '../../utils/LocalStorage';
import UserService from '../../services/konnyakuApi/UserService';
import CalendarPicker from 'react-native-calendar-picker';
import OngkirService from '../../services/rajaOngkirApi/ongkirService';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import { Alert } from 'react-native';

export const CheckoutScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const {
        name,
        description,
        priceAmount,
        weight,
        details,
        thumbnail,
        shop,
        user,
    } = route.params;
    const { width, height } = Dimensions.get('window');
    const localStorage = LocalStorage();
    // const [userAccountId, setUserAccountId] = useState(null);
    // const [userId, setUserId] = useState(null);
    // const [user, setUser] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState('YYYY-MM-DD');
    const [selectedEndDate, setSelectedEndDate] = useState('YYYY-MM-DD');
    const [courier, setCourier] = useState('jne');
    const [service, setService] = useState('');
    const [services, setServices] = useState([]);
    // const userService = useMemo(() => UserService(), []);
    const ongkirService = useMemo(() => OngkirService(), []);
    const [amount, setAmount] = useState(null);

    // const setId = async () => {
    //     const userAccountId = await localStorage.getData('userAccountId');
    //     setUserAccountId(userAccountId);
    // };

    // const getUserId = async () => {
    //     try {
    //         const userId = await userService.getUserIdByAccountId(
    //             userAccountId
    //         );
    //         setUserId(userId.data.id);
    //     } catch (error) {
    //         Alert.alert(error);
    //     }
    // };

    // const fetchUserData = async () => {
    //     try {
    //         const data = await userService.getUserByUserId(userId);
    //         setUser(data.data);
    //     } catch (error) {
    //         Alert.alert(error);
    //     }
    // };

    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 5);

    const maxDate = new Date(minDate);
    maxDate.setDate(minDate.getDate() + 20);

    const onDateChange = (date, type) => {
        const newDate = JSON.stringify(date);
        const newDate1 = newDate.substring(1, newDate.length - 1);

        const dates = newDate1.split('T');
        const date1 = dates[0].split('-');
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];

        if (type == 'END_DATE') {
            if (day === undefined) {
                setSelectedEndDate('YYYY-MM-DD');
            } else {
                setSelectedEndDate(year + '-' + month + '-' + day);
            }
        } else {
            setSelectedStartDate(year + '-' + month + '-' + day);
            setSelectedEndDate(year + '-' + month + '-' + day);
        }
    };
    // const handleCourierChange = (courier) => {
    //     setCourier(courier);
    //     fetchCost(courier);
    // };

    const fetchCost = async () => {
        try {
            const response = await ongkirService.getCost(
                shop.address.cityId,
                user.address.cityId,
                weight,
                courier
            );
            const costs = response.rajaongkir.results[0].costs[0];
            setServices(costs);
            setService(costs);
            console.log(costs);
            // if (costs.length === 1) {
            //     const selectedService = {
            //         service: costs[0].service,
            //         description: costs[0].description,
            //         cost: costs[0].cost[0].value,
            //     };
            //     setService(selectedService);
            // } else {
            //     setService(null);
            // }
        } catch (error) {
            console.log(
                'Failed to fetch cost. Please check the console for more details.'
            );
        }
    };

    // useEffect(() => {
    //     setId();
    //     if (userAccountId) {
    //         getUserId();
    //     }
    //     if (userId) {
    //         fetchUserData();
    //     }
    //     if (courier) {
    //         fetchCost();
    //     }
    // }, [userAccountId, userId, courier]);

    // useEffect(() => {
    //     setId();
    // }, []);

    // useEffect(() => {
    //     if (userAccountId) {
    //         getUserId();
    //     }
    // }, [userAccountId]);

    // useEffect(() => {
    //     if (userId) {
    //         fetchUserData();
    //     }
    // }, [userId]);

    useEffect(() => {
        // if (courier !== null) {
        fetchCost();
        // }
    }, []);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
            },
            headerContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 8,
            },
            backButton: {
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
            },
            cardContainer: {
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
            },
            prdImage: {
                width: 100,
                height: 100,
                objectFit: 'contain',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.colors.grey,
                overflow: 'hidden',
            },
            prdDescContainer: {
                justifyContent: 'space-around',
                marginLeft: 10,
                paddingVertical: 10,
                width: '80%',
            },
            favButton: {
                backgroundColor: theme.colors.primary,
                elevation: 5,
                padding: 10,
                borderRadius: 50,
            },
            prdName: {
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
            prdPrice: {
                fontFamily: 'poppins-semibold',
                fontSize: 16,
            },
            header: {
                fontFamily: 'poppins-semibold',
                fontSize: 16,
            },
            horizontalLine: {
                width: '100%',
                borderWidth: 0.3,
                borderColor: theme.colors.primary,
                marginBottom: 10,
            },
            picker: {
                height: 50,
                width: '100%',
            },
            customBtn: {
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
            },
        })
    );
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} />
                    <Text
                        style={{ fontFamily: 'poppins-semibold', fontSize: 16 }}
                    >
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: 15,
                }}
            >
                {user && (
                    <View>
                        <Text style={styles.header}>Shipping Address</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                                marginBottom: 15,
                            }}
                        >
                            <Ionicons name="location-outline" size={30} />
                            <Text>{`${user.address.street}, ${user.address.cityName}, ${user.address.provinceName}`}</Text>
                        </View>
                        <View style={styles.horizontalLine} />
                    </View>
                )}

                <View>
                    <Text style={styles.header}>Choose Shipping Type</Text>
                    <Text>Select Courier</Text>

                    {/* <Picker
                        mode="dropdown"
                        selectedValue={courier}
                        style={styles.picker}
                        // onValueChange={(itemValue) => setCourier(itemValue)}
                        onValueChange={(itemValue) => {
                            handleCourierChange(itemValue);
                        }}
                    >
                        <Picker.Item label="Pilih Kurir" value="" />
                        <Picker.Item label="JNE" value="jne" />
                        <Picker.Item label="TIKI" value="tiki" />
                        <Picker.Item label="POS INDO" value="pos" />
                    </Picker> */}

                    {/* {services.length > 0 && (
                        <>
                            <Text>Select Service</Text>
                            <Picker
                                selectedValue={service ? service.service : ''}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    const selectedService = services.find(
                                        (s) => s.service === itemValue
                                    );
                                    if (selectedService) {
                                        const { service, description, cost } =
                                            selectedService;
                                        setService({
                                            service,
                                            description,
                                            cost: cost[0].value,
                                        });
                                    } else {
                                        setService(null);
                                    }
                                }}
                            >
                                <Picker.Item label="Pilih Layanan" value="" />
                                {services.map((service) => (
                                    <Picker.Item
                                        key={service.service}
                                        label={`${service.service} - ${service.description} - Rp.${service.cost[0].value} - ${service.cost[0].etd} days`}
                                        value={service.service}
                                    />
                                ))}
                            </Picker>
                        </>
                    )} */}

                    <View style={styles.horizontalLine} />
                </View>

                <View>
                    <Text style={styles.header}>Select Rental Date</Text>

                    {/* {console.log(user)} */}
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor={theme.colors.primary}
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                    />

                    <Text>{selectedStartDate}</Text>
                    <Text>{selectedEndDate}</Text>
                    <View style={[styles.horizontalLine, { marginTop: 15 }]} />
                </View>

                <View>
                    <Text style={styles.header}>Order</Text>
                    <View style={styles.cardContainer}>
                        <Image
                            source={{
                                uri: `${url}${thumbnail.url}`,
                            }}
                            alt={thumbnail.name}
                            style={styles.prdImage}
                        />

                        <View style={styles.prdDescContainer}>
                            <Text style={styles.prdName}>{name}</Text>
                            <Text style={styles.prdPrice}>
                                {currencyFormat(priceAmount)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLine} />
                </View>

                <Text style={styles.header}>Ringkasan Belanja</Text>
                <Text> harga {priceAmount}</Text>

                {service && (
                    <View>
                        <Text>
                            Ongkos Kirim {service.cost.toLocaleString()}
                        </Text>
                        <Text>
                            {/* {priceAmount + service.cost} */}
                            {setAmount(priceAmount + service.cost)}
                        </Text>
                    </View>
                )}

                <CustomButton
                    title="Continue to Payment"
                    color="#fff"
                    fontFamily="poppins-semibold"
                    fontSize={18}
                    style={styles.customBtn}
                    // onPress={handleSubmit(onSubmit)}
                />
            </ScrollView>

            {/* {console.log(
                name,
                description,
                priceAmount,
                weight,
                details,
                thumbnail,
                shop,
                user
            )} */}
        </View>
    );
};
