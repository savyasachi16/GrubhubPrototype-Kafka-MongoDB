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
    let updatedUser = await user.save()
    const token = jwt.sign({
        id: updatedUser._id
    }, jwtSecret.secret)
    return {
        id: updateUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        account_type: updatedUser.account_type,
        token: token
    }
}

const loginUser = async userCredentials => {
    let user = await Users.findOne({
        email: userCredentials.email
    })
    if (!user) return new Error("User not registered!")
    const token = jwt.sign({
        id: user._id
    }, jwtSecret.secret)
    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        account_type: user.account_type,
        phone: user.phone,
        address: user.address,
        image: user.image,
        token: token
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
            restaurant_name: userDetails.restaurant_name,
            cuisine: userDetails.cuisine,
            restaurant_image: userDetails.restaurant_image,
            address: userDetails.restaurant_address,
            zipcode: userDetails.restaurant_zipcode,
            user_id: userDetails.user_id
        }
        if (!userDetails.restaurant_id) {
            let restaurant = await restaurantHandler.createRestaurant(restaurantDetails)
            return {
                user: updatedUser,
                restaurant
            }
        } else {
            let restaurant = await restaurantHandler.updateRestaurant(restaurantDetails)
            return {
                user: updatedUser,
                restaurant
            }
        }
    } else return {
        user: updatedUser
    }
}

const getUser = async id => {
    let user = await Users.findOne({
        _id: id
    })
    if (!user) throw new Error("User not found in DB!")
    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        account_type: user.account_type,
        phone: user.phone,
        address: user.address,
        image: user.image
    }
}

const uploadUserImage = async file => {
    try {
        result = await uploader.upload(file, {
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
    } catch (err) {
        console.log("Error while uploading image to repo: ", err)
        throw err
    }
}

export {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    uploadUserImage
};