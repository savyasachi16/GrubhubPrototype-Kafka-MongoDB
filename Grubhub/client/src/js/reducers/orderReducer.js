import actionTypes from "../constants/index";
const initialState = {
    current_orders: [{
        id: "",
        customer_name: "",
        amount: "",
        status: ""
    }],
    past_orders: [{
        id: "",
        customer_name: "",
        amount: "",
        status
    }],
    active: {}
}

const orderReducer = (state = initialState, action) => {
    var newState;
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            newState = action.payload;
            return Object.assign({}, state, newState)
        case actionTypes.SET_ORDER_DETAILS:
            newState = {}
            newState.active = action.payload
            return Object.assign({}, state, newState)
        default:
            break
    }
    return state
}

export default orderReducer;