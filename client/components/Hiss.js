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
import { SvgUri } from 'react-native-svg'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { destroyHiss } from '../store/actions/hisses'
import { ListItem } from 'react-native-elements/dist/list/ListItem'
import { EvilIcons } from '@expo/vector-icons'
import { auth } from '../firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Hiss({ navigation, item, route }) {
    const access_token = useSelector((state) => state.usersReducer.access_token)
	// const currentEmail = auth.currentUser.email
	const [avatar, setAvatar] = useState('')
	const [id, setId] = useState('')
	const [email, setEmail] = useState('')
    const dispatch = useDispatch()

	async function loadCurrentUser() {
		try {
			let ava = await AsyncStorage.getItem('@avatar')
			let email = await AsyncStorage.getItem('@email')
			let id = await AsyncStorage.getItem('@UserId')
			setAvatar(ava)
			setEmail(email)
			setId(id)
			// dispatch({type: 'SET AVATAR', payload: ava})
		} catch (error) {
			console.log(error)
		}	
	}

	loadCurrentUser()

    function handleReply() {
        navigation.navigate('Reply')
    }

    function handleLike() {
        console.log('like bertambah 1')
    }

    function handleEdit(access_token, id) {
        console.log(access_token, id)
    }

    function handleDelete(access_token, id) {
        dispatch(destroyHiss(access_token, id))
    }

	function handleChat(user) {
		// console.log(user)
		navigation.navigate( 'Chat', {
			user2: {
                _id: user.email,
                avatar: user.avatar,
				username: `Anon${user.id}`
            },
			user: {
                _id: email,
                avatar: avatar,
				username: `Anon${id}`
            },
		})
	}

    //   return (
    //     <View>
    //       <Text>Loading...</Text>
    //     </View>
    //   );
	if (email) {
		return (
			<View
				key={item.id}
				style={{
					marginBottom: 5,
					borderBottomColor: 'black',
					borderBottomWidth: 1,
					flexDirection: 'row',
				}}
			>
				<Image source={{ uri: item.User.avatar }} style={styles.img} />
	
				<View style={{ marginLeft: 8 }}>
					<Text style={{ marginVertical: 5, fontSize: 16 }}>
						{`Anon${item.User.id}`}
					</Text>
	
					{item.image_url ? (
						<Image
							source={{ uri: item.image_url }}
							style={{ width: 100, height: 100, marginVertical: 5 }}
							key={item.id}
						/>
					) : null}
	
					<Text style={{ fontSize: 18 }}>{item.content}</Text>
					<View
						style={{
							marginVertical: 5,
							flexDirection: 'row',
						}}
					>
						{route === 'Home' ? (
							<>
								<TouchableOpacity onPress={() => handleReply()}>
									<FontAwesome
										name="comment-o"
										size={18}
										color="black"
										style={{ marginLeft: 110 }}
									/>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleLike()}>
									<AntDesign
										name="hearto"
										size={18}
										color="black"
										style={{ marginLeft: 50 }}
									/>
								</TouchableOpacity>
								{item.User.email !== email ? <TouchableOpacity onPress={() => handleChat(item.User)}>
									<EvilIcons
										name="envelope"
										size={24}
										color="black"
										style={{ marginLeft: 50 }}
									/>
								</TouchableOpacity>
								:
								null}
							</>
						) : (
							<>
								<TouchableOpacity
									onPress={() =>
										handleEdit(access_token, item.id)
									}
								>
									<AntDesign
										name="edit"
										size={24}
										color="black"
										style={{ marginLeft: 50 }}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										handleDelete(access_token, item.id)
									}
								>
									<AntDesign
										name="delete"
										size={18}
										color="black"
										style={{ marginLeft: 50 }}
									/>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</View>
		)
	} else {
		return (
			<Text>Loading....</Text>
		)
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
        borderWidth: 1,
    },
})
