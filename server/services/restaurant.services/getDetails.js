import Restaurants from "../../models/restaurant";
import * as getRestaurantMenu from "./getMenu"

const handle_request = async (restaurant_id, callback) => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    }).lean();
    if (!restaurant) {
        callback({
            message: "Restaurant not found in DB!"
        }, null)
    }
    let menu = await getRestaurantMenu.handle_request(restaurant_id, null)
    restaurant.menu = menu;
    callback(null, {
        current_restaurant: restaurant
    })
}
export {
    handle_request
};