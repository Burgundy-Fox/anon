import React from 'react'
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native'

export default function Webview({navigation, route}) {
    return (
        <WebView source={{ uri: route.params.url }} 
            onNavigationStateChange={(navState) => {
                // console.log(navState)
                if(navState.url.includes('www.google.com')){
                    navigation.navigate('MyAccount',{ updateDetails : true})
                }
            }} 
        />
    )
}
