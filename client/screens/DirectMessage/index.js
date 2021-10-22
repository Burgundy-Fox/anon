import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { db, auth } from '../../firebase/firebase'
import { AntDesign } from '@expo/vector-icons'
import {
    RotationGestureHandler,
    TouchableOpacity,
} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { SvgUri } from 'react-native-svg'

const DirectMessage = ({ navigation, route }) => {
    // console.log(auth.currentUser.photoURL)
    const currentId = auth.currentUser.email

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
                        {/* <SvgUri 
                        height="100%"
                        width="100%"
                        uri="https://avatars.dicebear.com/api/bottts/anon-1489.svg"/> */}
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

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                setUsers(
                    snapshot.docs
                        .map((doc) => {
                            if (
                                (doc.data().user._id === currentId ||
                                    doc.data().user2._id === currentId) &&
                                (doc.data().user._id === 'bangjago@mail.com' ||
                                    doc.data().user2._id === 'bangjago@mail.com')
                            ) {
                                // console.log(doc)
                                return {
                                    user1: doc.data().user,
                                    user2: doc.data().user2,
                                }
                            }
                        })
                        .filter((el) => el !== undefined)
                )
                // console.log(snapshot.docs)
                // setUsers(
                //     snapshot.docs.map((doc) => {
                //         console.log(doc)
                //     })
                // )
            })
        return unsubscribe
    }, [])
    const [users, setUsers] = useState([])
    console.log(users)

    const renderItem = ({item }) => (
        
        // console.log(user)
        <View>
        <Text>{item.user2._id}</Text>
        </View>
    );

    if (users.length) {
        return (
            <View>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    } else {
        return <Text>Loading...</Text>
    }
  
}

export default DirectMessage
