import Users from "../models/user"
import jwtSecret from '../config/jwtConfig'
import jwt from 'jsonwebtoken';
import restaurantHandler from "./restaurant";
import {
    uploader
} from "../config/cloudinary"

const registerUser = async userDetails => {
    let user = await Users.findOne({
        email: userDetails.email
    })
    if (!user) throw new Error("Email already exists in DB!");
    user.first_name = userDetails.first_name
    user.last_name = userDetails.last_name
    user.account_type = userDetails.account_type
    let restaurant;
    if (userDetails.account_type === 'Vendor') {
        restaurant = await restaurantHandler.createRestaurant({})
        user.restaurant_id = restaurant._id
    }

    let updatedUser = await user.save()
    const token = jwt.sign({
        _id: updatedUser._id
    }, jwtSecret.secret)
    if (updatedUser.account_type === "Vendor")
        return {
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            account_type: updatedUser.account_type,
            token: token,
            restaurant_id: updatedUser.restaurant_id
        }
    else {
        return {
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            account_type: updatedUser.account_type,
            token: token,
        }
    }
}

const loginUser = async userCredentials => {
    let user = await Users.findOne({
        email: userCredentials.email
    })
    if (!user) return new Error("User not registered!")
    const token = jwt.sign({
        _id: user._id
    }, jwtSecret.secret)
    if (user.account_type === 'Vendor') {
        return {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            account_type: user.account_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
            restaurant_id: user.restaurant_id
        }
    } else {
        return {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            account_type: user.account_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
        }
    }
}

const updateUser = async userDetails => {
    let user = await Users.findOne({
        _id: userDetails.user_id
    })
    if (!user) throw new Error("User not found in DB!")
    user.first_name = userDetails.first_name
    user.last_name = userDetails.last_name
    user.phone = userDetails.phone
    user.address = userDetails.address
    user.image = userDetails.image

    let updatedUser = await user.save()
    if (updatedUser.account_type === "Vendor") {
        const restaurantDetails = {
            restaurant_id: userDetails.restaurant_id,
            restaurant_name: userDetails.restaurant_name,
            cuisine: userDetails.cuisine,
            restaurant_image: userDetails.restaurant_image,
            address: userDetails.restaurant_address,
            zipcode: userDetails.restaurant_zipcode,
        }
        let restaurant = await restaurantHandler.updateRestaurant(restaurantDetails)
        return {
            user: updatedUser,
            restaurant

        }
    } else return {
        user: updatedUser
    }
}

const getUser = async user_id => {
    let user = await Users.findOne({
        _id: user_id
    })
    if (!user) throw new Error("User not found in DB!")
    return user
}

const uploadUserImage = async file => {
    let result = await uploader.upload(file, {
        transformation: [{
            width: 175,
            height: 125,
            crop: "scale"
        }]
    })
    const image = result.url;
    return ({
        image
    })
}

export {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    uploadUserImage
};