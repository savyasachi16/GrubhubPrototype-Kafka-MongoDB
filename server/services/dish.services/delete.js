import Restaurants from "../../models/restaurant";
import Dishes from "../../models/dish"

const handle_request = async (ids, callback) => {
    let restaurant = await Restaurants.update({
        dishes: ids.dish_id
    }, {
        $pull: {
            dishes: ids.dish_id
        }
    })
    let dish = await Dishes.findOneAndRemove({
        _id: ids.dish_id
    })
    callback(null, {
        message: "Dish deleted"
    })
}
export {
    handle_request
}