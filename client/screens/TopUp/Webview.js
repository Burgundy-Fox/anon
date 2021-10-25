import React from 'react'
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native'

export default function Webview({route}) {
    return (
        <WebView source={{ uri: route.params.url }} />
    )
}
