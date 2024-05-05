import React, { useEffect, useMemo, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomTextInput from '../../shared/components/CustomTextInput';
import CustomButton from '../../shared/components/CustomButton';
import CustomPasswordInput from '../../shared/components/CustomPasswordInput';

export const LoginScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { width } = Dimensions.get('window');

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    padding: 20,
                },
                headerTxt: {
                    fontFamily: 'poppins-bold',
                    fontSize: 24,
                },
                title: {
                    fontFamily: 'poppins-regular',
                    fontSize: 15,
                    color: theme.colors.grey,
                },
                loginTxt: {
                    fontFamily: 'poppins-semibold',
                    color: theme.colors.secondary,
                },
                containerInput: {
                    marginTop: 20,
                    paddingBottom: 50,
                },
                selectInput: {
                    borderWidth: 1,
                    borderColor: '#d9d4e7',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    marginBottom: 20,
                },
                customBtn: {
                    backgroundColor: theme.colors.secondary,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                },
            }),
        []
    );
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <Text style={styles.headerTxt}>Login</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Didn't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.loginTxt}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{
                        width: width,
                        height: width,
                    }}
                    source={require('../../shared/assets/images/login.png')}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.containerInput}>
                <Text>Username</Text>
                <CustomTextInput autoComplete="username" />

                <Text>Password</Text>
                <CustomPasswordInput />

                <CustomButton
                    title="LOG IN"
                    color="#fff"
                    fontFamily="poppins-semibold"
                    fontSize={18}
                    style={styles.customBtn}
                ></CustomButton>
            </View>
        </ScrollView>
    );
};
