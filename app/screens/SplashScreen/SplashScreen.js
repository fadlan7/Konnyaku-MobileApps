import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Image, StyleSheet, View, Text } from 'react-native';

export const SplashScreen = () => {
    const { theme } = useTheme();

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
            <Image
                style={styles.image}
                source={require('../../shared/assets/images/logo.png')}
            />
        </View>
    );
};
