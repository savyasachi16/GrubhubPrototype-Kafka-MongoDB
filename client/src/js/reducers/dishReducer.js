import actionTypes from "./../constants/index";
const initialState = {
    id: "",
    name: "",
    description: "",
    section: "",
    price: "",
    image: ""
};

const dishReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case actionTypes.SET_DISH:
            newState = action.payload;
            return Object.assign({}, state, newState);

        case actionTypes.CLEAR_DISH:
            newState = initialState;
            return Object.assign({}, state, newState);

        case actionTypes.SET_DISH_IMAGE:
            newState = action.payload;
            console.log("Reducer State and New State:", state, newState)
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
}

export default dishReducer;