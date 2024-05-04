import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default AppNavigator;
