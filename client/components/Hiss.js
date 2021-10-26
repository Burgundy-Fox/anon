import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { destroyHiss, getAllHiss } from "../store/actions/hisses";
// import { ListItem } from "react-native-elements/dist/list/ListItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Hiss({ navigation, item, route }) {
	const access_token = useSelector((state) => state.usersReducer.access_token)
	const baseUrl = "http://192.168.18.2:4000";
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

	function handleReply(id) {
		// console.log(`Anon${id}`)
		navigation.navigate("Reply",{
			username: `@Anon${id}`
		});
	}

	function handleLike(hissId) {
		axios({
			method: 'post',
			url: `${baseUrl}/like/${hissId}`,
			headers: {
				access_token
			}
		})
			.then((result) => {
				dispatch(getAllHiss(access_token))
				console.log("like bertambah 1");
			}).catch((err) => {
				console.log(err);
			});
	}

	function handleEdit(access_token, hissId) {
		// console.log(access_token, id);
		navigation.navigate("Hiss", { hissId, from: route });
	}

	function handleDelete(access_token, id) {
		dispatch(destroyHiss(access_token, id))
	}

	function handleChat(user) {
		// console.log(user)
		navigation.navigate('Chat', {
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

	if (email) {
		return (
			<View
				key={item.id}
				style={{
					marginBottom: 10,
					paddingVertical: 5,
					borderBottomColor: 'silver',
					borderBottomWidth: 0.5,
					flexDirection: 'row',
				}}
			>
				<Image source={{ uri: item.User.avatar }} style={styles.img} />

				<View style={{ marginLeft: 10 }}>
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

					<Text style={{ fontSize: 18, marginVertical: 7}}>{item.content}</Text>
					<View
						style={{
							marginVertical: 5,
							flexDirection: 'row',
						}}
					>
						{route === 'Home' || route === 'Mention' ? (
							<>
								<TouchableOpacity style={{ marginLeft: 110, flexDirection: 'row' }} onPress={() => handleReply(item.User.id)}>
									<FontAwesome
										name="comment-o"
										size={18}
										color="black"
									/>
								</TouchableOpacity>
								<TouchableOpacity style={{ marginLeft: 50, flexDirection: 'row' }} onPress={() => handleLike(item.id)}>
									<AntDesign
										name= { item.Likes.filter(el => el.UserId == id).length ? 'heart' : 'hearto'}
										size={18}
										color= { item.Likes.filter(el => el.UserId == id).length ? 'red' : 'black'}
									/>
									<Text>{" "}{item.Likes.length || "" }</Text>
								</TouchableOpacity>
								{
									item.User.email !== email ?
										<TouchableOpacity style={{marginLeft: 50}} onPress={() => handleChat(item.User)}>
											<EvilIcons
												name="envelope"
												size={24}
												color="black"
											/>
										</TouchableOpacity>
										:
										null
								}
							</>
						) : (
							<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
								<TouchableOpacity
								style= {{ marginLeft: 50}}
									onPress={() =>
										handleEdit(access_token, item.id)
									}
								>
									<AntDesign
										name="edit"
										size={24}
										color="black"
									/>
								</TouchableOpacity>
								<TouchableOpacity
								style= {{ marginLeft: 50}}
									onPress={() =>
										handleDelete(access_token, item.id)
									}
								>
									<AntDesign
										name="delete"
										size={18}
										color="black"
									/>
								</TouchableOpacity>
							</View>
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
