import Orders from "../../models/order"
import Users from "../../models/user";

const handle_request = (order_id, callback) => {
    return Orders.findById(order_id)
        .populate('dishes.dish_id')
        .lean()
        .then(order => {
            const dishes = order.dishes.map(dish => ({
                _id: dish.dish_id._id,
                name: dish.dish_id.name,
                quantity: dish.quantity,
                amount: dish.dish_id.amount
            }));
            return Users.findOne({
                orders: order_id
            }).then(user => {
                if (!callback) {
                    return {
                        _id: order._id,
                        buyer: {
                            name: user.first_name + " " + user.last_name,
                            address: user.address
                        },
                        dishes,
                        status: order.status,
                        amount: order.amount,
                        buyer_messages: order.buyer_messages,
                        vendor_messages: order.vendor_messages
                    }
                }
                callback(null, {
                    _id: order._id,
                    buyer: {
                        name: user.first_name + " " + user.last_name,
                        address: user.address
                    },
                    dishes,
                    status: order.status,
                    amount: order.amount,
                    buyer_messages: order.buyer_messages,
                    vendor_messages: order.vendor_messages
                })
            })
        })
};


export {
    handle_request
};