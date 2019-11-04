import Users from "../../models/user"
import * as updateRestaurant from '../restaurant.services/update'

const handle_request = async (userDetails, callback) => {
    let user = await Users.findOne({
        _id: userDetails.user_id
    })
    if (!user) {
        callback({
            message: "User not found in DB!"
        }, null)
    }
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
        let restaurant = await updateRestaurant.handle_request(restaurantDetails, null)
        callback(null, {
            user: updatedUser,
            restaurant

        })
    } else {
        callback(null, {
            user: updatedUser
        })
    }
}

export {
    handle_request
};