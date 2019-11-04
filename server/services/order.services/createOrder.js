import Orders from "../../models/order"
import Restaurants from "../../models/restaurant";
import Users from "../../models/user";
import Promise from "bluebird"

const handle_request = async (order_details, callback) => {
    return Orders.create({
        amount: order_details.total_amount,
        status: "NEW"
    }).then(order => {
        if (order_details.cart && order_details.cart.length) {
            order_details.cart.map(dish => {
                order.dishes.push({
                    dish_id: dish._id,
                    quantity: dish.quantity
                })
            })
        }
        return order.save().then(updatedOrder => {
            const restaurantOrderPromise = Restaurants.findById(order_details.restaurant_id).then(restaurant => {
                restaurant.orders.push(updatedOrder._id)
                return restaurant.save();
            });
            const customerOrderPromise = Users.findById(order_details.user_id).then(user => {
                user.orders.push(updatedOrder._id)
                return user.save();
            });
            return Promise.all(restaurantOrderPromise, customerOrderPromise).then(() => {
                callback(null, updatedOrder);
            }).catch(err => {
                console.log(err)
                callback(err, null);
            })
        });
    });
};


export {
    handle_request
};