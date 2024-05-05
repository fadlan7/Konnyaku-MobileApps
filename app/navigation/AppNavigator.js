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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
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
