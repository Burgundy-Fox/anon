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
