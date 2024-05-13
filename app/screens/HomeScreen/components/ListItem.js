import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { currencyFormat } from '../../../utils/currencyFormat';
import { useNavigation } from '@react-navigation/native';
import LocalStorage from '../../../utils/LocalStorage';
import { jwtDecode } from 'jwt-decode';
import WishlistService from '../../../services/konnyakuApi/WishlistService';
import { Alert } from 'react-native';

const ListItem = React.memo(({ item }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const localStorage = LocalStorage();
    const wishlistService = WishlistService();
    const [userAccId, setUserAccId] = useState('');

    const handleFavButton = async (id) => {
        try {
            const data = {
                accountId: userAccId,
                productId: id,
            };

            await wishlistService.create(data);
            Alert.alert('Success', 'Successfully added product to wishlist');
        } catch (error) {
            Alert.alert(error.response.data.message);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = await localStorage.getData('token');
            const decoded = jwtDecode(token);
            const userAccountId = decoded.sub;

            setUserAccId(userAccountId);
        };

        checkToken();
    });

    const styles = useMemo(() =>
        StyleSheet.create({
            cardContainer: {
                marginBottom: 15,
                width: '48%',
            },
            prdImage: {
                width: '100%',
                height: 200,
                objectFit: 'contain',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.colors.grey,
                overflow: 'hidden',
            },
            favButton: {
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: theme.colors.primary,
                elevation: 5,
                paddingHorizontal: 5,
                paddingVertical: 5,
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
                marginLeft: 5,
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
        })
    );
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', item)}
            style={styles.cardContainer}
        >
            <View>
                <ImageBackground
                    source={{
                        uri: `http://10.10.102.39:8080${item.thumbnail.url}`,
                    }}
                    alt={item.thumbnail.name}
                    style={styles.prdImage}
                >
                    <TouchableOpacity
                        style={styles.favButton}
                        onPress={() => handleFavButton(item.id)}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={theme.colors.secondary}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            <View>
                <Text numberOfLines={1} style={styles.prdName}>
                    {item.name}
                </Text>
                <Text style={styles.prdPrice}>
                    {currencyFormat(item.priceAmount)}
                </Text>
            </View>
            {/* <View style={styles.vendorNameContainer}>
                <Ionicons
                    name="storefront"
                    size={16}
                    color={theme.colors.primary}
                />
                <Text style={styles.vendorName}>{item.vendorName}</Text>
            </View> */}
        </TouchableOpacity>
    );
});

export default ListItem;
