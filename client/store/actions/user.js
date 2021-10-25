import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = "http://192.168.68.100:4000";
import { auth } from '../../firebase/firebase'

export function inputRegister(input) {
	return (dispatch) => {
		// console.log(input);
		axios({
			method: "POST",
			url: `/user/register`,
			data: {
				email: input.email,
				username: input.username,
				password: input.password,
			},
		})
			.then(({ data }) => {
				// console.log(data)
				auth.createUserWithEmailAndPassword(input.email, input.password)
					.then((userCredential) => {
						// Signed in
						// console.log(avatar)
						var user = userCredential.user
						user.updateProfile({
							email: data.email,
							photoURL: data.avatar
						})
						dispatch({ type: "IS_REGISTER", payload: true })
					})
					.catch((error) => {
						var errorMessage = error.message
						console.log(errorMessage)
					})
			})
			.catch((_) => dispatch({ type: "IS_REGISTER", payload: false }));
	};
}

const storeData = async (value) => {
	const access_token = ["@access_token", value.access_token.toString()];
	const UserId = ["@UserId", value.id.toString()];
	const Username = ["@Username", value.username.toString()];
	try {
		await AsyncStorage.multiSet([access_token, UserId, Username]);
		// await AsyncStorage.setItem("@access_token", value.access_token);
		// await AsyncStorage.setItem("@UserId", value.id);
		return true;
	} catch (e) {
		// saving error
		console.log(e, "...............>>>>>");
		return false;
	}
};

export function inputLogin(input) {
	return (dispatch) => {
		// console.log(input);
		return axios({
			method: "POST",
			url: `/user/login`,
			data: input,
		})
			.then(({ data }) => {
				// console.log(data)
				auth.signInWithEmailAndPassword(data.email, input.password)
					.then((userCredential) => {
						console.log(userCredential)
					})
					.catch((error) => {
						console.log(error, 'error inputlogin')
					})
				// console.log(data);
				dispatch({ type: "SET_ACCESS_TOKEN", payload: data.access_token });
				return storeData(data);
			})
			.catch((err) => console.log(err, "server error"));
	};
}

export function getUserDetails(access_token) {
	return (dispatch) => {
		axios({
			method: "GEt",
			url: '/user',
			headers: {access_token},
		})
			.then(({ data }) => {
				// console.log(data)
				dispatch({type : 'SET_USERWALLET' , payload : data.wallet})
			})
			.catch((err) => console.log(err));
	}
}
