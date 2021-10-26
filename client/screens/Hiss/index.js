import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = "http://192.168.68.100:4000";

export default function Hiss({ navigation }) {
	const [image, setImage] = useState(null);
	const [content, setContent] = useState("")

	async function postHiss(hissData) {
		try {
			let token = await AsyncStorage.getItem("@access_token")
			return axios({
				method: "POST",
				url: `/hisses`,
				headers: {
					"Content-Type": "multipart/form-data",
					access_token: token
				},
				data: hissData
			})
				.then(({ data }) => {
					console.log(data)
					return true
				})
				.catch(err => {
					console.log(err);
					return false
				});
		} catch (error) {
			console.log(error);
			return false
		}

	}

	function handleHiss() {
		if (!content || (!image && !content)) {
			Alert.alert('Please make a "hiss" first')
		} else {
			const formData = new FormData()

			image ? formData.append('image', {
				name: 'testImage',
				uri: image,
				type: 'image/jpg'
			}) : null

			content ? formData.append('content', content) : null
			console.log(formData)
			postHiss(formData)
				.then((result) => {
					if (result) {
						Alert.alert('Hiss Success', null, 
							[
								{
									text: "Done",
									onPress: () => navigation.replace("MainApp"),
								}
							]
						);
					} else {
						Alert.alert('Hiss Failed')
					}
				})
		}
	}

	async function uploadImage() {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Sorry, we need camera roll permissions to make this work!');
			} else {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});

				if (!result.cancelled) {
					setImage(result.uri);
				}
			}
		}
	}

	return (
		<View>
			{/* <Text> {content} </Text> */}
			<TextInput
				multiline
				numberOfLines={10}
				style={{ padding: 10, borderWidth: 1, fontSize: 18 }}
				textAlignVertical={"top"}
				placeholder={"What's going on?"}
				onChangeText={setContent}
			/>
			<View style={{ flexDirection: "row", justifyContent: 'space-between', margin: 20 }}>
				<View style={{ flexDirection: "row", alignItems: 'center' }}>
					<TouchableOpacity onPress={() => uploadImage()} style={{ borderRadius: 99, borderWidth: 1, padding: 10 }}>
						<MaterialCommunityIcons
							name="image-plus"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
					{
						image ?
							<View style={{ flexDirection: "row", alignItems: 'center' }}>
								<Text style={{ color: 'green', marginLeft: 10 }}>Image is ready </Text>
								<MaterialCommunityIcons
									name="check"
									size={24}
									color="green"
								/>
							</View>
							:
							false
					}
				</View>
				<TouchableOpacity onPress={() => handleHiss()} style={{ borderRadius: 99, borderWidth: 1, padding: 10 }}>
					<FontAwesome
						name="send"
						size={24}
						color="black"
						on
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
