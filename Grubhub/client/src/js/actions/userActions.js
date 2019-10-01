import actionTypes from "../constants/index";
import axios from "axios";

const loginUser = (payload, ownProps) => {
    return dispatch => {
        return axios.post("http://localhost:3001/login", payload).then(response => {
            if (response.status === 200) {
                const userData = response.data;
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: userData
                });
                if (userData.account_type === "Vendor") {
                    ownProps.history.push(`/${userData.id}/profile`);
                } else {
                    ownProps.history.push(`/${userData.id}/search`);
                }
            }
        })
    }
}

const registerUser = (payload, ownProps) => {
    return dispatch => {
        return axios.post("http://localhost:3001/register", payload).then(response => {
            if (response.status === 200) {
                const userData = response.data;
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: userData
                });
                if (userData.account_type === "Vendor") {
                    ownProps.history.push(`/login-vendor`);
                } else {
                    ownProps.history.push(`/login-user`);
                }
            }
        });
    };
};

const updateUser = (payload) => {
    return dispatch => {
        return axios.put(`http://localhost:3001/userUpdate/${payload.id}`, payload)
            .then(response => {
                if (response.status === 200) {
                    const userData = response.data.user;
                    userData.valid = true;
                    const restaurantData = response.data.restaurant;
                    dispatch({
                        type: actionTypes.SET_USER,
                        payload: userData
                    });
                    dispatch({
                        type: actionTypes.SET_RESTAURANT,
                        payload: restaurantData
                    });
                }
            })
    }
}

export {
    registerUser,
    loginUser,
    updateUser
};