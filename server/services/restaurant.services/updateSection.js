import Dishes from "../../models/dish";
import Promise from "bluebird";
import getRestaurantMenu from './getMenu'

const handle_request = (section, callback) => {
    if (!section.dishes || !section.dishes.length) {
        callback({
            message: "No dishes in section."
        }, null)
    }
    return Promise.map(section.dishes, dish => {
        return Dishes.findOne({
            _id: dish
        }).then(currentDish => {
            return currentDish.updateOne({
                section: section.updated_name
            })
        })
    }).then(() => {
        let restaurantMenu = getRestaurantMenu.handle_request(section.restaurant_id)
        callback(null, {
            restaurantMenu
        })
    })
}
export {
    handle_request
}