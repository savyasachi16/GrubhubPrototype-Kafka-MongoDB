import actionTypes from '../constants/index';
const initialState = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    account_type: "",
    token: "",
    valid: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            let newState = action.payload;
            newState.valid = true;
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
};

export default userReducer;