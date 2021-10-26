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
                    username: data.user.username
                },
                user: {
                    _id: data.user2._id,
                    avatar: data.user2.avatar,
                    username: data.user2.username
                },
            })
        } else {
            navigation.navigate('Chat', {
                user2: {
                    _id: data.user2._id,
                    avatar: data.user2.avatar,
                    username: data.user2.username

                },
                user: {
                    _id: data.user._id,
                    avatar: data.user.avatar,
                    username: data.user.username
                },
            })
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOnPress(item)}>
            <View style={styles.container}>
            <View>
                {item.user2._id !== currentId ? 
                <>
                <Image style={styles.img} source={{ uri: item.user2.avatar }} />
                    <Text
                        style={{
                            marginVertical: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                    >
                        {item.user2.username}
                    </Text> 
                    </>
                    :
                    <>
                    <Image style={styles.img} source={{ uri: item.user.avatar }} />
                    <Text
                        style={{
                            marginVertical: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                    >
                        {item.user.username}
                    </Text>  
                    </>}     
                <View>
                    {/* {console.log(item.user2._id)}
                    {console.log(currentId, 'ini currentId')} */}
                </View>
                    <Text>{`·>  ${item.text}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    if (users.length) {
        const filteredArr = users.reduce((acc, current) => {
            const x = acc.find((item) => item.user2._id === current.user2._id)
            if (!x) {
                return acc.concat([current])
            } else {
                return acc
            }
        }, [])
        const filteredArr2 = filteredArr.reduce((acc, current) => {
            const x = acc.find((item) => item.user._id === current.user2._id)
            if (!x) {
                return acc.concat([current])
            } else {
                return acc
            }
        }, [])

        return (
            <View styles={styles.container}>
                <FlatList
                    data={filteredArr2}
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
        padding: 10,
        borderWidth: 1,
        flexDirection:'row',
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})

export default DirectMessage
