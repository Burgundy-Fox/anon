import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { auth } from '../firebase'
const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = uPeState('')
    const [avatar, setAvatar] = useState('')
    auth.createUser(username, password)
    .then((userCredential) => {
        let user = userCredential.user
        user.updateProfile({
            username,
            avatar
          }).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });  
    })
    .catch(error => {
        console.log(error)
    })
    return (
        <View>
            <TextInput
            label="username"
            value={username}
            onChangeText={username => setUsername(username)}
            />
             <TextInput
            label="password"
            value={password}
            onChangeText={password => setPassword(password)}
            />
             <TextInput
            label="password"
            value={password}
            onChangeText={password => setPassword(password)}
            />
        </View>
    )
}

export default RegisterPage
