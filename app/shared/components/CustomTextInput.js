import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

function CustomTextInput({ preIcon, ...rest }) {
    return (
        <View style={styles.container}>
            {preIcon && preIcon}
            <TextInput style={styles.input} {...rest} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d4e7',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
});

export default CustomTextInput;
