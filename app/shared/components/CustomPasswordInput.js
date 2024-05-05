import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

const CustomPasswordInput = ({ ...rest }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry}
                {...rest}
            />
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleSecureEntry}
            >
                <Text>
                    {secureTextEntry ? (
                        <Ionicons name="eye-off" size={24} color={'#a786df'} />
                    ) : (
                        <Ionicons name="eye" size={24} color={'#a786df'} />
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d4e7',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    toggleButton: {
        padding: 10,
    },
});

export default CustomPasswordInput;
