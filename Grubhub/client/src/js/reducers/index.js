import {
    combineReducers
} from "redux";
import user from "./userReducer";
import restaurant from "./restaurantReducer";
import dish from "./dishReducer";
import buyer from "./buyerReducer";


const rootReducer = combineReducers({
    user,
    restaurant,
    dish,
    buyer
});
export default rootReducer;