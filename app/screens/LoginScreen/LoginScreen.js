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
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import AuthService from '../../services/konnyakuApi/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import LocalStorage from '../../utils/LocalStorage';

export const LoginScreen = ({ navigation }) => {
    const schema = z.object({
        email: z
            .string()
            .email('This is not a valid email address')
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Email is required'
            ),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .optional()
            .refine(
                (val) => val !== undefined && val.length > 0,
                'Password is required'
            ),
    });

    const {
        control,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });

    const authService = AuthService();
    const { theme } = useTheme();
    const { width } = Dimensions.get('window');
    const localStorage = LocalStorage();

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;

            const loginData = { username: email, password };
            const response = await authService.login(loginData);

            if (response.statusCode === 200) {
                clearForm();
                localStorage.setData('token', response.data.token);

                if (response.data.shopId !== null) {
                    localStorage.setData('shopId', response.data.shopId);
                }

                navigation.replace('TabHome');
                Alert.alert('Success', 'Login Success');
            }
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    };

    const clearForm = () => {
        reset();
        clearErrors();
    };

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
                    color: theme.colors.primary,
                },
                containerInput: {
                    marginTop: 20,
                    paddingBottom: 50,
                },
                customBtn: {
                    backgroundColor: theme.colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                },
                formErrorMessage: {
                    color: theme.colors.error,
                },
                containerInputAndError: {
                    marginBottom: 20,
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
                <View style={styles.containerInputAndError}>
                    <Text>Email</Text>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                autoComplete="email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                    />
                    {errors.email && (
                        <Text style={styles.formErrorMessage}>
                            {errors.email.message}
                        </Text>
                    )}
                </View>

                <View style={styles.containerInputAndError}>
                    <Text>Password</Text>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomPasswordInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                    />
                    {errors.password && (
                        <Text style={styles.formErrorMessage}>
                            {errors.password.message}
                        </Text>
                    )}
                </View>

                <CustomButton
                    title="LOG IN"
                    color="#fff"
                    fontFamily="poppins-semibold"
                    fontSize={18}
                    style={styles.customBtn}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </ScrollView>
    );
};
