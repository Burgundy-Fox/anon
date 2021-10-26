const initialState = {
  dataHiss: [],
};

export default function hissesReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_HISS": {
      return {
        ...state,
        dataHiss: action.payload,
      };
    }
    default:
      return state;
  }
}
