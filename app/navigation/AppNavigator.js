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
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { ShopRegistrationScreen } from '../screens/ShopRegistrationScreen/ShopRegistrationScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActiveOrderScreen } from '../screens/OrderScreen/ActiveOrderScreen/ActiveOrderScreen';
import { CompletedOrderScreen } from '../screens/OrderScreen/CompletedOrderScreen/CompletedOrderScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabNavigation() {
    const { theme } = useTheme();
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarPressColor: theme.colors.primary,
                tabBarLabelStyle: { fontFamily: 'poppins-bold' },
                tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
            }}
        >
            <TopTab.Screen name="Active" component={ActiveOrderScreen} />
            <TopTab.Screen name="Completed" component={CompletedOrderScreen} />
        </TopTab.Navigator>
    );
}

function GetTabBarIcon(routeName, { color, focused, size }) {
    let name;
    switch (routeName) {
        case 'Home':
            name = focused ? 'home' : 'home-outline';
            break;
        case 'Favorite':
            name = focused ? 'heart' : 'heart-outline';
            break;
        case 'Order':
            name = focused ? 'list' : 'list-outline';
            break;
        case 'Profile':
            name = focused ? 'person' : 'person-outline';
            break;
    }
    return <Ionicons name={name} size={size} color={color} />;
}

function TabNavigation() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            // initialRouteName="Favorite"
            screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.primary,
                    tabBarIcon: (opt) => GetTabBarIcon(route.name, opt),
                };
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorite" component={FavoriteScreen} />
            <Tab.Screen name="Order" component={TopTabNavigation} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function StackNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            // initialRouteName="ShopRegistration"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TabHome" component={TabNavigation} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
            <Stack.Screen
                name="ShopRegistration"
                component={ShopRegistrationScreen}
            />
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
