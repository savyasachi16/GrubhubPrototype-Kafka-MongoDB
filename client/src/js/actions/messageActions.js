import actionTypes from "../constants/index";
import axios from "axios";

const pushMessage = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/message/push`, {
            message_details: payload
        }).then(response => {
            if (response.status === 200) {
                console.log("Inside response action")
                dispatch({
                    type: actionTypes.SET_ORDER_DETAILS,
                    payload: response.data
                })
            }
        })
    }
}

export {
    pushMessage
};