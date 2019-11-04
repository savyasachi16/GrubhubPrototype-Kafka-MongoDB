import Dishes from "../../models/dish"

const handle_request = async (dish_id, callback) => {
    let dish = await Dishes.findOne({
        _id: dish_id
    })
    if (!dish) {
        callback({
            message: "Dish not found in DB!"
        }, null)
    }
    callback(null, dish)
}
export {
    handle_request
}