import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    Card,
    Image,
    StyleSheet,
} from 'react-native'
import { db, auth } from '../../firebase/firebase'
import { AntDesign } from '@expo/vector-icons'
import {
    RotationGestureHandler,
    TouchableOpacity,
} from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { SvgCssUri, SvgUri } from 'react-native-svg' 
import axios from 'axios'

const DirectMessage = ({ navigation, route }) => {
    // console.log(auth.currentUser.photoURL)
    const currentId = auth.currentUser.email
    // console.log('ini currentUser nya')
    // console.log(auth.currentUser)

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
                            // console.log(doc)
                            if (
                                doc.data().user._id === currentId ||
                                doc.data().user2._id === currentId
                            ) {
                                // console.log(doc)
                                return {
                                    user: doc.data().user,
                                    text: doc.data().text,
                                    user2: doc.data().user2,
                                }
                            }
                        })
                        .filter((el) => el !== undefined)
                )
            })
        return unsubscribe
    }, [])
    const [users, setUsers] = useState([])
    // console.log(users)

    function handleOnPress(data) {
        // const user = await axios('http://http://192.168.18.2:4000/user/login')
        // console.log('ini data')
        // console.log(data)
        if (currentId === data.user2._id) {
            navigation.navigate('Chat', {
                user2: {
                    _id: data.user._id,
                    avatar: data.user.avatar,
                },
                user: {
                    _id: data.user2._id,
                    avatar: data.user2.avatar,
                },
            })
        } else {
            navigation.navigate('Chat', {
                user2: {
                    _id: data.user2._id,
                    avatar: data.user2.avatar,
                },
                user: {
                    _id: data.user._id,
                    avatar: data.user.avatar,
                },
            })
        }
            
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOnPress(item)}>
            <View
                style={{
                    marginBottom: 5,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            >   
                {/* <SvgUri
                    width="100%"
                    height="100%"
                    uri='https://avatars.dicebear.com/api/bottts/anon-1489.svg'
                />         */}
                <View>
                    {console.log(item.user2._id)}
                    {console.log(currentId, 'ini currentId')}
                    {item.user2._id !== currentId ? 
                    <Text
                        style={{
                            marginVertical: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                    >
                        {item.user2._id}
                    </Text> 
                    :
                    <Text
                        style={{
                            marginVertical: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                    >
                        {item.user._id}
                    </Text>  }
                </View>
                <View>
                    <Text
                        style={{ marginVertical: 5, fontSize: 16 }}
                    >{`·>  ${item.text}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    if (users.length) {
        const filteredArr = users.reduce((acc, current) => {
            const x = acc.find((item) => item.user2._id === current.user2._id ) 
            const y = acc.find((item) => item.user._id === current.user._id) 
            // console.log(x, 'ini x')
            if (!x && !y) { 
                return acc.concat([current])
            } else {
                return acc
            }
        }, [])

        return (
            <View styles={styles.container}>
                <FlatList
                    data={filteredArr}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                        // console.log(item)
                        return index.toString()
                    }}
                />
            </View>
        )
    } else {
        return <Text>Loading...</Text>
        // return <Button title="bud"
        // onPress={()=> handleOnPress('bangjago@mail.com')}></Button>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})

export default DirectMessage
