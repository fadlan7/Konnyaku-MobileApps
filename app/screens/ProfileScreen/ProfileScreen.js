import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Linking,
} from 'react-native';
import AuthService from '../../services/konnyakuApi/AuthService';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import LocalStorage from '../../utils/LocalStorage';

export const ProfileScreen = ({ navigation }) => {
    const authService = AuthService();
    const { theme } = useTheme();
    const localStorage = LocalStorage();
    const [shopId, setShopId] = useState(null);
    const [token, setToken] = useState(null);

    const handleLogout = () => {
        Alert.alert('Logout', 'apakah yakin ingin logout?', [
            { style: 'cancel', text: 'Cancel' },
            {
                style: 'default',
                text: 'Logout',
                onPress: async () => {
                    setToken(null);
                    setShopId(null);
                    authService.logout();
                    navigation.replace('Onboarding');
                },
            },
        ]);
    };

    const checkShopId = async () => {
        const shopId = await localStorage.getData('shopId');
        const token = await localStorage.getData('token');

        setToken(token);

        if (shopId !== undefined) {
            setShopId(shopId);
        }
    };

    useEffect(() => {
        setToken(null)
        checkShopId();
    }, []);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: 15,
            },
            btnContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                marginVertical: 8,
            },
            iconContainer: {
                flex: 1,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
            },
        })
    );

    return (
        <View style={styles.container}>
            {shopId !== null ? (
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(
                            `https://github.com/login?token='${token}'&shopId='${shopId}'`
                        );
                    }}
                    style={styles.btnContainer}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="storefront-outline" size={24} />
                        <Text>Manage Store</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ShopRegistration')}
                    style={styles.btnContainer}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="storefront-outline" size={24} />
                        <Text>New Shop</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onPress={handleLogout}
                style={styles.btnContainer}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="exit-outline" size={24} />
                    <Text>Logout</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} />
            </TouchableOpacity>
        </View>
    );
};
