import React, { useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Image, StyleSheet, View, Text } from 'react-native';
import LocalStorage from '../../utils/LocalStorage';
import AuthService from '../../services/konnyakuApi/AuthService';

export const SplashScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const localStorage = LocalStorage();
    const authService = AuthService();

    useEffect(() => {
        const delay = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            checkToken();
        };
        delay();
    }, []);

    const checkToken = async () => {
        const token = await localStorage.getData('token');
        if (token) {
            try {
                await authService.checkToken();
                navigation.replace('TabHome');
            } catch (error) {
                navigation.replace('Login');
            }
        } else {
            navigation.replace('Login');
        }
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                image: {
                    objectFit: 'scale-down',
                    height: 150,
                },
            }),
        []
    );

    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.image}
                source={require('../../shared/assets/images/logo.png')}
            /> */}
            <Text>SplashScreeen</Text>
        </View>
    );
};
