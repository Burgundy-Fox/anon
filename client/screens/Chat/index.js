import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
import { auth, db } from '../../firebase/firebase'
import { AntDesign } from '@expo/vector-icons'
import {
    RotationGestureHandler,
    TouchableOpacity,
} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({ navigation, route }) => {

    const currentId = auth.currentUser.email

    useLayoutEffect(() => {
        return navigation.setOptions({
            headerRight: () => {
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
            }
            // ,
            // headerRight: () => {
            //     return (
            //         <TouchableOpacity
            //             style={{
            //                 marginRight: 30,
            //             }}
            //             onPress={signOut}
            //         >
            //             <AntDesign name="logout" size={24} color="black" />
            //         </TouchableOpacity>
            //     )
            // },
        })
    })

    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs
                        .map((doc) => {
                            if (
                                (doc.data().user._id ===
                                    currentId ||
                                    doc.data().user2._id ===
                                        currentId) &&
                                (doc.data().user._id ===
                                    route.params.user2._id ||
                                    doc.data().user2._id ===
                                        route.params.user2._id)
                            ) {
                                return {
                                    _id: doc.data()._id,
                                    createdAt: doc.data().createdAt.toDate(),
                                    text: doc.data().text,
                                    user: doc.data().user,
                                }
                            }
                        }).filter(el => el!==undefined)
                )
            })
        return unsubscribe
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        )
        const { _id, createdAt, text, user } = messages[0]

        db.collection('chats').add({
            ...messages[0],
            user2: route.params.user2,
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth.currentUser?.email,
                avatar: auth.currentUser?.photoURL,
            }}
        />
    )
}

export default Chat