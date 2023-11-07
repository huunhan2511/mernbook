import cartReducer from "./cartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cartData: cartReducer,
});

export default rootReducer;
