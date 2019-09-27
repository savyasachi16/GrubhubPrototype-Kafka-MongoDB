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

export {
    getRestaurant
};