import React, { useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Image, StyleSheet, View, Text, Dimensions, Alert } from 'react-native';
import LocalStorage from '../../utils/LocalStorage';
import AuthService from '../../services/konnyakuApi/AuthService';

export const SplashScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const localStorage = LocalStorage();
    const authService = AuthService();
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        const delay = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            checkToken();
        };
        delay();
    }, []);

    const checkToken = async () => {
        if (await localStorage.getData('token')) {
            try {
                await authService.checkToken();
                navigation.replace('TabHome');
            } catch (error) {
                navigation.replace('Onboarding');
            }
        } else {
            navigation.replace('Onboarding');
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
                    height: height,
                    width: width,
                },
            }),
        []
    );

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../shared/assets/images/logo.png')}
            />
        </View>
    );
};
