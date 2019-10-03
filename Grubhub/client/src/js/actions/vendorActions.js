import actionTypes from "../constants/index";
import axios from "axios";

const getRestaurant = payload => {
    return dispatch => {
        return axios.get(`http://localhost:3001/restaurant/${payload.user_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_RESTAURANT,
                        payload: response.data
                    })
                }
            })
    }
}

const getMenu = payload => {
    return dispatch => {
        return axios.get(`http://localhost:3001/restaurant/menu/${payload.restaurant_id}`).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_MENU,
                    payload: {
                        menu: response.data
                    }
                })
            }
        })
    }
}

const getRestaurantOrders = payload => {
    return dispatch => {
        return axios.get(`http://localhost:3001/order/restaurant/${payload.id}`).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_ORDERS,
                    payload: response.data
                })
            }
        })
    }
}

const changeStatus = payload => {
    return dispatch => {
        return axios.put(`http://localhost:3001/order/update/${payload.id}`, {
            status: payload.status
        }).then(response => {
            if (response === 200) {
                dispatch({
                    type: actionTypes.SET_ORDERS,
                    payload: response.data
                })
            }
        })
    }
}

const getOrderDetails = payload => {
    return dispatch => {
        return axios
            .get(`http://localhost:3001/order/${payload.order_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_ORDER_DETAIL,
                        payload: response.data
                    });
                }
            });
    };
}

const getBuyerOrders = payload => {
    return dispatch => {
        return axios
            .get(`http://localhost:3001/order/customer/${payload.id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_ORDERS,
                        payload: response.data
                    });
                }
            });
    };
};

export {
    getRestaurant,
    getMenu,
    getRestaurantOrders,
    changeStatus,
    getOrderDetails,
    getBuyerOrders

};