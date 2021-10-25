const initialState = {
  isRegister: false,
  isLogin: false,
  access_token: null,
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
    default:
      return state;
  }
}
