import actionTypes from "../constants/index";
import axios from "axios";

const addDish = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/dish/add`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_DISH,
                    payload: response.data
                });
            }
        })
    }
}

const updateDish = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/dish/update`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_DISH,
                    payload: response.data
                });
            }
        })
    }
}

const deleteDish = (payload, ownProps) => {
    return dispatch => {
        return axios.delete(`http://localhost:3001/dish/delete/${payload.dish_id}`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.CLEAR_DISH,
                    payload: {}
                })
                ownProps.history.push(`/${payload.user_id}/menu`)
            }
        })
    }
}

const getDish = payload => {
    return dispatch => {
        return axios.get(`http://localhost:3001/dish/${payload.dish_id}`).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_DISH,
                    payload: response.data
                });
            }
        })
    }
}

const uploadDishImage = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/upload/image`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_DISH_IMAGE,
                    payload: response.data
                })
            }
        })
    }
}

export {
    addDish,
    deleteDish,
    updateDish,
    getDish,
    uploadDishImage
}