import Orders from "../../models/order"

import getOrderDetails from "./getOrderDetails"

const handle_request = async (order_details, callback) => {
    let order = await Orders.findOne({
        _id: order_details._id
    })
    order.status = order_details.status
    let updatedOrder = await order.save()
    orderDetails = await getOrderDetails.handle_request(updatedOrder._id)
    callback(null, {
        orderDetails
    })
}

export default {
    handle_request
};