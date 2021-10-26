import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import {getAllHiss } from "../../store/actions/hisses";
import {getUserDetails} from "../../store/actions/user"
import Hiss from "../../components/Hiss";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, route }) {
	const {dataHiss} = useSelector((state) => state.hissesReducer);

	const dispatch = useDispatch();

	async function initialStore(){
		console.log('initalizing redux');
		try {
			let token = await AsyncStorage.getItem('@access_token')
			dispatch({ type: "SET_ACCESS_TOKEN", payload: token });
			dispatch(getAllHiss(token));
			dispatch(getUserDetails(token));
			// let username = await AsyncStorage.getItem('@Username')
			// dispatch({ type: "SET_USERNAME", payload: username });
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		initialStore()
	}, []);

	if(!dataHiss.length){
		return ( 
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={dataHiss}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return <Hiss item={item} route={route.name} navigation={navigation} />;
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		padding: 10,
	},
	img: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 1,
	},
});
