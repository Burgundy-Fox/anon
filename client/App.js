import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import ChatPage from './screens/ChatPage'
import ChatRoom from './screens/ChatRoom'
const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                <Stack.Screen name="Chat" component={ChatPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
