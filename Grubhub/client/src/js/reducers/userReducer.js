import actionTypes from '../constants/index';
const initialState = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    account_type: "",
    token: "",
    image: "",
    phone: "",
    address: "",
    valid: false
};

const userReducer = (state = initialState, action) => {
    let newState = action.payload;
    switch (action.type) {
        case actionTypes.SET_USER:
            newState.valid = true;
            return Object.assign({}, state, newState);
        case actionTypes.SET_INVALID:
            newState.valid = false;
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