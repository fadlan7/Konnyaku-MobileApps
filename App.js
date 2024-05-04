import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';
import ThemeContextProvider from './app/context/ThemeContext';
import * as Font from 'expo-font';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'poppins-bold': require('./app/shared/assets/fonts/Poppins-Bold.ttf'),
                'poppins-light': require('./app/shared/assets/fonts/Poppins-Light.ttf'),
                'poppins-medium': require('./app/shared/assets/fonts/Poppins-Medium.ttf'),
                'poppins-regular': require('./app/shared/assets/fonts/Poppins-Regular.ttf'),
                'poppins-semibold': require('./app/shared/assets/fonts/Poppins-SemiBold.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null; // or loading indicator
    }

    return (
        <ThemeContextProvider>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </ThemeContextProvider>
    );
}
