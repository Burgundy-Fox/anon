import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { db, auth } from '../firebase/firebase'
import { AntDesign } from '@expo/vector-icons'
import {
    RotationGestureHandler,
    TouchableOpacity,
} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const ChatRoom = ({ navigation, route }) => {

    const signOut = () => {
        auth.signOut()
            .then(() => {
                // Sign-out successful.
                navigation.replace('Login')
            })
            .catch((error) => {
                // An error happened.
            })
    }

    useLayoutEffect(() => {
        return navigation.setOptions({
            headerLeft: () => {
                return (
                    <View
                        style={{
                            marginRight: 30,
                        }}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: auth.currentUser?.photoURL,
                            }}
                        ></Avatar>
                    </View>
                )
            },
            headerRight: () => {
                return (
                    <TouchableOpacity
                        style={{
                            marginRight: 30,
                        }}
                        onPress={signOut}
                    >
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                )
            },
        })
    })

    function handleOnPress(name) {
 
        switch (name) {
            case 'BangJago':
                navigation.navigate('Chat', {
                    user2: {
                        _id: 'bangjago@mail.com',
                    },
                })
                break
            case 'Bud':
                navigation.navigate('Chat', {
                    user2: {
                        _id: 'bud@mail.com'
                    },
                })
                break
            case 'Malih':
                navigation.navigate('Chat', {
                    user2: {
                        _id: 'malih@mail.com',
                    },
                })
                break
            default:
                console.log(name)
        }
    }

    const [users, setUsers] = useState([])

    return (
        <View>
            <Text>Welcome to User Chat room</Text>
            <View style={{ marginBottom: 5 }}>
                <Button title="Bud" onPress={() => handleOnPress('Bud')} />
            </View>
            <View style={{ marginBottom: 5 }}>
                <Button
                    title="BangJago"
                    onPress={() => handleOnPress('BangJago')}
                />
            </View>
            <View style={{ marginBottom: 5 }}>
                <Button title="Malih" 
                onPress={() => handleOnPress('Malih')} />
            </View>
        </View>
    )
}

export default ChatRoom
