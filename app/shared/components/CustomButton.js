import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

function CustomButton({ title, color, fontSize, fontFamily, ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <Text style={{ color, fontSize, fontFamily, fontWeight: 600 }} >{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton