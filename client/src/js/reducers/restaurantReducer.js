import actionTypes from "../constants/index";

const intialState = {
    _id: "",
    name: "",
    address: "",
    zipcode: "",
    image: "",
    cuisine: "",
    menu: []
};

const restaurantReducer = (state = intialState, action) => {
    let newState
    switch (action.type) {
        
        case actionTypes.SET_RESTAURANT:
            newState = action.payload;
            return Object.assign({}, state, newState);
            
        case actionTypes.SET_MENU:
            newState = action.payload;
            return Object.assign({}, state, newState);

        case actionTypes.SET_RESTAURANT_PIC:
            newState = action.payload;
            return Object.assign({}, state, newState);

        default:
            break;
    }
    return state;
}

export default restaurantReducer;