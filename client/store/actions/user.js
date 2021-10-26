import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllHiss } from "./hisses";

const baseURL = "http://192.168.43.45:4000";
import { auth } from '../../firebase/firebase'

export function inputRegister(input) {
	return (dispatch) => {
		// console.log(input);
		axios({
			method: "POST",
			url: `${baseURL}/user/register`,
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
	const avatar = ["@avatar", value.avatar.toString()]
	const email = ["@email", value.email.toString()]
	try {
		await AsyncStorage.multiSet([access_token, UserId, Username, avatar, email]);
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
		return axios({
			method: "POST",
			url: `${baseURL}/user/login`,
			data: input,
		})
			.then(({ data }) => {
				// console.log(data)
				auth.signInWithEmailAndPassword(data.email, input.password)
					.then((userCredential) => {
						// console.log(userCredential)
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
			method: "GET",
			url: `${baseURL}/user`,
			headers: { access_token },
		})
			.then(({ data }) => {
				// console.log(data)
				dispatch({ type: "SET_AVATAR", payload: data.avatar })
				dispatch({ type: "SET_USERNAME", payload: data.username })
				dispatch({ type: 'SET_USERWALLET', payload: data.wallet })
				data.access_token = access_token
				storeData(data);
			})
			.catch((err) => console.log(err));
	}
}

export function gachaAvatar(access_token) {
	return (dispatch) => {
		axios({
			method: "patch",
			url: `${baseURL}/user`,
			headers: { access_token },
		})
			.then(({ data }) => {
				// console.log(data)
				auth.currentUser.updateProfile({
                    photoURL: data.avatar
                })
				dispatch({ type: "SET_AVATAR", payload: data.avatar })
				dispatch(getUserDetails(access_token))
				dispatch(getAllHiss(access_token))
			})
			.catch((err) => console.log(err));
	}
}
