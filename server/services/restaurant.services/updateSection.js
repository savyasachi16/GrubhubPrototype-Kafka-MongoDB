import Dishes from "../../models/dish";
import Promise from "bluebird";
import * as getRestaurantMenu from './getMenu'

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
    }).then(async () => {
        let restaurantMenu = await getRestaurantMenu.handle_request(section.restaurant_id, null)
        console.log(restaurantMenu)
        callback(null,
            restaurantMenu
        )
    })
}
export {
    handle_request
}