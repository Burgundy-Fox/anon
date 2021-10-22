import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://192.168.100.53:4000";

export function inputRegister(input) {
  return (dispatch) => {
    console.log(input);
    axios({
      method: "POST",
      url: `${baseURL}/user/register`,
      data: {
        email: input.email,
        username: input.username,
        password: input.password,
      },
    })
      .then((_) => dispatch({ type: "IS_REGISTER", payload: true }))
      .catch((_) => dispatch({ type: "IS_REGISTER", payload: false }));
  };
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@access_token", value);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export function inputLogin(input) {
  return (dispatch) => {
    console.log(input);
    return axios({
      method: "POST",
      url: `${baseURL}/user/login`,
      data: input,
    })
      .then(({ data }) => {
        console.log(data);
        return storeData(data.access_token);
      })
      .catch((err) => console.log(err));
  };
}
