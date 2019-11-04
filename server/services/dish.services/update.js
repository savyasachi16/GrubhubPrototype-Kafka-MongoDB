import Dishes from "../../models/dish"
import _ from "lodash";

const handle_request = async (dish_details, callback) => {
    let dish = await Dishes.findOne({
        _id: dish_details._id
    })
    if (!dish) {
        callback({
            message: "Dish not found in DB!"
        }, null)
    }
    dish.name = dish_details.name
    dish.price = dish_details.price
    dish.section = dish_details.section
    dish.description = dish_details.description
    dish.image = dish_details.image
    let updatedDish = await dish.save()
    if (!updatedDish) {
        callback({
            message: "Dish update failure!"
        }, null)
    }

    callback(null, updatedDish)
}
export {
    handle_request
}