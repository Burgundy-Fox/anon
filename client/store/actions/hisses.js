<<<<<<< HEAD
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// axios.defaults.baseURL = "http://192.168.68.100:4000";

// export async function postHiss(hissData) {
//     try {
//         let token = await AsyncStorage.getItem("@access_token")
//         return (dispatch) => {
//             return axios({
//                 method: "POST",
//                 url: `/hisses`,
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     access_token: token
//                 },
//                 data: hissData.formData
//             })
//                 .then(({ data }) => {
//                     console.log(data)
//                     return true
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     return false
//                 });
//         };
//     } catch (error) {
//         console.log(error);
//         return false
//     }

// }
=======
import axios from "axios";

const baseURL = "http://192.168.100.53:4000";

export function getAllHiss(access_token) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${baseURL}/hisses`,
      headers: { access_token },
    })
      .then(({ data }) => {
        dispatch({ type: "GET_ALL_HISS", payload: data });
      })
      .catch((err) => console.log(err));
  };
}

export function createHiss(access_token, input) {
  return (dispatch) => {
    console.log(access_token, input);
    axios({
      method: "POST",
      url: `${baseURL}/hisses`,
      headers: { access_token },
      data: {
        content: input,
      },
    })
      .then((_) => {
        dispatch(getAllHiss(access_token));
      })
      .catch((err) => console.log(err));
  };
}

export function destroyHiss(access_token, id) {
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `${baseURL}/hisses/${id}`,
      headers: { access_token },
    })
      .then((_) => {
        dispatch(getAllHiss(access_token));
      })
      .catch((err) => console.log(err));
  };
}
>>>>>>> 43dc5b1a21de8104acee24d6b8faa2dd411b1ce0
