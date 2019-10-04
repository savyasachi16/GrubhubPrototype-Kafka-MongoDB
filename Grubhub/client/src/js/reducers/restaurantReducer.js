import actionTypes from "../constants/index";

const intialState = {
    id: "",
    name: "",
    address: "",
    zipcode: "",
    image: "",
    cuisine: "",
    menu: []
};

const restaurantReducer = (state = intialState, action) => {
    let newState = action.payload;
    switch (action.type) {
        case actionTypes.SET_RESTAURANT:
            return Object.assign({}, state, newState);
        case actionTypes.SET_MENU:
            return Object.assign({}, state, newState);
        case actionTypes.SET_RESTAURANT_PIC:
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
}

export default restaurantReducer;