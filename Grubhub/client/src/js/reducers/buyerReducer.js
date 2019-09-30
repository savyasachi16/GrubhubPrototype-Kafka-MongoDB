import actionTypes from "../constants/index";
const initialState = {
    search_results: []
}

const buyerReducer = (state = initialState, action) => {
    var newState = {};
    switch (action.type) {
        case actionTypes.SET_SEARCH_RESULTS:
            newState.search_results = action.payload;
            return Object.assign({}, state, newState);
        default:
            break;
    }
    return state;
}

export default buyerReducer;