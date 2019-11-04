import Restaurants from "../../models/restaurant";
import _ from "lodash";


const handle_request = async (restaurantDetails, callback) => {
    let restaurant = await Restaurants.findOne({
        _id: restaurantDetails.restaurant_id
    })
    restaurant.name = restaurantDetails.restaurant_name
    restaurant.cuisine = restaurantDetails.cuisine
    restaurant.image = restaurantDetails.restaurant_image
    restaurant.address = restaurantDetails.address
    restaurant.zipcode = restaurantDetails.zipcode
    let updatedRestaurant = await restaurant.save()
    if (!restaurant) {
        callback({
            message: "No restaurant in DB!"
        }, null)
    }
    restaurant = await Restaurants.findOne({
        _id: updatedRestaurant._id
    })
    if (!callback) {
        return restaurant

    }
    callback(null,
        restaurant
    )
}

export {
    handle_request
};