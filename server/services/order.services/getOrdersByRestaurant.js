import Orders from "../../models/order"
import Restaurants from "../../models/restaurant";

const handle_request = async (restaurant_id, callback) => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) {
        callback({
            message: "Error fetching restaurant!"
        }, null)
    }
    let allOrders = await Orders.find({
        _id: {
            $in: restaurant.orders
        }
    })
    let current_orders, past_orders
    current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
    past_orders = allOrders.filter(order => ["DELIVERED", "CANCELED"].includes(order.status))
    callback(null, {
        current_orders,
        past_orders
    })
}

export {
    handle_request
};