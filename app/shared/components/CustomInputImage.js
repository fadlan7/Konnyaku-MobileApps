import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const CustomInputImage = ({ imageUri, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                    borderColor: theme.colors.grey,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginTop: 5,
                    marginBottom: 20
                }}
            >
                {imageUri == '' ? (
                    <Ionicons name="add-outline" size={30} />
                ) : (
                    <ImageBackground
                        source={{
                            uri: imageUri,
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name="add-outline"
                            size={40}
                            color={theme.colors.grey}
                        />
                    </ImageBackground>
                )}
            </View>
        </TouchableOpacity>
    );
};
