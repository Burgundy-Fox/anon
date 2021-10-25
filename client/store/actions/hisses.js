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