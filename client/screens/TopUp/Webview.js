import React from 'react'
import { WebView } from 'react-native-webview';

export default function Webview({navigation, route}) {
    return (
        <WebView source={{ uri: route.params.url }} 
            onNavigationStateChange={(navState) => {
                if(navState.url.includes('www.google.com')){
                    navigation.navigate('MyAccount',{ updateDetails : true})
                }
            }} 
        />
    )
}
