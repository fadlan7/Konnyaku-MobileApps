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
import { currencyFormat } from '../../utils/currencyFormat';
import CustomButton from '../../shared/components/CustomButton';
import LocalStorage from '../../utils/LocalStorage';
import UserService from '../../services/konnyakuApi/UserService';

export const CheckoutScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { name, description, priceAmount, weight, details, thumbnail, shop } =
        route.params;
    const { width, height } = Dimensions.get('window');
    const localStorage = LocalStorage();
    const [userAccountId, setUserAccountId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const userService = useMemo(() => UserService(), []);

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

    const fetchUserData = async () => {
        try {
            const data = await userService.getUserByUserId(userId);
            setUser(data.data);
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
            fetchUserData();
        }
    }, [userAccountId, userId]);

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
                width: '45%',
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
            <View
                style={{
                    margin: 15,
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
                    <View
                        style={styles.horizontalLine}
                    />
                </View>

                <View>
                    <Text style={styles.header}>Order</Text>
                    <View style={styles.cardContainer}>
                        <Image
                            source={{
                                uri: `http://10.10.102.39:8080${thumbnail.url}`,
                            }}
                            alt={thumbnail.name}
                            style={styles.prdImage}
                        />

                        <View style={styles.prdDescContainer}>
                            <Text numberOfLines={1} style={styles.prdName}>
                                {name}
                            </Text>
                            <Text style={styles.prdPrice}>
                                {currencyFormat(priceAmount)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.horizontalLine}
                    />
                </View>

                <Text style={styles.header}>Ringkasan Belanja</Text>
                <Text>{priceAmount}</Text>
            </View>

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
