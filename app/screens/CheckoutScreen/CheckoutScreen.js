import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Linking,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat, url } from '../../utils/currencyFormat';
import CalendarPicker from 'react-native-calendar-picker';
import OngkirService from '../../services/rajaOngkirApi/ongkirService';
import { dateRange } from '../../utils/dateRange';
import CustomButton from '../../shared/components/CustomButton';
import TransactionService from '../../services/konnyakuApi/TransactionService';
import { Alert } from 'react-native';

export const CheckoutScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const {
        id,
        name,
        priceAmount,
        weight,
        thumbnail,
        shop,
        user,
        userAccountId,
    } = route.params;
    const { width, height } = Dimensions.get('window');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [shippingCost, setShippingCost] = useState(null);
    const ongkirService = useMemo(() => OngkirService(), []);
    const transactionService = useMemo(() => TransactionService(), []);
    const [rentalRange, setRentalRange] = useState(null);
    const [amount, setAmount] = useState(null);
    let startDate = selectedStartDate;
    let endDate = selectedEndDate;

    const getDayRange = () => {
        let range = dateRange(startDate, endDate);
        setRentalRange(range);
        let totalAmount = (range * priceAmount + shippingCost).toString();
        setAmount(totalAmount);
    };

    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 5);

    const maxDate = new Date(minDate);
    maxDate.setDate(minDate.getDate() + 10);

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
                setSelectedEndDate(selectedStartDate);
            } else {
                setSelectedEndDate(year + '-' + month + '-' + day);
            }
        } else {
            setSelectedStartDate(year + '-' + month + '-' + day);
            setSelectedEndDate(year + '-' + month + '-' + day);
        }
    };
    const fetchCost = async () => {
        try {
            const response = await ongkirService.getCost(
                shop.address.cityId,
                user.address.cityId,
                weight,
                'jne'
            );
            const costs = response.rajaongkir.results[0].costs[0].cost[0].value;
            console.log(costs);
            setShippingCost(costs);
        } catch (error) {
            console.log('error fetching cost');
        }
    };

    const onSubmitTransaction = async () => {
        try {
            const data = {
                rentStart: selectedStartDate,
                rentEnd: selectedEndDate,
                rentAmount: amount,
                userAccountId: userAccountId,
                productId: id,
            };

            const response = await transactionService.create(data);
            // console.log(response.data.data.paymentResponse.redirectUrl);
            Linking.openURL(response.paymentResponse.redirectUrl);
            Alert.alert('Success', 'Please make payment');
            navigation.replace('TabHome');
        } catch (error) {
            Alert.alert(error);
        }
    };

    useEffect(() => {
        setShippingCost(null);

        fetchCost();

        if (selectedStartDate && selectedEndDate) {
            getDayRange();
        }
    }, [selectedStartDate, selectedEndDate, fetchCost]);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                paddingBottom: 20,
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
                marginVertical: 15,
                alignItems: 'center',
            },
            containerSummaryItem: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            summaryItemTitle: {
                fontFamily: 'poppins-light',
                fontSize: 15,
            },
            summaryItem: { fontFamily: 'poppins-semibold', fontSize: 15 },
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
                    <Text style={styles.header}>Select Rental Date</Text>

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

                <Text style={styles.header}>Shopping Summary</Text>
                <View style={styles.containerSummaryItem}>
                    <Text style={styles.summaryItemTitle}>Price</Text>
                    <Text style={styles.summaryItem}>
                        {currencyFormat(priceAmount)}
                    </Text>
                </View>
                <View style={styles.containerSummaryItem}>
                    <Text style={styles.summaryItemTitle}>
                        Rental day range
                    </Text>
                    <Text style={styles.summaryItem}>{rentalRange}</Text>
                </View>

                {amount && (
                    <>
                        <View style={styles.containerSummaryItem}>
                            <Text style={styles.summaryItemTitle}>
                                Shipping cost
                            </Text>
                            <Text style={styles.summaryItem}>
                                {currencyFormat(shippingCost)}
                            </Text>
                        </View>
                        <View style={styles.containerSummaryItem}>
                            <Text style={styles.summaryItemTitle}>Total</Text>
                            <Text style={styles.summaryItem}>
                                {currencyFormat(amount)}
                            </Text>
                        </View>
                        <CustomButton
                            title="Continue to Payment"
                            color="#fff"
                            fontFamily="poppins-semibold"
                            fontSize={16}
                            style={styles.customBtn}
                            onPress={onSubmitTransaction}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
};
