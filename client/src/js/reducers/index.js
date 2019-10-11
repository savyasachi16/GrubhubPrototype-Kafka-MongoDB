import {
    combineReducers
} from "redux";
import user from "./userReducer";
import restaurant from "./restaurantReducer";
import dish from "./dishReducer";
import buyer from "./buyerReducer";
import order from "./orderReducer"

const rootReducer = combineReducers({
    user,
    restaurant,
    dish,
    buyer,
    order
});
export default rootReducer;