import Orders from "../../models/order.js"

import * as getOrderDetails from "./getOrderDetails.js"

const handle_request = async (order_details, callback) => {
    let order = await Orders.findOne({
        _id: order_details._id
    })
    order.status = order_details.status
    let updatedOrder = await order.save()
    let orderDetails = await getOrderDetails.handle_request(updatedOrder._id, null)
    callback(null,
        orderDetails
    )
}

export {
    handle_request
};