import React from 'react'
import { View, Image } from 'react-native'

export default function Loader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image style={{ alignSelf: 'center' }} source={require('../assets/loader.gif')} />
        </View>
    )
}
