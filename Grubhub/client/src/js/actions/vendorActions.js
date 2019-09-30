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

export {
    getRestaurant,
    getMenu
};