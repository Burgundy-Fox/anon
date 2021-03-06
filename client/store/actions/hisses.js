import axios from "axios";

export function getAllHiss(access_token) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `/hisses`,
      headers: { access_token },
    })
      .then(({ data }) => {
        dispatch({ type: "GET_ALL_HISS", payload: data });
      })
      .catch((err) => console.log("error getall", err));
  };
}

export function createHiss(hissData, token) {
  return (dispatch) => {
    return axios({
      method: "POST",
      url: `/hisses`,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: token,
      },
      data: hissData,
    });
  };
}

export function editHiss(hissData) {
  return (dispatch) => {
    return axios({
      method: "PUT",
      url: `/hisses/${hissData.hissId}`,
      data: {
        content: hissData.content,
      },
      headers: { access_token: hissData.access_token },
    })
      .then(({ data }) => {
        if (data) {
          dispatch(getAllHiss(hissData.access_token));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
}

export function destroyHiss(access_token, id) {
  return (dispatch) => {
    return axios({
      method: "DELETE",
      url: `/hisses/${id}`,
      headers: { access_token },
    })
      .then(() => {
        dispatch(getAllHiss(access_token));
      })
      .catch((err) => console.log(err, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
  };
}
