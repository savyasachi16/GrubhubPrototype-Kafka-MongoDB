import Restaurants from "../../models/restaurant";
import Dishes from "../../models/dish";
import _ from "lodash";
import mongoose from "mongoose"
import * as getRestaurantMenu from "./getMenu"

const handle_request = async (section, callback) => {
    if (!section.dishes || !section.dishes.length) {
        callback({
            message: "No dishes in section."
        }, null)
    }
    let restaurant = await Restaurants.findOne({
        _id: section.restaurant_id
    })
    let objectIdArray = section.dishes.map(s => mongoose.Types.ObjectId(s));
    restaurant.dishes = _.difference(restaurant.dishes, objectIdArray)

    restaurant = await restaurant.save()
    let dish = await Dishes.deleteMany({
        _id: section.dishes
    })
    let restaurantMenu = await getRestaurantMenu.handle_request(section.restaurant_id, null);
    callback(null,
        restaurantMenu
    )
}

export {
    handle_request
};