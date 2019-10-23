import actionTypes from '../constants/index';
const initialState = {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    account_type: "",
    token: "",
    image: "",
    invalid: false
};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case actionTypes.SET_USER:
            newState = action.payload;
            newState.invalid = false;
            return Object.assign({}, state, newState);
        case actionTypes.SET_INVALID:
            newState = action.payload;
            newState.invalid = true;
            return Object.assign({}, state, newState);
        case actionTypes.SET_PROFILE_PIC:
            newState = action.payload;
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
};

export default userReducer;