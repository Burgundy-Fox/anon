import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { getAllHiss } from '../../store/actions/hisses'
import { getUserDetails } from '../../store/actions/user'
import Hiss from '../../components/Hiss'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Mention({ navigation, route }) {
    const { dataHiss } = useSelector((state) => state.hissesReducer)
    const [id, setId] = useState()
    const [mentions, setMentions] = useState()

    async function getUserId() {
        try {
            let UserId = await AsyncStorage.getItem('@UserId')
            setId(UserId)
            return UserId
            // console.log(id, 'ini id')
        } catch (error) {
            console.log(error)
            return false
        }
    }
    const dispatch = useDispatch()

    useEffect(() => {
        getUserId()
        .then((UserId) => {
          // console.log(UserId, 'ini userId')
            if (UserId) {
                const filteredDataHiss = dataHiss.filter((el) =>
                    el.content.includes(`@Anon${UserId}`)
                )
                console.log(dataHiss)
                // console.log(filteredDataHiss)
                setMentions(filteredDataHiss)
            } else {
            }
        })
    }, [dataHiss])

    if (!dataHiss.length) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={mentions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Hiss
                            item={item}
                            route={route.name}
                            navigation={navigation}
                        />
                    )
                }}
            />
        </View>
    )
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
        borderWidth: 1,
    },
})
