import {
    combineReducers
} from "redux";
import user from "./userReducer";
import restaurant from "./restaurantReducer";


const rootReducer = combineReducers({
    user,
    restaurant
});
export default rootReducer;