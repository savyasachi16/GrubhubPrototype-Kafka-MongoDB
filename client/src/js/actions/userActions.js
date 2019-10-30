import actionTypes from "../constants/index";
import axios from "axios";
import cookie from "js-cookie";
import {
    toast
} from "react-toastify";


const loginUser = (payload, ownProps) => {
    return dispatch => {
        return axios.post("http://localhost:3001/login", payload).then(response => {
            if (response.status === 200) {
                const userData = response.data;
                cookie.set("token", userData.token, {
                    expires: 1
                })
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: userData
                });
                if (userData.account_type === "Vendor") {
                    ownProps.history.push(`/${userData._id}/profile`);
                } else {
                    ownProps.history.push(`/${userData._id}/search`);
                }
            }
        }).catch(err => {
            console.log("Login error:", err)
            toast.error("User not found! Try creating an account?");
        });
    }
}

const registerUser = (payload, ownProps) => {
    return dispatch => {
        return axios.post("http://localhost:3001/register", payload).then(response => {
            if (response.status === 200) {
                const userData = response.data;
                cookie.set("token", userData.token, {
                    expires: 1
                })
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

const updateUser = payload => {
    return dispatch => {
        return axios.put(`http://localhost:3001/userUpdate/${payload._id}`, payload)
            .then(response => {
                if (response.status === 200) {
                    const userData = response.data.user;

                    userData.update_success = true;
                    dispatch({
                        type: actionTypes.SET_USER,
                        payload: userData
                    });
                    if (userData.account_type === "Vendor") {
                        const restaurantData = response.data.restaurant;
                        dispatch({
                            type: actionTypes.SET_RESTAURANT,
                            payload: restaurantData
                        });
                    }
                    toast.success("Successfully updated data!")
                }
            })
    }
}

const getUser = payload => {
    return dispatch => {
        return axios.get(`http://localhost:3001/user/${payload.user_id}`)
            .then(response => {
                if (response.status === 200) {
                    const userData = response.data;
                    dispatch({
                        type: actionTypes.SET_USER,
                        payload: userData
                    })
                }
            })
    }
}

const uploadProfileImage = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/upload/image`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_PROFILE_PIC,
                    payload: response.data
                })
            }
        })
    }
}

export {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    uploadProfileImage
};