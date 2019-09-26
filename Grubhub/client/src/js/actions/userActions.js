import actionTypes from "../constants/index";
import axios from "axios";

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
                    ownProps.history.push(`/vendor-dash`);
                } else {
                    //this needs to be changed
                    ownProps.history.push(`/user-dash`);
                }
            }
        })
    }
}

export {
    registerUser,
    loginUser
};