import Restaurants from "../../models/restaurant";
import Dishes from "../../models/dish"

const handle_request = async (dish_details, callback) => {
    let dish = await Dishes.create({
        name: dish_details.name,
        price: dish_details.price,
        description: dish_details.description,
        image: dish_details.image,
        section: dish_details.section
    })
    if (!dish) {
        callback({
            message: "Unable to add new dish!"
        }, null)
    }
    let restaurant = await Restaurants.updateOne({
        _id: dish_details.restaurant_id
    }, {
        $push: {
            dishes: dish._id
        }
    })
    if (!restaurant) {
        callback({
            message: "Error mapping dish to restaurant!"
        }, null)
    }
    callback(null, restaurant)
}
export {
    handle_request
}