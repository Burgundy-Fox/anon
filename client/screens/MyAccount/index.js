import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase/firebase";
import Hiss from "../../components/Hiss";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserDetails } from "../../store/actions/user";


export default function MyAccount({ navigation, route }) {
	const {username, access_token, wallet} = useSelector((state) => state.usersReducer);
	const {dataHiss} = useSelector((state) => state.hissesReducer);
	const dispatch = useDispatch()

	const [UserId, setUserId] = useState("");

	useEffect(() => {
		dispatch(getUserDetails(access_token))
		getData();
	}, []);

	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@UserId");
			if (value !== null) {
				// value previously stored
				setUserId(value);
			}
		} catch (e) {
			// error reading value
		}
	};

	const handleLogOut = async () => {
		try {
			await AsyncStorage.clear();
			await auth.signOut();
			navigation.replace("Login");
		} catch (e) {
			console.log(e);
			// clear error
		}

		// console.log("Done.");
	};

	function handleTopUp(){
		navigation.navigate("TopUpWallet")
	}

	return (
		<View style={styles.container}>
			<View style={{flexDirection: "row", marginHorizontal:30}}>
				<View>
					<Image
						source={{ uri: "https://via.placeholder.com/150/54176f" }}
						style={{
							width: 150,
							height: 150,
							borderRadius: 150 / 2,
						}}
					/>
					<Text style={{ fontSize: 18, color: "#808E9B", marginTop: 10, alignSelf: "center" }}>
						Change Avatar
					</Text>
				</View>
				<View style={{justifyContent: "space-between", marginLeft: 50}}>
					<Text style={{ fontSize: 24}}>{username}</Text>
					<TouchableOpacity 
						style={{flexDirection: "row"}}
						onPress={() => handleTopUp()}
					>
						<MaterialCommunityIcons name="wallet-plus" size={30} color="black" /> 
						<Text style={{ fontSize: 20}}> Rp. {wallet.toLocaleString('id')}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button]}
						onPress={() => handleLogOut()}
					>
						<Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
							Log out
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FlatList
				style={{marginTop : 50, marginHorizontal : 20}}
				data={dataHiss.filter((el) => el.User.id == UserId)}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return <Hiss navigation={navigation} route={route.name} item={item} />;
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 35,
		// alignItems: "center",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#1E272E",
		padding: 10,
	},
});
