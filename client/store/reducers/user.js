const initialState = {
  isRegister: false,
  isLogin: false,
  access_token: null,
  username : '',
  wallet : 0,
  avatar: "https://via.placeholder.com/150/54176f",
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_REGISTER": {
      return {
        ...state,
        isRegister: action.payload,
      };
    }
    case "IS_LOGIN": {
      return {
        ...state,
        isLogin: action.payload,
      };
    }
    case "SET_ACCESS_TOKEN": {
      return {
        ...state,
        access_token: action.payload,
      };
    }
    case "SET_USERNAME": {
      return {
        ...state,
        username: action.payload,
      };
    }
    case "SET_USERWALLET": {
      return {
        ...state,
        wallet: action.payload
      }
    }
    case "SET_AVATAR": {
      return {
        ...state,
        avatar: action.payload,
      };
    }
    default:
      return state;
  }
}
