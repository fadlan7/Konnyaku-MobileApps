import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat, url } from '../../utils/currencyFormat';
import { Image } from 'react-native';
import WishlistService from '../../services/konnyakuApi/WishlistService';
import { Alert } from 'react-native';
import LocalStorage from '../../utils/LocalStorage';
import { jwtDecode } from 'jwt-decode';
import { Button } from 'react-native';

export const FavoriteScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { width, height } = Dimensions.get('window');
    const [products, setProducts] = useState([]);
    const wishlistService = useMemo(() => WishlistService(), []);
    const localStorage = LocalStorage();
    const [userAccId, setUserAccId] = useState('');

    const fetchWishlist = async () => {
        try {
            const response = await wishlistService.findAll(userAccId);
            setProducts(response.data);
        } catch (error) {
            Alert.alert('Error fetching wishlist');
        }
    };

    const checkToken = async () => {
        const token = await localStorage.getData('token');
        const decoded = jwtDecode(token);
        const userAccountId = decoded.sub;

        setUserAccId(userAccountId);
    };

    useEffect(() => {
        checkToken();
        if (userAccId) {
            fetchWishlist();
        }
        const unsubscribe = navigation.addListener('focus', () => {
            if (userAccId) {
                fetchWishlist();
            }
        });

        return unsubscribe;
    }, [userAccId]);

    const handleFetchDelete = async (id) => {
        try {
            await wishlistService.deleteById(id);
            Alert.alert('Success', 'Successfully deleted');
            fetchWishlist();
        } catch (error) {
            Alert.alert('Error fetching wishlist');
        }
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this product?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => handleFetchDelete(id),
                },
            ],
            { cancelable: false }
        );
    };

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
                    products.length == 0 && (
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
                                source={require('../../shared/assets/images/login.png')}
                                resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'poppins-semibold' }}>
                                Doesn't have a favorite products
                            </Text>
                        </View>
                    )
                }
                showsVerticalScrollIndicator={false}
                data={products}
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

                                {/* <View style={styles.vendorNameContainer}>
                                    <Text style={styles.vendorName}>
                                        {item.vendorName}
                                    </Text>
                                </View> */}
                            </View>
                            <TouchableOpacity
                                style={styles.favButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Ionicons
                                    name="trash"
                                    size={30}
                                    color={theme.colors.secondary}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};
