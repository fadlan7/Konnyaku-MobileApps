import React from 'react'
import { TextInput, View } from 'react-native'

function CustomTextIput({ preIcon, ...rest }) {

    return (
        <View style={
            {
                flexDirection: 'row',
                alignItems: 'center', borderBottomWidth: 1,
                paddingHorizontal: 8,
                height: 48,
            }
        }>
            {preIcon && preIcon}
            <TextInput style={{ flex: 1, padding: 8, marginStart: 8 }} {...rest} />
        </View>
    )
}

export default CustomTextIput