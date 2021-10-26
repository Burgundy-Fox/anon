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

export default function MostPopular({ navigation, route }) {
  const { dataHiss } = useSelector((state) => state.hissesReducer)
  // const { access_token } = useSelector(state => state.usersReducer)
  const [id, setId] = useState()
  const [popular, setPopular] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    let output = dataHiss.sort((a, b) => {
      return b.Likes.length - a.Likes.length
    }).filter(el => {
      return new Date(el.createdAt).getDate() < new Date(new Date().setDate(new Date().getDate() -3))})
    setPopular(output)
  }, [])

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
        data={popular}
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
