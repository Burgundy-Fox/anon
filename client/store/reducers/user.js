const initialState = {
  isRegister: false,
  isLogin: false,
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
    default:
      return state;
  }
}
