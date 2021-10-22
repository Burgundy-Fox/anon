import { combineReducers } from "redux";

import hissesReducer from "./hisses";
import usersReducer from "./user";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  hissesReducer,
  usersReducer,
});

export default rootReducer;
