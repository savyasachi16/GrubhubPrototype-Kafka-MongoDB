import actionTypes from "../constants/index"
import axios from "axios";

const getResults = (payload, ownProps) => {
    return dispatch => {
        return axios.get(`http://localhost:3001/buyer/search`, {
            params: {
                key: payload.search
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_SEARCH_RESULTS,
                    payload: response.data
                })
                ownProps.history.push("/results")
            }
        })
    }
}

const getRestaurantDetails = payload => {
    return dispatch => {
        return axios
            .get(`http://localhost:3001/restaurant/details/${payload.restaurant_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_BUYER_SELECTED_RESTAURANT,
                        payload: response.data
                    });
                }
            });
    };
};

const addToCart = payload => {
    console.log(payload)
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload
        });
    };
};

const placeOrder = (payload, ownProps) => {
    return dispatch => {
        return axios
            .post("http://localhost:3001/order/confirm", payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.CLEAR_CART,
                        payload: response.data
                    });
                    ownProps.history.replace(`/${payload.user_id}/order`);
                }
            });
    };
};

export {
    getResults,
    addToCart,
    getRestaurantDetails,
    placeOrder
};