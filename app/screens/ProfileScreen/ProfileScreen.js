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
import UserService from '../../services/konnyakuApi/UserService';

export const ProfileScreen = ({ navigation }) => {
    const authService = useMemo(() => AuthService(), []);
    const { theme } = useTheme();
    const localStorage = LocalStorage();
    const [shopId, setShopId] = useState(null);
    const [token, setToken] = useState(null);
    const [userAccountId, setUserAccountId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const userService = useMemo(() => UserService(), []);
    // const userService = UserService();

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

    const setId = async () => {
        const shopId = await localStorage.getData('shopId');
        const token = await localStorage.getData('token');
        const userAccountId = await localStorage.getData('userAccountId');

        setToken(token);
        setUserAccountId(userAccountId);

        if (shopId !== undefined) {
            setShopId(shopId);
        }
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
            <View style={{}}>
                {user && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile', user)}
                        style={styles.btnContainer}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name="person-outline" size={24} />
                            <Text>Edit Profile</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} />
                    </TouchableOpacity>
                )}
            </View>
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
