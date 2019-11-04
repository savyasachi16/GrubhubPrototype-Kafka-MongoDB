import Restaurants from "../../models/restaurant";

const handle_request = async (restaurantDetails, callback) => {
    let restaurant = await Restaurants.create({
        name: restaurantDetails.restaurant_name,
        cuisine: restaurantDetails.cuisine,
        image: restaurantDetails.restaurant_image,
        address: restaurantDetails.address,
        zipcode: restaurantDetails.zipcode
    })
    if (!restaurant) {
        callback({
            message: "Restaurant creation error!"
        }, null)
    }
    if (!callback) return restaurant
}

export {
    handle_request
};