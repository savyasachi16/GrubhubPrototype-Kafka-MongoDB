import Orders from "../../models/order"
import * as getOrderDetails from "./getOrderDetails"

const handle_request = async (message_details, callback) => {
    let order = await Orders.findOne({
        _id: message_details._id
    })
    if (message_details.account_type === "Vendor") {
        order.vendor_messages.push(message_details.message_body)
    } else {
        order.buyer_messages.push(message_details.message_body)
    }
    let updatedOrder = await order.save()
    let orderDetails = await getOrderDetails.handle_request(updatedOrder._id, null)
    callback(null,
        orderDetails
    )
}

export {
    handle_request
};