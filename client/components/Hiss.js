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
import { SvgUri } from "react-native-svg";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { destroyHiss } from "../store/actions/hisses";
import { ListItem } from "react-native-elements/dist/list/ListItem";

export default function Hiss({ navigation, item, route }) {
	const access_token = useSelector((state) => state.usersReducer.access_token);
	const dispatch = useDispatch();

	function handleReply() {
		navigation.navigate("Reply");
	}

	function handleLike() {
		console.log("like bertambah 1");
	}

	function handleEdit(access_token, id) {
		console.log(access_token, id);
	}

	function handleDelete(access_token, id) {
		dispatch(destroyHiss(access_token, id));
	}

	//   return (
	//     <View>
	//       <Text>Loading...</Text>
	//     </View>
	//   );
	return (
		<View
			key={item.id}
			style={{
				marginBottom: 5,
				borderBottomColor: "black",
				borderBottomWidth: 1,
				flexDirection: "row",
			}}
		>
			{/* <SvgUri style={styles.img} uri={item.User.avatar} /> */}

			<View style={{ marginLeft: 8 }}>
				<Text style={{ marginVertical: 5, fontSize: 16 }}>
					{item.User.email}
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
						flexDirection: "row",
					}}
				>
					{route === "Home" ? (
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
						</>
					) : (
						<>
							<TouchableOpacity
								onPress={() => handleEdit(access_token, item.id)}
							>
								<AntDesign
									name="edit"
									size={24}
									color="black"
									style={{ marginLeft: 50 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleDelete(access_token, item.id)}
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
