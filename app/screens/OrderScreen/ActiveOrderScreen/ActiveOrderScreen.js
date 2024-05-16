import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import WishlistService from '../../../services/konnyakuApi/WishlistService';
import { currencyFormat, url } from '../../../utils/currencyFormat';
import { useTheme } from '../../../context/ThemeContext';
import LocalStorage from '../../../utils/LocalStorage';
import UserService from '../../../services/konnyakuApi/UserService';
import { Button } from 'react-native';
import TransactionService from '../../../services/konnyakuApi/TransactionService';
import CustomButton from '../../../shared/components/CustomButton';

export const ActiveOrderScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { width, height } = Dimensions.get('window');
    const [orders, setOrders] = useState([]);
    const [processingProducts, setProcessingProducts] = useState([]);
    const localStorage = LocalStorage();
    const [userAccountId, setUserAccountId] = useState(null);
    const [userId, setUserId] = useState(null);
    const userService = useMemo(() => UserService(), []);
    const transactionService = useMemo(() => TransactionService(), []);

    const fetchTransaction = async () => {
        try {
            const response = await transactionService.getAll(userId);
            console.log(response.product);

            const newProducts = response.filter(
                (orders) => orders.status === 'PROCESSING'
            );

            setProcessingProducts(newProducts);
            console.log(newProducts.length);
            setOrders(response);
        } catch (error) {
            Alert.alert('Error Fetching Orders');
        }
    };

    const setId = async () => {
        const userAccountId = await localStorage.getData('userAccountId');

        setUserAccountId(userAccountId);
    };

    const getUserId = async () => {
        try {
            const userId = await userService.getUserIdByAccountId(
                userAccountId
            );
            setUserId(userId.data.id);
        } catch (error) {
            Alert.alert(error);
        }
    };

    useEffect(() => {
        setId();
        if (userAccountId) {
            getUserId();
        }

        if (userId) {
            fetchTransaction();
        }
        const unsubscribe = navigation.addListener('focus', () => {
            if (userId) {
                fetchTransaction();
            }
        });

        return unsubscribe;
    }, [userAccountId, userId]);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                paddingHorizontal: 15,
            },
            cardContainer: {
                marginVertical: 15,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
            },
            horizontalSeparator: {
                borderWidth: 0.5,
                borderColor: theme.colors.grey,
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
                width: '50%',
            },
            customBtn: {
                backgroundColor: theme.colors.primary,
                padding: 4,
                borderRadius: 10,
                alignItems: 'center',
            },
            prdName: {
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
            prdPrice: {
                fontFamily: 'poppins-semibold',
                fontSize: 16,
            },
            vendorNameContainer: {
                flexDirection: 'row',
            },
            vendorName: {
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
        })
    );
    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={
                    <View style={styles.horizontalSeparator} />
                }
                ListEmptyComponent={
                    processingProducts.length == 0 && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: height - 50,
                            }}
                        >
                            <Image
                                style={{
                                    width: width,
                                    height: width,
                                }}
                                source={require('../../../shared/assets/images/no-data.png')}
                                resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'poppins-semibold' }}>
                                Doesn't have a processing orders
                            </Text>
                        </View>
                    )
                }
                showsVerticalScrollIndicator={false}
                data={processingProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    'ProductDetail',
                                    item.product
                                )
                            }
                            style={styles.cardContainer}
                        >
                            <Image
                                source={{
                                    uri: `${url}${item.product.thumbnail.url}`,
                                }}
                                alt={item.product.thumbnail.name}
                                style={styles.prdImage}
                            />

                            <View style={styles.prdDescContainer}>
                                <Text numberOfLines={1} style={styles.prdName}>
                                    {item.product.name}
                                </Text>
                                <Text style={styles.prdPrice}>
                                    {currencyFormat(item.product.priceAmount)}
                                </Text>
                                <CustomButton
                                    title="Received"
                                    color="#fff"
                                    fontFamily="poppins-semibold"
                                    fontSize={15}
                                    style={styles.customBtn}
                                    // onPress={handleSubmit(onSubmit)}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};
