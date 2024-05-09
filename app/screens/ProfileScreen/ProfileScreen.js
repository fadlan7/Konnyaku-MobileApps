import React, { useMemo } from 'react';
import { Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AuthService from '../../services/konnyakuApi/AuthService';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export const ProfileScreen = ({ navigation }) => {
    const authService = AuthService();
    const { theme } = useTheme();

    const handleLogout = () => {
        Alert.alert('Logout', 'apakah yakin ingin logout?', [
            { style: 'cancel', text: 'Cancel' },
            {
                style: 'default',
                text: 'Logout',
                onPress: async () => {
                    authService.logout();
                    navigation.replace('Login');
                },
            },
        ]);
    };

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: 15,
            },
        })
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    marginVertical: 8,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                    }}
                >
                    <Ionicons name="exit-outline" size={24} />
                    <Text>Logout</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} />
            </TouchableOpacity>
        </View>
    );
};
