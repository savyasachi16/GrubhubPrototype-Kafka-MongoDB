import Orders from "../../models/order"
import Users from "../../models/user";

const handle_request = async (user_id, callback) => {
    let user = await Users.findOne({
        _id: user_id
    })
    if (!user) {
        callback({
            message: "Error fetching user!"
        }, null)
    }
    let allOrders = await Orders.find({
        _id: {
            $in: user.orders
        }
    })
    let current_orders=[], past_orders=[]
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