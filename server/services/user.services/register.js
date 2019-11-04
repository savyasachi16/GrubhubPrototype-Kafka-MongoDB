import Users from "../../models/user"
import jwtSecret from '../../config/jwtConfig'
import jwt from 'jsonwebtoken';

import * as createRestaurant from '../restaurant.services/create'

const handle_request = async (userDetails, callback) => {
    let user = await Users.findOne({
        email: userDetails.email
    })
    if (!user) {
        callback({
            message: "Email already exists in DB!"
        }, null)
    }
    user.first_name = userDetails.first_name
    user.last_name = userDetails.last_name
    user.account_type = userDetails.account_type
    let restaurant;
    if (userDetails.account_type === 'Vendor') {
        restaurant = await createRestaurant.handle_request({},null)
        user.restaurant_id = restaurant._id
    }
    let updatedUser = await user.save()
    const token = jwt.sign({
        _id: updatedUser._id
    }, jwtSecret.secret)
    if (updatedUser.account_type === "Vendor")
        callback(null, {
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            account_type: updatedUser.account_type,
            token: token,
            restaurant_id: updatedUser.restaurant_id
        })
    else {
        callback(null, {
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            account_type: updatedUser.account_type,
            token: token,
        })
    }
}

export  {
    handle_request
};