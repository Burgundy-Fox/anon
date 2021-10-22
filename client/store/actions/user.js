import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://192.168.18.2:4000";

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
      .then(({data}) => {
        console.log(data)
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
  // console.log(value)
  try {
    await AsyncStorage.setItem("@access_token", value);
    return true;
  } catch (e) {
    // saving error
    console.log(e)
    return false;
  }
};

export function inputLogin(input) {
  return (dispatch) => {
    // console.log(input);
    return axios({
      method: "POST",
      url: `${baseURL}/user/login`,
      data: input,
    })
      .then(({ data }) => {
        // console.log(data)
        auth.signInWithEmailAndPassword(data.email, input.password)
            .then((userCredential) => {
                 console.log(userCredential)
            })
            .catch((error) => {
                console.log(error)
            })
        // console.log(data);
        return storeData(data.access_token);
      })
      .catch((err) => console.log(err, 'server error'));
  };
}
