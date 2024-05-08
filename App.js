import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';
import ThemeContextProvider from './app/context/ThemeContext';
import * as Font from 'expo-font';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const queryClient = new QueryClient();

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
        return null;
    }

    return (
        <ThemeContextProvider>
            <SafeAreaProvider>
                {/* <QueryClientProvider client={queryClient}> */}
                    <AppNavigator />
                {/* </QueryClientProvider> */}
            </SafeAreaProvider>
        </ThemeContextProvider>
    );
}
