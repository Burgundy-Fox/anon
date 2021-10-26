import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	Login,
	Register,
	Home,
	MostPopular,
	Mention,
	DirectMessage,
	MyAccount,
	Reply,
	Hiss,
	TopUp,
	Webview
} from "../screens";

import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SplashScreen from "../screens/Splash Screen";
import Chat from "../screens/Chat";
import { postHiss } from "../store/actions/hisses";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MainApp({ navigation }) {
	const [avatar, setAvatar] = useState('')
	const dispatch = useDispatch()
	// const avatar = useSelector(state => state.usersReducer.avatar)
	// co
	async function loadAvatar() {
		try {
			let ava = await AsyncStorage.getItem('@avatar')
			setAvatar(ava)
			// dispatch({type: 'SET AVATAR', payload: ava})
		} catch (error) {
			console.log(error)
		}	
	}

	loadAvatar()

	const Tab = createBottomTabNavigator();

	function handleMyAccount() {
		navigation.navigate("MyAccount");
	}

	function handleGoToHiss() {
		navigation.navigate("Hiss");
	}

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconColor;

					if (route.name === "Home") {
						iconColor = focused ? "#1E272E" : "#767676";
						return <Entypo name="home" size={24} color={iconColor} />;
					} else if (route.name === "Most Popular") {
						iconColor = focused ? "#1E272E" : "#767676";
						return <Feather name="trending-up" size={24} color={iconColor} />;
					} else if (route.name === "Mention") {
						iconColor = focused ? "#1E272E" : "#767676";
						return <FontAwesome name="at" size={24} color={iconColor} />;
					} else if (route.name === "Direct Message") {
						iconColor = focused ? "#1E272E" : "#767676";
						return <FontAwesome name="envelope" size={24} color={iconColor} />;
					}
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarShowLabel: false,
					title: (
						<View>
							<Image
								source={require("../assets/chameleon.png")}
								style={{
									width: 35,
									height: 35,
								}}
							/>
						</View>
					),
					headerTitleAlign: "center",
					headerLeft: () => (
						<TouchableOpacity onPress={() => handleMyAccount()}>
							<Image
								source={{ uri: avatar }}
								style={{
									width: 40,
									height: 40,
									borderRadius: 40 / 2,
									marginLeft: 10,
								}}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity onPress={() => handleGoToHiss()}>
							<Ionicons
								name="create-outline"
								size={29}
								color="black"
								style={{ marginRight: 10 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name="Most Popular"
				component={MostPopular}
				options={{
					tabBarShowLabel: false,
					title: "Most Popular",
					headerTitleAlign: "center",
				}}
			/>
			<Tab.Screen
				name="Mention"
				component={Mention}
				options={{
					tabBarShowLabel: false,
					title: "Mention",
					headerTitleAlign: "center",
				}}
			/>
			<Tab.Screen
				name="Direct Message"
				component={DirectMessage}
				options={{ tabBarShowLabel: false }}
			/>
		</Tab.Navigator>
	);
}

export default function Router() {
	const Stack = createNativeStackNavigator();

	// function handleHiss() {
	// 	console.log("hiss");
	// }

	// function handleImage_url() {
	// 	console.log("image_url");
	// }

	return (
		<Stack.Navigator initialRouteName="SplashScreen">
			<Stack.Screen
				name="SplashScreen"
				component={SplashScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="MyAccount" component={MyAccount} />
			<Stack.Screen
				name="Hiss"
				component={Hiss}
				// options={{
				// 	headerRight: () => (
				// 		<View style={{ flexDirection: "row" }}>
				// 			<TouchableOpacity onPress={() => handleImage_url()}>
				// 				<MaterialCommunityIcons
				// 					name="image-plus"
				// 					size={24}
				// 					color="black"
				// 					style={{ marginRight: 10 }}
				// 				/>
				// 			</TouchableOpacity>
				// 			<TouchableOpacity onPress={() => handleHiss()}>
				// 				<FontAwesome
				// 					name="send"
				// 					size={24}
				// 					color="black"
				// 					style={{ marginRight: 10 }}
				// 					on
				// 				/>
				// 			</TouchableOpacity>
				// 		</View>
				// 	),
				// }}
			/>
			<Stack.Screen
				name="Chat"
				component={Chat}
			/>
			<Stack.Screen
				name="Reply"
				component={Reply}
				options={{
					headerRight: () => (
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity onPress={() => handleImage_url()}>
								<MaterialCommunityIcons
									name="image-plus"
									size={24}
									color="black"
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleHiss()}>
								<FontAwesome
									name="send"
									size={24}
									color="black"
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="MainApp"
				component={MainApp}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="TopUpWallet"
				component={TopUp}
			/>
			<Stack.Screen
				name="Webview"
				component={Webview}
			/>
		</Stack.Navigator>
	);
}
