import { combineReducers } from "redux";
import Images from "./images";

const reducers = combineReducers({
	images: Images,
});

const rootReducer = (state, action) => {
	let tempState = state;
	return reducers(tempState, action);
};

export default rootReducer;
