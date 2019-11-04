import Restaurants from "../../models/restaurant";

const handle_request = async (restaurant_id, callback) => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) {
        callback({
            message: "No restaurant in DB!"
        }, null)
    }
    if (!callback) return restaurant

    callback(null,
        restaurant
    )
}

export {
    handle_request
};