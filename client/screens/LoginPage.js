import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase/firebase'

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigation.replace('ChatRoom')
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <View>
            <View>
                <Input
                    placeholder="Enter your Email"
                    label="Email"
                    leftIcon={{ type: 'material', name: 'person' }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Enter your password"
                    label="Password"
                    leftIcon={{ type: 'material', name: 'lock' }}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Button
                    title="sign in"
                    onPress={signIn}
                />
                <Button
                    title="register"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    )
}

export default LoginPage
