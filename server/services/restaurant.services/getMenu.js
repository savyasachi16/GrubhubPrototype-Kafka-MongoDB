import Restaurants from "../../models/restaurant";
import Dishes from "../../models/dish";
import _ from "lodash";

const handle_request = async (restaurant_id, callback) => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) {
        callback({
            message: "No restaurant found in DB!"
        }, null)
    }
    let allDishes = await Dishes.find({
        _id: {
            $in: restaurant.dishes
        }
    })
    if (!allDishes || !allDishes.length) {
        callback(null, {})
    }
    const groupedDishes = _.chain(allDishes).map().groupBy('section').map((value, key) => ({
        section: key,
        _id: value[0]._id,
        dishes: value
    })).flatten().sortBy(each => each.section.toLowerCase()).value();
    console.log(groupedDishes)
    if (!callback) return groupedDishes
    callback(null,
        groupedDishes
    )
}

export {
    handle_request
};