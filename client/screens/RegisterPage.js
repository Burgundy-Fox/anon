import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterPage = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user
                user.updateProfile({
                    email: email,
                    avatar: avatar? avatar : 'https://example.com/jane-q-user/profile.jpg',
                })
                    .then(() => {
                        // Update successful
                        // ...
                    })
                    .catch((error) => {
                        // An error occurred
                        // ...
                    })
                    navigation.popToTop()
                // ...
            })
            .catch((error) => {
                var errorMessage = error.message
                alert(error)
            })
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'badge' }}
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
            <Input
                placeholder="Enter your avatar url"
                label="Avatar"
                value={avatar}
                leftIcon={{ type: 'material', name: 'face' }}
                onChangeText={(text) => setAvatar(text)}
            />
            <Button title="register" style={styles.button} onPress={register}  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})

export default RegisterPage
