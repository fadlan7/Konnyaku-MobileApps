import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { RegisterScreen } from '../screens/RegisterScreen/RegisterScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { FavoriteScreen } from '../screens/FavoriteScreen/FavoriteScreen';
import { HistoryScreen } from '../screens/TransactionHistoryScreen/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getTabBarIcon(routeName, { color, focused, size }) {
    let name;
    switch (routeName) {
        case 'Home':
            name = focused ? 'home' : 'home-outline';
            break;
        case 'Favorite':
            name = focused ? 'heart' : 'heart-outline';
            break;
        case 'History':
            name = focused ? 'list' : 'list-outline';
            break;
    }
    return <Ionicons name={name} size={size} color={color} />;
}

function TabNavigation() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.secondary,
                    tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
                };
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorite" component={FavoriteScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
}

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} /> */}
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            <Stack.Screen name="TabHome" component={TabNavigation} /> 
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen}/>
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default AppNavigator;
